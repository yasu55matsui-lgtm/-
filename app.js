// 数学4択クイズ（GitHub Pages + Firebase 版）
// firebase-config.js が未設定なら「この端末だけ」で動くモードになります。
import { firebaseConfig, TEACHER_NAME } from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const LOCAL_STATS = "math-quiz-stats-v3";
const LOCAL_NAME = "math-quiz-name";
// 記号ボタン（TeX の書き方は $ で囲む）
const SYMBOLS = [
  ["分数", "$\\frac{1}{2}$"], ["累乗", "$x^{2}$"], ["ルート", "$\\sqrt{3}$"], ["添字", "$a_{n}$"],
  ["ベクトル", "$\\vec{a}$"], ["π", "$\\pi$"], ["θ", "$\\theta$"], ["≦", "$\\leqq$"], ["≧", "$\\geqq$"],
  ["×", "$\\times$"], ["±", "$\\pm$"], ["∫", "$\\int_{0}^{1}$"], ["Σ", "$\\sum_{k=1}^{n}$"], ["log", "$\\log_{2}$"],
];

const S = {
  mode: "local",          // "local" | "shared"
  fb: null,               // Firebase の関数と参照
  uid: null, isTeacher: false,
  posts: [], loaded: false, error: "",
  my: emptyStats(),
  tab: "feed", filter: "すべて", retry: new Set(), confirmDel: null, confirmReset: false,
};

function emptyStats() { return { total: 0, correct: 0, recent: "", last: {}, byCat: {}, counted: {} }; }
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
};

// ---------------- データ ----------------
// 先生の問題のID（端末だけのモードと共有モードで同じIDにして、成績を引き継げるようにする）
const sampleId = i => "q" + String(i + 1).padStart(2, "0");

function localPosts() {
  const qs = (typeof QUESTIONS !== "undefined" ? QUESTIONS : []);
  const now = Date.now();
  return qs.map((q, i) => ({
    id: sampleId(i), official: true, authorName: TEACHER_NAME, authorUid: "",
    category: q.category, question: q.question, choices: q.choices, answer: q.answer,
    explanation: q.explanation, at: now - (qs.length - i) * 6 * 3600e3, counts: null,
  })).reverse();
}

function loadLocalStats() {
  try { const v = JSON.parse(store.get(LOCAL_STATS)); if (v && typeof v.total === "number") return { ...emptyStats(), ...v }; } catch (e) {}
  return emptyStats();
}

let statsTimer = null;
function persistStats() {
  store.set(LOCAL_STATS, JSON.stringify(S.my));
  if (S.mode !== "shared" || !S.uid) return;
  clearTimeout(statsTimer);
  statsTimer = setTimeout(() => {
    const { doc, setDoc } = S.fb.fs;
    setDoc(doc(S.fb.db, "stats", S.uid), JSON.parse(JSON.stringify(S.my))).catch(() => {});
  }, 600);
}

async function initShared() {
  const [appM, authM, fsM] = await Promise.all([
    import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js"),
  ]);
  const app = appM.initializeApp(firebaseConfig);
  const auth = authM.getAuth(app);
  const db = fsM.getFirestore(app);
  if (window.__USE_EMULATOR__) {
    authM.connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    fsM.connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
  S.fb = { db, auth, fs: fsM };

  // 匿名ログイン（ブラウザごとにIDが作られ、次回も同じIDになる）
  const user = await new Promise(res => { const un = authM.onAuthStateChanged(auth, u => { un(); res(u); }); });
  S.uid = (user || (await authM.signInAnonymously(auth)).user).uid;
  S.mode = "shared";

  const { doc, getDoc } = fsM;
  try { S.isTeacher = (await getDoc(doc(db, "teachers", S.uid))).exists(); } catch (e) { S.isTeacher = false; }
  try {
    const st = await getDoc(doc(db, "stats", S.uid));
    if (st.exists()) S.my = { ...emptyStats(), ...st.data() };
    else if (S.my.total) persistStats();   // 端末にあった記録を引き継ぐ
  } catch (e) {}

  await loadPosts();
  // 画面を離れて5分以上たってから戻ったら、新しい投稿を読み込み直す
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && Date.now() - S.loadedAt > 5 * 60e3) loadPosts();
  });
}

// 問題一覧は開いたとき（と「更新」ボタン）に1回だけ読む。
// 常時接続にすると、誰かが答えるたびに全員の画面で読み込みが発生し、無料枠を使い切りやすいため。
function toPost(d) {
  const v = d.data({ serverTimestamps: "estimate" });
  const p = { ...v, id: d.id, at: v.at && v.at.toMillis ? v.at.toMillis() : Date.now() };
  // 先生の問題（q01, q02, …）は questions.js の最新の文面で表示する。
  // 選択肢の順番と正解番号は変えない約束なので、回答の集計はそのまま使える
  const m = /^q(\d+)$/.exec(p.id);
  const src = m && p.official && typeof QUESTIONS !== "undefined" ? QUESTIONS[Number(m[1]) - 1] : null;
  if (src && src.answer === p.answer && Array.isArray(src.choices) && src.choices.length === 4) {
    Object.assign(p, { category: src.category, question: src.question, choices: src.choices, explanation: src.explanation || "" });
  }
  return p;
}

async function loadPosts() {
  if (S.loading) return;
  S.loading = true; renderChips();
  const { collection, query, orderBy, limit, getDocs } = S.fb.fs;
  const slow = setTimeout(() => { if (!S.loaded) { S.error = "問題の読み込みに時間がかかっています。通信状況を確認してください。"; renderNotice(); } }, 10000);
  try {
    const snap = await getDocs(query(collection(S.fb.db, "posts"), orderBy("at", "desc"), limit(500)));
    S.posts = snap.docs.map(toPost).filter(p => Array.isArray(p.choices) && p.choices.length === 4);
    S.error = ""; S.loadedAt = Date.now();
  } catch (err) {
    S.error = "問題を読み込めませんでした（" + (err.code || "error") + "）。通信状況を確認してから「更新」を押してください。";
  } finally {
    clearTimeout(slow); S.loading = false; S.loaded = true; renderAll();
  }
}

// 1問だけ最新の集計を読み直す
async function refreshPost(pid) {
  const { doc, getDoc } = S.fb.fs;
  try {
    const d = await getDoc(doc(S.fb.db, "posts", pid));
    if (!d.exists()) return;
    const p = toPost(d), i = S.posts.findIndex(x => x.id === pid);
    if (i >= 0) { S.posts[i] = p; renderOne(pid); }
  } catch (e) {}
}

// ---------------- 操作 ----------------
function answer(pid, n) {
  const q = S.posts.find(p => p.id === pid); if (!q) return;
  const ok = n === q.answer, m = S.my;
  m.total++; if (ok) m.correct++;
  m.recent = (m.recent + (ok ? "1" : "0")).slice(-100);
  m.last[pid] = n;
  const c = m.byCat[q.category] || (m.byCat[q.category] = { t: 0, c: 0 });
  c.t++; if (ok) c.c++;
  S.retry.delete(pid);

  // みんなの集計には1人1問につき最初の回答だけ
  if (S.mode === "shared" && !m.counted[pid]) {
    m.counted[pid] = 1;
    const { doc, writeBatch, increment } = S.fb.fs;
    const b = writeBatch(S.fb.db);
    b.set(doc(S.fb.db, "answers", pid + "_" + S.uid), { uid: S.uid, postId: pid, choice: n });
    b.update(doc(S.fb.db, "posts", pid), { ["counts." + n]: increment(1), "counts.total": increment(1) });
    // すでに回答済み（記録をリセットした等）のときは拒否されるだけ。どちらでも最新の割合を読み直す
    b.commit().catch(() => {}).then(() => refreshPost(pid));
  } else if (S.mode === "shared") {
    refreshPost(pid);
  }
  persistStats();
  if (navigator.vibrate) { try { navigator.vibrate(ok ? 30 : [60, 40, 60]); } catch (e) {} }
  renderMini(); renderOne(pid);
}

async function createPost(item, id) {
  const { collection, doc, setDoc, serverTimestamp } = S.fb.fs;
  const ref = id ? doc(S.fb.db, "posts", id) : doc(collection(S.fb.db, "posts"));
  const counts = { "1": 0, "2": 0, "3": 0, "4": 0, total: 0 };
  await setDoc(ref, { ...item, authorUid: S.uid, official: S.isTeacher, at: serverTimestamp(), counts });
  S.posts = [{ ...item, id: ref.id, authorUid: S.uid, official: S.isTeacher, at: Date.now(), counts }, ...S.posts];
}

async function deletePost(pid) {
  const { doc, deleteDoc } = S.fb.fs;
  try { await deleteDoc(doc(S.fb.db, "posts", pid)); S.posts = S.posts.filter(p => p.id !== pid); renderAll(); }
  catch (e) { S.error = "削除できませんでした。"; renderNotice(); }
}

function missingSamples() {
  const have = new Set(S.posts.filter(p => p.official).map(p => p.question));
  const ids = new Set(S.posts.map(p => p.id));
  return (typeof QUESTIONS !== "undefined" ? QUESTIONS : [])
    .map((q, i) => ({ ...q, sid: sampleId(i) }))
    .filter(q => !have.has(q.question) && !ids.has(q.sid));
}

async function seedSamples(btn) {
  btn.disabled = true; btn.textContent = "登録しています…";
  const qs = missingSamples();
  try {
    for (const q of qs) {   // 1問ずつ登録して、Q1 が一番古くなるようにする
      await createPost({ authorName: TEACHER_NAME, category: q.category, question: q.question,
        choices: q.choices, answer: q.answer, explanation: q.explanation || "" }, q.sid);
    }
  } catch (e) { S.error = "登録できませんでした（" + (e.code || "error") + "）。"; }
  await loadPosts();
}

// ---------------- 表示 ----------------
const COLORS = ["#1a73e8", "#e8710a", "#188038", "#a142f4", "#d93025", "#12a4af", "#c26401", "#5f6368"];
function colorFor(id) { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) | 0; return COLORS[Math.abs(h) % COLORS.length]; }
function ago(ts) {
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return "たった今";
  if (s < 3600) return Math.floor(s / 60) + " 分前";
  if (s < 86400) return Math.floor(s / 3600) + " 時間前";
  if (s < 86400 * 30) return Math.floor(s / 86400) + " 日前";
  const d = new Date(ts); return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function renderMini() {
  const m = S.my;
  $("mini").innerHTML = m.total ? `正答率 <b>${pct(m.correct, m.total)}%</b>　${m.correct}/${m.total}` : "";
}

function renderNotice() {
  const parts = [];
  if (S.mode === "local" && !firebaseConfig) parts.push("共有機能はまだ設定されていません。今は問題を解くことと、この端末での成績記録だけが使えます。");
  if (S.mode === "local" && firebaseConfig && S.loaded) parts.push("共有サーバーにつながりませんでした。この端末だけのモードで動いています。");
  if (S.error) parts.push(S.error);
  let html = parts.map(p => `<div class="notice">${esc(p)}</div>`).join("");
  const missing = S.mode === "shared" && S.isTeacher && S.loaded ? missingSamples().length : 0;
  if (missing) {
    html += `<div class="notice">questions.js に、まだ登録していない問題が ${missing} 問あります（先生にだけ表示）。
      <div class="seed"><button class="primary" id="seed">${missing}問を登録する</button></div></div>`;
  }
  $("notice").innerHTML = html;
}

function renderChips() {
  const cats = [...new Set(S.posts.map(q => q.category).filter(Boolean))];
  const names = ["すべて", ...cats, "まちがえた問題", "まだ解いていない"];
  if (S.mode === "shared") names.push("先生の問題", "みんなの投稿");
  if (!names.includes(S.filter)) S.filter = "すべて";
  $("chips").innerHTML = (S.mode === "shared" ? `<button class="chip" id="reload" ${S.loading ? "disabled" : ""}>${S.loading ? "読み込み中…" : "↻ 更新"}</button>` : "") +
    names.map(n => `<button class="chip ${n === S.filter ? "on" : ""}" data-f="${esc(n)}">${esc(n)}</button>`).join("");
  $("cat-list").innerHTML = cats.map(c => `<option value="${esc(c)}">`).join("");
}

function visible() {
  return S.posts.filter(q => {
    const last = S.my.last[q.id];
    switch (S.filter) {
      case "すべて": return true;
      case "まちがえた問題": return last && last !== q.answer;
      case "まだ解いていない": return !last;
      case "先生の問題": return q.official;
      case "みんなの投稿": return !q.official;
      default: return q.category === S.filter;
    }
  });
}

// 選択肢の並び順を人ごと・問題ごとにシャッフル（正解の位置の偏りをなくす）
function choiceOrder(q) {
  let h = 2166136261;
  for (const ch of q.id + "|" + (S.uid || store.get("math-quiz-seed") || "")) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const order = [1, 2, 3, 4];
  for (let i = 3; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) ^ i; const j = (h >>> 0) % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
  return order;
}

function postHTML(q) {
  const last = S.my.last[q.id];
  const shown = last && !S.retry.has(q.id);
  const c = q.counts || null;
  const total = c ? (c.total || 0) : 0;
  const choices = choiceOrder(q).map(n => {
    const txt = q.choices[n - 1];
    let cls = "", right = "", width = 0;
    if (shown) {
      width = total ? (c[String(n)] || 0) / total * 100 : 0;
      if (n === q.answer) cls = "correct"; else if (n === last) cls = "wrong";
      const mark = n === q.answer ? `<span class="icon ok" aria-label="正解">✓</span>` : n === last ? `<span class="icon ng" aria-label="あなたの回答">✕</span>` : "";
      right = `<span class="pct">${mark}${total ? Math.round(width) + "%" : ""}</span>`;
    }
    return `<button class="choice ${cls}" data-q="${esc(q.id)}" data-n="${n}" ${shown ? "disabled" : ""}>
      ${shown ? `<span class="fillbar" style="width:${width}%"></span>` : ""}
      <span class="txt">${esc(txt)}</span>${right}</button>`;
  }).join("");

  const canDelete = S.mode === "shared" && (q.authorUid === S.uid || S.isTeacher);
  const delBtn = canDelete ? `<button class="link danger" data-del="${esc(q.id)}">${S.confirmDel === q.id ? "本当に削除する" : "削除"}</button>` : "";
  const countLine = c ? `${total} 人が回答` : "";
  let after;
  if (shown) {
    const ok = last === q.answer;
    after = `<div class="count"><span class="result ${ok ? "ok" : "ng"}">${ok ? "正解！" : "不正解"}</span>　${countLine}</div>
      <div class="exp"><b>解説</b>${esc(q.explanation || "（解説なし）")}</div>
      <div class="actions">${delBtn}<button class="link" data-retry="${esc(q.id)}">もう一度解く</button></div>`;
  } else {
    after = `${countLine ? `<div class="count">${countLine}</div>` : ""}${delBtn ? `<div class="actions">${delBtn}</div>` : ""}`;
  }
  const mine = S.uid && q.authorUid === S.uid;
  return `<article class="post" id="p-${esc(q.id)}">
    <div class="head">
      <div class="avatar" style="background:${q.official ? "#1a73e8" : colorFor(q.authorUid || q.authorName)}">${q.official ? "⚾" : esc((q.authorName || "?").slice(0, 1))}</div>
      <div class="who"><div class="name">${esc(q.authorName || "参加者")}${q.official ? '<span class="tag">先生</span>' : mine ? '<span class="tag">あなた</span>' : ""}</div>
      <div class="meta">${esc(ago(q.at))}</div></div>
    </div>
    <p class="qtitle">${esc(q.category || "その他")}</p>
    <p class="qtext">${esc(q.question)}</p>
    ${choices}
    ${after}
  </article>`;
}

// $…$ を数式として表示（KaTeX が読み込めていなければそのまま）
function renderMath(el) {
  if (!el || typeof window.renderMathInElement !== "function") return;
  try { window.renderMathInElement(el, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false }); } catch (e) {}
}

function renderFeed() {
  renderChips();
  if (!S.loaded) { $("feed").innerHTML = `<div class="empty">問題を読み込んでいます…</div>`; return; }
  const list = visible();
  $("feed").innerHTML = list.length ? list.map(postHTML).join("")
    : `<div class="empty">${!S.posts.length ? "まだ問題がありません。" : S.filter === "まちがえた問題" ? "まちがえた問題はありません。" : "この条件の問題はありません。"}</div>`;
  renderMath($("feed"));
}

function renderOne(pid) {
  const el = document.getElementById("p-" + pid);
  const q = S.posts.find(x => x.id === pid);
  if (el && q) { el.outerHTML = postHTML(q); renderMath(document.getElementById("p-" + pid)); } else renderFeed();
}

function renderStats() {
  const m = S.my, r = m.recent || "";
  const solved = S.posts.filter(q => m.last[q.id]).length;
  const wrong = S.posts.filter(q => m.last[q.id] && m.last[q.id] !== q.answer).length;
  const rOk = [...r].filter(x => x === "1").length;
  const dots = Array.from({ length: 100 }, (_, i) => `<span class="dot ${r[i] === "1" ? "o" : r[i] === "0" ? "x" : ""}"></span>`).join("");
  const cats = Object.entries(m.byCat).sort((a, b) => b[1].t - a[1].t);
  $("v-stats").innerHTML = `
    <div class="tiles">
      <div class="tile"><div class="lbl">通算の正答率</div><div class="big">${m.total ? pct(m.correct, m.total) : "–"}<small>%</small></div><div class="sm">${m.correct} / ${m.total} 回正解</div></div>
      <div class="tile"><div class="lbl">最近100問の正答率</div><div class="big">${r.length ? pct(rOk, r.length) : "–"}<small>%</small></div><div class="sm">直近 ${r.length} 問中 ${rOk} 問</div></div>
      <div class="tile"><div class="lbl">解いた問題</div><div class="big">${solved}<small> / ${S.posts.length}</small></div><div class="sm">まちがえたまま ${wrong} 問</div></div>
    </div>
    <h2>最近100問の記録</h2>
    <div class="dots" aria-label="最近100問の正解と不正解">${dots}</div>
    <div class="legend">古い順に左上から。緑が正解、赤が不正解。</div>
    <h2>単元ごとの正答率</h2>
    <div class="cats">${cats.length ? cats.map(([k, v]) => `
      <div class="cat"><span>${esc(k)}</span><span class="track"><i style="width:${pct(v.c, v.t)}%"></i></span><span class="v">${pct(v.c, v.t)}%（${v.c}/${v.t}）</span></div>`).join("")
      : `<div class="hint">問題を解くとここに表示されます。</div>`}</div>
    <h2>記録の管理</h2>
    <div class="hint">記録はこのブラウザに結びついています。ブラウザのデータを消すと記録も消えます。</div>
    ${S.mode === "shared" ? `<div class="idbox"><span class="hint">あなたのID</span><code id="myid">${esc(S.uid)}</code><button class="link" id="copyid">コピー</button>${S.isTeacher ? '<span class="tag">先生として登録済み</span>' : ""}</div>` : ""}
    <button class="link danger" id="reset">${S.confirmReset ? "本当にリセットする（元に戻せません）" : "自分の記録をリセット"}</button>`;
}

function renderPostForm() {
  const can = S.mode === "shared";
  $("f-submit").disabled = !can;
  $("post-note").textContent = can
    ? (S.isTeacher ? "先生として投稿します。投稿した問題は全員のフィードに表示されます。" : "投稿した問題は、このアプリを使っている全員のフィードに表示されます。")
    : "投稿するには共有機能（Firebase）の設定が必要です。";
  if (!$("f-name").value) $("f-name").value = store.get(LOCAL_NAME) || (S.isTeacher ? TEACHER_NAME : "");
}

function renderTabs() {
  for (const b of document.querySelectorAll(".tab")) b.classList.toggle("on", b.dataset.tab === S.tab);
  $("v-feed").hidden = S.tab !== "feed";
  $("v-stats").hidden = S.tab !== "stats";
  $("v-post").hidden = S.tab !== "post";
  if (S.tab === "stats") renderStats();
}

function renderAll() { renderMini(); renderNotice(); renderFeed(); renderPostForm(); if (S.tab === "stats") renderStats(); }

// ---------------- イベント ----------------
document.addEventListener("click", e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.dataset.tab) { S.tab = t.dataset.tab; renderTabs(); window.scrollTo(0, 0); return; }
  if (t.dataset.f) { S.filter = t.dataset.f; renderFeed(); window.scrollTo(0, 0); return; }
  if (t.dataset.q) { answer(t.dataset.q, Number(t.dataset.n)); return; }
  if (t.dataset.retry) { S.retry.add(t.dataset.retry); renderOne(t.dataset.retry); return; }
  if (t.dataset.del) {
    const pid = t.dataset.del;
    if (S.confirmDel !== pid) { const prev = S.confirmDel; S.confirmDel = pid; if (prev) renderOne(prev); renderOne(pid); return; }
    S.confirmDel = null; deletePost(pid); return;
  }
  if (t.id === "seed") { seedSamples(t); return; }
  if (t.id === "reload") { location.reload(); return; }   // アプリ全体を最新にする（問題の追加もすぐ反映）
  if (t.id === "copyid") {
    navigator.clipboard?.writeText(S.uid).then(() => { t.textContent = "コピーしました"; }, () => {
      const r = document.createRange(); r.selectNodeContents($("myid")); getSelection().removeAllRanges(); getSelection().addRange(r);
    });
    return;
  }
  if (t.id === "reset") {
    if (!S.confirmReset) { S.confirmReset = true; renderStats(); return; }
    S.confirmReset = false;
    const counted = S.my.counted;   // 集計済みの印は残す（同じ問題を二重に数えないため）
    S.my = { ...emptyStats(), counted };
    persistStats(); renderMini(); renderStats(); renderFeed(); return;
  }
  if (t.dataset.sym) {
    const el = S.lastField && document.body.contains(S.lastField) ? S.lastField : $("f-q");
    const s = el.selectionStart ?? el.value.length, en = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, s) + t.dataset.sym + el.value.slice(en);
    el.focus(); el.setSelectionRange(s + t.dataset.sym.length, s + t.dataset.sym.length);
    renderPreview();
  }
});
function renderPreview() {
  const v = id => $(id).value.trim();
  const ans = Number((document.querySelector('input[name="f-ans"]:checked') || {}).value || 0);
  const choices = [1, 2, 3, 4].map(n => `<div class="pc ${n === ans ? "ok" : ""}">${esc(v("f-c" + n)) || `<span class="hint">選択肢 ${n}</span>`}</div>`).join("");
  $("f-preview").innerHTML = `<div style="white-space:pre-wrap">${esc(v("f-q")) || '<span class="hint">問題文</span>'}</div>${choices}` +
    (v("f-exp") ? `<div class="exp" style="margin-top:8px"><b>解説</b>${esc(v("f-exp"))}</div>` : "");
  renderMath($("f-preview"));
}
let previewTimer = null;
$("pform").addEventListener("input", () => { clearTimeout(previewTimer); previewTimer = setTimeout(renderPreview, 250); });
$("pform").addEventListener("change", renderPreview);

document.addEventListener("focusin", e => { if (e.target.matches("#pform input[type=text], #pform textarea")) S.lastField = e.target; });
$("symbols").innerHTML = SYMBOLS.map(([label, s]) => `<button type="button" data-sym="${esc(s)}">${esc(label)}</button>`).join("");
$("symbols").addEventListener("mousedown", e => e.preventDefault());

$("pform").addEventListener("submit", async e => {
  e.preventDefault();
  const msg = $("f-msg"), v = id => $(id).value.trim();
  const choices = [v("f-c1"), v("f-c2"), v("f-c3"), v("f-c4")];
  const ans = Number((document.querySelector('input[name="f-ans"]:checked') || {}).value || 0);
  let err = "";
  if (!v("f-name")) err = "ニックネームを入力してください。";
  else if (!v("f-q")) err = "問題文を入力してください。";
  else if (choices.some(c => !c)) err = "選択肢を4つすべて入力してください。";
  else if (new Set(choices).size < 4) err = "同じ選択肢が重複しています。";
  else if (!ans) err = "正解の選択肢に ● をつけてください。";
  if (err) { msg.className = "msg err"; msg.textContent = err; return; }
  if (S.mode !== "shared") return;
  store.set(LOCAL_NAME, v("f-name"));
  $("f-submit").disabled = true;
  try {
    await createPost({ authorName: v("f-name"), category: v("f-cat") || "その他", question: v("f-q"),
      choices, answer: ans, explanation: v("f-exp") });
    for (const id of ["f-q", "f-c1", "f-c2", "f-c3", "f-c4", "f-exp"]) $(id).value = "";
    document.querySelectorAll('input[name="f-ans"]').forEach(r => { r.checked = false; });
    msg.className = "msg ok"; msg.textContent = "投稿しました。「問題」タブのいちばん上に表示されています。";
    renderPreview();
    S.filter = "すべて"; renderFeed();
  } catch (e2) {
    msg.className = "msg err"; msg.textContent = "投稿できませんでした（" + (e2.code || "error") + "）。時間をおいてもう一度お試しください。";
  } finally { renderPostForm(); }
});

// ---------------- 起動 ----------------
(async () => {
  if (!store.get("math-quiz-seed")) store.set("math-quiz-seed", Math.random().toString(36).slice(2));
  S.my = loadLocalStats();
  renderAll();
  renderPreview();
  if (firebaseConfig) {
    try { await initShared(); return; }
    catch (e) { console.error(e); }
  }
  S.mode = "local"; S.posts = localPosts(); S.loaded = true;
  renderAll();
})();
