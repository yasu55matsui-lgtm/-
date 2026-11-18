// 数学4択クイズ（GitHub Pages + Firebase 版）
// firebase-config.js が未設定なら「この端末だけ」で動くモードになります。
import { firebaseConfig, TEACHER_NAME } from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const LOCAL_STATS = "math-quiz-stats-v3";
const LOCAL_NAME = "math-quiz-name";
const SYMBOLS = ["²", "³", "√", "π", "θ", "°", "≦", "≧", "≠", "−", "×", "÷", "±", "∞", "·", "₂", "ₙ", "∠", "△"];

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
function localPosts() {
  const qs = (typeof QUESTIONS !== "undefined" ? QUESTIONS : []);
  const now = Date.now();
  return qs.map((q, i) => ({
    id: "local-q" + String(i + 1).padStart(2, "0"), official: true, authorName: TEACHER_NAME, authorUid: "",
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

  const { doc, getDoc, collection, query, orderBy, limit, onSnapshot } = fsM;
  try { S.isTeacher = (await getDoc(doc(db, "teachers", S.uid))).exists(); } catch (e) { S.isTeacher = false; }
  try {
    const st = await getDoc(doc(db, "stats", S.uid));
    if (st.exists()) S.my = { ...emptyStats(), ...st.data() };
    else if (S.my.total) persistStats();   // 端末にあった記録を引き継ぐ
  } catch (e) {}

  const slow = setTimeout(() => { if (!S.loaded) { S.error = "問題の読み込みに時間がかかっています。通信状況を確認してください。"; renderNotice(); } }, 10000);
  onSnapshot(query(collection(db, "posts"), orderBy("at", "desc"), limit(500)), snap => {
    clearTimeout(slow);
    S.posts = snap.docs.map(d => {
      const v = d.data({ serverTimestamps: "estimate" });
      return { ...v, id: d.id, at: v.at && v.at.toMillis ? v.at.toMillis() : Date.now() };
    }).filter(p => Array.isArray(p.choices) && p.choices.length === 4);
    S.loaded = true; S.error = "";
    renderAll();
  }, err => {
    clearTimeout(slow);
    S.error = "問題を読み込めませんでした（" + (err.code || "error") + "）。Firestore のルール設定を確認してください。";
    S.loaded = true; renderAll();
  });
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
    b.commit().catch(() => {});  // すでに回答済み（記録をリセットした等）のときは拒否されるだけ
  }
  persistStats();
  if (navigator.vibrate) { try { navigator.vibrate(ok ? 30 : [60, 40, 60]); } catch (e) {} }
  renderMini(); renderOne(pid);
}

async function createPost(item) {
  const { collection, addDoc, serverTimestamp } = S.fb.fs;
  await addDoc(collection(S.fb.db, "posts"), {
    ...item, authorUid: S.uid, official: S.isTeacher, at: serverTimestamp(),
    counts: { "1": 0, "2": 0, "3": 0, "4": 0, total: 0 },
  });
}

async function deletePost(pid) {
  const { doc, deleteDoc } = S.fb.fs;
  try { await deleteDoc(doc(S.fb.db, "posts", pid)); }
  catch (e) { S.error = "削除できませんでした。"; renderNotice(); }
}

async function seedSamples(btn) {
  btn.disabled = true; btn.textContent = "登録しています…";
  const qs = (typeof QUESTIONS !== "undefined" ? QUESTIONS : []);
  try {
    for (const q of qs) {   // 1問ずつ登録して、Q1 が一番古くなるようにする
      await createPost({ authorName: TEACHER_NAME, category: q.category, question: q.question,
        choices: q.choices, answer: q.answer, explanation: q.explanation || "" });
    }
  } catch (e) { S.error = "登録できませんでした（" + (e.code || "error") + "）。"; renderNotice(); }
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
  if (S.mode === "shared" && S.isTeacher && S.loaded && !S.posts.some(p => p.official)) {
    html += `<div class="notice">先生として登録されています。まだ先生の問題がありません。
      <div class="seed"><button class="primary" id="seed">サンプル問題（${(typeof QUESTIONS !== "undefined" ? QUESTIONS.length : 0)}問）を登録</button></div></div>`;
  }
  $("notice").innerHTML = html;
}

function renderChips() {
  const cats = [...new Set(S.posts.map(q => q.category).filter(Boolean))];
  const names = ["すべて", ...cats, "まちがえた問題", "まだ解いていない"];
  if (S.mode === "shared") names.push("先生の問題", "みんなの投稿");
  if (!names.includes(S.filter)) S.filter = "すべて";
  $("chips").innerHTML = names.map(n => `<button class="chip ${n === S.filter ? "on" : ""}" data-f="${esc(n)}">${esc(n)}</button>`).join("");
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

function postHTML(q) {
  const last = S.my.last[q.id];
  const shown = last && !S.retry.has(q.id);
  const c = q.counts || null;
  const total = c ? (c.total || 0) : 0;
  const choices = q.choices.map((txt, i) => {
    const n = i + 1;
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

function renderFeed() {
  renderChips();
  if (!S.loaded) { $("feed").innerHTML = `<div class="empty">問題を読み込んでいます…</div>`; return; }
  const list = visible();
  $("feed").innerHTML = list.length ? list.map(postHTML).join("")
    : `<div class="empty">${!S.posts.length ? "まだ問題がありません。" : S.filter === "まちがえた問題" ? "まちがえた問題はありません。" : "この条件の問題はありません。"}</div>`;
}

function renderOne(pid) {
  const el = document.getElementById("p-" + pid);
  const q = S.posts.find(x => x.id === pid);
  if (el && q) el.outerHTML = postHTML(q); else renderFeed();
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
  }
});
document.addEventListener("focusin", e => { if (e.target.matches("#pform input[type=text], #pform textarea")) S.lastField = e.target; });
$("symbols").innerHTML = SYMBOLS.map(s => `<button type="button" data-sym="${s}">${s}</button>`).join("");
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
    S.filter = "すべて";
  } catch (e2) {
    msg.className = "msg err"; msg.textContent = "投稿できませんでした（" + (e2.code || "error") + "）。時間をおいてもう一度お試しください。";
  } finally { renderPostForm(); }
});

// ---------------- 起動 ----------------
(async () => {
  S.my = loadLocalStats();
  renderAll();
  if (firebaseConfig) {
    try { await initShared(); return; }
    catch (e) { console.error(e); }
  }
  S.mode = "local"; S.posts = localPosts(); S.loaded = true;
  renderAll();
})();
