// =============================================================
//  問題データ
//  問題を追加するときは、いちばん下の { ... } をコピーして書き換えてください。
//
//  category : 単元名（絞り込みボタンに使われます）
//  question : 問題文（改行は \n）
//  choices  : 選択肢を4つ
//  answer   : 正解の選択肢の番号（1〜4）
//  explanation : 解説
//
//  数式は $ で囲むと TeX で表示されます。JavaScript の文字列の中では \ を \\ と書きます。
//    分数 $\\frac{1}{2}$　累乗 $x^{2}$　ルート $\\sqrt{3}$　添字 $a_{n}$
//    ベクトル $\\vec{a}$　≦ $\\leqq$　≧ $\\geqq$　× $\\times$　π $\\pi$
//
//  【注意】すでに登録した問題（上から何番目か が問題の番号になります）は、
//    ・並び順を変えない　・選択肢の順番と正解番号を変えない　・途中に挿入しない
//  文面や解説の修正は、そのままアプリに反映されます。
// =============================================================
const QUESTIONS = [
  {
    category: "2次関数",
    question: "松井「$y = x^{2} - 4x + 3$ のグラフを $x$軸方向に 1 だけ平行移動したよ」\n由伸「移動後のグラフの式は？」",
    choices: ["$y = x^{2} - 2x$", "$y = x^{2} - 4x + 4$", "$y = x^{2} - 6x + 8$", "$y = x^{2} - 6x + 10$"],
    answer: 3,
    explanation: "もとの式は $y = (x - 2)^{2} - 1$ で、頂点は $(2, -1)$ です。$x$軸方向に 1 動かすと頂点は $(3, -1)$ になるので、$y = (x - 3)^{2} - 1 = x^{2} - 6x + 8$ です。"
  },
  {
    category: "2次関数",
    question: "$f(x) = (x - a)^{2} + 1$ の $0 \\leqq x \\leqq 2$ における最小値が 1 となる $a$ の条件は？",
    choices: ["$a \\leqq 0$", "$0 \\leqq a \\leqq 2$", "$a \\geqq 2$", "すべての実数 $a$"],
    answer: 2,
    explanation: "最小値が 1 になるのは、頂点の $x$座標 $a$ が区間 $0 \\leqq x \\leqq 2$ に入っているときです。$a$ が区間の外にあると、最小値は端点での値になり、1 より大きくなります。"
  },
  {
    category: "三角比",
    question: "$\\triangle ABC$ の外接円の半径が 3、$A = 30^\\circ$ のとき、$a$ の値は？",
    choices: ["$\\dfrac{3}{2}$", "$\\sqrt{3}$", "$3$", "$3\\sqrt{3}$"],
    answer: 3,
    explanation: "正弦定理より $a / \\sin A = 2R$ なので、$a = 2 \\times 3 \\times \\sin 30^\\circ = 6 \\times \\dfrac{1}{2} = 3$ です。"
  },
  {
    category: "2次関数",
    question: "$y = 2x^{2} - 8x + 5$ の頂点の座標は？",
    choices: ["$(2, -3)$", "$(-2, 29)$", "$(4, 5)$", "$(2, 5)$"],
    answer: 1,
    explanation: "$y = 2(x^{2} - 4x) + 5 = 2(x - 2)^{2} - 8 + 5 = 2(x - 2)^{2} - 3$ より、頂点は $(2, -3)$ です。"
  },
  {
    category: "2次関数",
    question: "2次方程式 $x^{2} + 4x + k = 0$ が異なる2つの実数解をもつ $k$ の範囲は？",
    choices: ["$k > 4$", "$k < 4$", "$k \\leqq 4$", "$k < -4$"],
    answer: 2,
    explanation: "判別式 $\\dfrac{D}{4} = 2^{2} - k = 4 - k > 0$ より $k < 4$ です。"
  },
  {
    category: "三角比",
    question: "$\\sin \\theta = \\dfrac{3}{5}$（$0^\\circ < \\theta < 90^\\circ$）のとき、$\\cos \\theta$ の値は？",
    choices: ["$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$-\\dfrac{4}{5}$", "$\\dfrac{5}{4}$"],
    answer: 1,
    explanation: "$\\sin ^{2}\\theta + \\cos ^{2}\\theta = 1$ より $\\cos ^{2}\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$。$0^\\circ < \\theta < 90^\\circ$ なので $\\cos \\theta > 0$、よって $\\cos \\theta = \\dfrac{4}{5}$ です。"
  },
  {
    category: "三角比",
    question: "$\\triangle ABC$ で $b = 3$、$c = 5$、$A = 120^\\circ$ のとき、$a$ の値は？",
    choices: ["$\\sqrt{19}$", "$7$", "$\\sqrt{34}$", "$8$"],
    answer: 2,
    explanation: "余弦定理より $a^{2} = 3^{2} + 5^{2} - 2\\cdot 3\\cdot 5\\cdot \\cos 120^\\circ = 9 + 25 + 15 = 49$。よって $a = 7$ です。"
  },
  {
    category: "数と式",
    question: "$(x + 2)(x - 5)$ を展開すると？",
    choices: ["$x^{2} - 3x - 10$", "$x^{2} + 3x - 10$", "$x^{2} - 7x - 10$", "$x^{2} - 3x + 10$"],
    answer: 1,
    explanation: "$x^{2} + (2 - 5)x + 2 \\times (-5) = x^{2} - 3x - 10$ です。"
  },
  {
    category: "数と式",
    question: "$1 / (\\sqrt{3} - 1)$ の分母を有理化すると？",
    choices: ["$\\sqrt{3} + 1$", "$\\dfrac{\\sqrt{3} + 1}{2}$", "$\\dfrac{\\sqrt{3} - 1}{2}$", "$\\sqrt{3} - 1$"],
    answer: 2,
    explanation: "分母・分子に $(\\sqrt{3} + 1)$ をかけると、$(\\sqrt{3} + 1) / (3 - 1) = \\dfrac{\\sqrt{3} + 1}{2}$ です。"
  },
  {
    category: "場合の数",
    question: "野球のスタメン9人の打順の決め方は全部で何通り？（9人全員を1〜9番に並べる）",
    choices: ["81通り", "362880通り", "40320通り", "9通り"],
    answer: 2,
    explanation: "9人を一列に並べる順列なので $9! = 362880$ 通りです。"
  },
  {
    category: "場合の数",
    question: "投手5人の中から先発2人を選ぶ方法は何通り？（順番は区別しない）",
    choices: ["10通り", "20通り", "25通り", "5通り"],
    answer: 1,
    explanation: "組合せ ${}_{5}\\mathrm{C}_{2} = \\dfrac{5 \\times 4}{2 \\times 1} = 10$ 通りです。"
  },
  {
    category: "確率",
    question: "打率 .300 の打者が 2打席連続でヒットを打つ確率は？（各打席は独立とする）",
    choices: ["$0.6$", "$0.3$", "$0.09$", "$0.51$"],
    answer: 3,
    explanation: "独立な試行なので $0.3 \\times 0.3 = 0.09$ です。"
  },
  // ---- 数学I・A（追加分）----
  {
    category: "数と式",
    question: "$(a + b)^{3}$ を展開したとき、$a^{2}b$ の係数は？",
    choices: ["$1$", "$2$", "$3$", "$6$"],
    answer: 3,
    explanation: "$(a + b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}$ なので、$a^{2}b$ の係数は 3 です。"
  },
  {
    category: "数と式",
    question: "$x^{2} - 5x + 6$ を因数分解すると？",
    choices: ["$(x - 2)(x - 3)$", "$(x + 2)(x + 3)$", "$(x - 1)(x - 6)$", "$(x + 1)(x - 6)$"],
    answer: 1,
    explanation: "かけて 6、たして $-5$ になる2数は $-2$ と $-3$ なので、$(x - 2)(x - 3)$ です。"
  },
  {
    category: "数と式",
    question: "不等式 $|x - 3| < 2$ の解は？",
    choices: ["$x < 1, 5 < x$", "$1 < x < 5$", "$-1 < x < 5$", "$-5 < x < 1$"],
    answer: 2,
    explanation: "$|x - 3| < 2$ は $-2 < x - 3 < 2$ と同じなので、$1 < x < 5$ です。"
  },
  {
    category: "数と式",
    question: "$\\sqrt{12} + \\sqrt{27}$ を簡単にすると？",
    choices: ["$\\sqrt{39}$", "$5\\sqrt{3}$", "$6\\sqrt{3}$", "$13\\sqrt{3}$"],
    answer: 2,
    explanation: "$\\sqrt{12} = 2\\sqrt{3}$、$\\sqrt{27} = 3\\sqrt{3}$ なので、$2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$ です。"
  },
  {
    category: "数と式",
    question: "不等式 $2x - 3 > 5x + 6$ の解は？",
    choices: ["$x < 3$", "$x > -3$", "$x < -3$", "$x > 3$"],
    answer: 3,
    explanation: "$-3x > 9$ となり、両辺を $-3$ で割ると不等号の向きが変わって $x < -3$ です。"
  },
  {
    category: "数と式",
    question: "$x = \\dfrac{1}{\\sqrt{2} - 1}$ のとき、$x$ の整数部分は？",
    choices: ["$1$", "$2$", "$3$", "$4$"],
    answer: 2,
    explanation: "有理化すると $x = \\sqrt{2} + 1$。$\\sqrt{2} = 1.414\\cdots$ なので $x = 2.414\\cdots$、整数部分は 2 です。"
  },
  {
    category: "数と式",
    question: "$x + y = 5$、$xy = 3$ のとき、$x^{2} + y^{2}$ の値は？",
    choices: ["$22$", "$31$", "$19$", "$25$"],
    answer: 3,
    explanation: "$x^{2} + y^{2} = (x + y)^{2} - 2xy = 25 - 6 = 19$ です。"
  },
  {
    category: "数と式",
    question: "$x^{2} - y^{2} + 2y - 1$ を因数分解すると？",
    choices: ["$(x + y - 1)(x - y + 1)$", "$(x + y + 1)(x - y - 1)$", "$(x - y + 1)^{2}$", "$(x + y - 1)(x + y + 1)$"],
    answer: 1,
    explanation: "$x^{2} - (y^{2} - 2y + 1) = x^{2} - (y - 1)^{2} = (x + y - 1)(x - y + 1)$ です。"
  },
  {
    category: "集合と論理",
    question: "$x = 2$ は、$x^{2} = 4$ であるための何条件？",
    choices: ["必要条件であるが十分条件でない", "十分条件であるが必要条件でない", "必要十分条件", "必要条件でも十分条件でもない"],
    answer: 2,
    explanation: "$x = 2 \\Rightarrow x^{2} = 4$ は真ですが、$x^{2} = 4 \\Rightarrow x = 2$ は偽（$x = -2$ が反例）です。よって十分条件であるが必要条件ではありません。"
  },
  {
    category: "集合と論理",
    question: "命題「$x > 2$ ならば $x > 1$」の対偶は？",
    choices: ["$x > 1$ ならば $x > 2$", "$x \\leqq 2$ ならば $x \\leqq 1$", "$x \\leqq 1$ ならば $x \\leqq 2$", "$x > 2$ ならば $x \\leqq 1$"],
    answer: 3,
    explanation: "「$p$ ならば $q$」の対偶は「$q$ でないならば $p$ でない」なので、「$x \\leqq 1$ ならば $x \\leqq 2$」です。"
  },
  {
    category: "集合と論理",
    question: "1 から 10 までの整数のうち、2 の倍数または 3 の倍数であるものは何個？",
    choices: ["6個", "7個", "8個", "9個"],
    answer: 2,
    explanation: "2の倍数 5個、3の倍数 3個、6の倍数 1個なので、$5 + 3 - 1 = 7$個です。"
  },
  {
    category: "集合と論理",
    question: "「すべての実数 $x$ について $x^{2} \\geqq 0$」の否定は？",
    choices: ["すべての実数 $x$ について $x^{2} < 0$", "ある実数 $x$ について $x^{2} \\geqq 0$", "すべての実数 $x$ について $x^{2} \\leqq 0$", "ある実数 $x$ について $x^{2} < 0$"],
    answer: 4,
    explanation: "「すべての $x$ について $p$」の否定は「ある $x$ について $p$ でない」です。"
  },
  {
    category: "2次関数",
    question: "$y = -x^{2} + 6x - 5$ の最大値は？",
    choices: ["$-5$", "$3$", "$4$", "$9$"],
    answer: 3,
    explanation: "$y = -(x - 3)^{2} + 4$ なので、$x = 3$ のとき最大値 4 をとります。"
  },
  {
    category: "2次関数",
    question: "$y = x^{2}$ のグラフを $x$軸方向に 2、$y$軸方向に $-3$ だけ平行移動した式は？",
    choices: ["$y = x^{2} - 4x + 1$", "$y = x^{2} + 4x + 1$", "$y = x^{2} - 4x + 7$", "$y = x^{2} + 4x - 3$"],
    answer: 1,
    explanation: "$y = (x - 2)^{2} - 3 = x^{2} - 4x + 1$ です。"
  },
  {
    category: "2次関数",
    question: "2次不等式 $x^{2} - x - 6 < 0$ の解は？",
    choices: ["$x < -2, 3 < x$", "$-3 < x < 2$", "$-2 < x < 3$", "$x < -3, 2 < x$"],
    answer: 3,
    explanation: "$(x - 3)(x + 2) < 0$ なので、$-2 < x < 3$ です。"
  },
  {
    category: "2次関数",
    question: "$y = x^{2} - 2x + k$ のグラフが $x$軸に接するときの $k$ の値は？",
    choices: ["$1$", "$-1$", "$2$", "$0$"],
    answer: 1,
    explanation: "判別式 $\\dfrac{D}{4} = 1 - k = 0$ より $k = 1$ です。"
  },
  {
    category: "2次関数",
    question: "放物線 $y = 2x^{2} - 4x + 3$ の軸は？",
    choices: ["$x = -1$", "$x = 1$", "$x = 2$", "$x = 4$"],
    answer: 2,
    explanation: "$y = 2(x - 1)^{2} + 1$ なので、軸は $x = 1$ です。"
  },
  {
    category: "2次関数",
    question: "$0 \\leqq x \\leqq 3$ における $y = x^{2} - 2x$ の最大値は？",
    choices: ["$0$", "$3$", "$-1$", "$9$"],
    answer: 2,
    explanation: "頂点は $(1, -1)$。区間の端では $x = 0$ で 0、$x = 3$ で 3。軸から遠い $x = 3$ で最大値 3 です。"
  },
  {
    category: "2次関数",
    question: "2次方程式 $2x^{2} + 3x - 2 = 0$ の解は？",
    choices: ["$x = -\\dfrac{1}{2}, 2$", "$x = 1, -2$", "$x = 2, -1$", "$x = \\dfrac{1}{2}, -2$"],
    answer: 4,
    explanation: "$(2x - 1)(x + 2) = 0$ なので、$x = \\dfrac{1}{2}, -2$ です。"
  },
  {
    category: "2次関数",
    question: "頂点が $(1, 2)$ で、点 $(2, 5)$ を通る放物線の式は？",
    choices: ["$y = 3x^{2} - 6x + 5$", "$y = 3x^{2} + 6x + 5$", "$y = x^{2} - 2x + 3$", "$y = 3x^{2} - 6x + 2$"],
    answer: 1,
    explanation: "$y = a(x - 1)^{2} + 2$ に $(2, 5)$ を代入して $a = 3$。$y = 3(x - 1)^{2} + 2 = 3x^{2} - 6x + 5$ です。"
  },
  {
    category: "三角比",
    question: "$\\sin 135^\\circ$ の値は？",
    choices: ["$-\\dfrac{1}{\\sqrt{2}}$", "$\\dfrac{1}{\\sqrt{2}}$", "$-\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{1}{2}$"],
    answer: 2,
    explanation: "$\\sin 135^\\circ = \\sin (180^\\circ - 45^\\circ ) = \\sin 45^\\circ = \\dfrac{1}{\\sqrt{2}}$ です。"
  },
  {
    category: "三角比",
    question: "$\\cos 150^\\circ$ の値は？",
    choices: ["$\\dfrac{\\sqrt{3}}{2}$", "$-\\dfrac{1}{2}$", "$-\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{1}{2}$"],
    answer: 3,
    explanation: "$\\cos 150^\\circ = -\\cos 30^\\circ = -\\dfrac{\\sqrt{3}}{2}$ です。"
  },
  {
    category: "三角比",
    question: "$\\tan \\theta = 2$（$0^\\circ < \\theta < 90^\\circ$）のとき、$\\cos ^{2}\\theta$ の値は？",
    choices: ["$\\dfrac{2}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{1}{\\sqrt{5}}$", "$\\dfrac{1}{5}$"],
    answer: 4,
    explanation: "$1 + \\tan ^{2}\\theta = 1/\\cos ^{2}\\theta$ より、$\\cos ^{2}\\theta = \\dfrac{1}{1 + 4} = \\dfrac{1}{5}$ です。"
  },
  {
    category: "三角比",
    question: "$\\triangle ABC$ で $b = 4$、$c = 5$、$A = 30^\\circ$ のとき、面積は？",
    choices: ["$5\\sqrt{3}$", "$10$", "$5$", "$10\\sqrt{3}$"],
    answer: 3,
    explanation: "$S = \\left(\\dfrac{1}{2}\\right)bc \\sin A = \\left(\\dfrac{1}{2}\\right) \\times 4 \\times 5 \\times \\left(\\dfrac{1}{2}\\right) = 5$ です。"
  },
  {
    category: "三角比",
    question: "$\\sin \\theta + \\cos \\theta = \\dfrac{1}{2}$ のとき、$\\sin \\theta \\cos \\theta$ の値は？",
    choices: ["$-\\dfrac{3}{8}$", "$\\dfrac{3}{8}$", "$-\\dfrac{3}{4}$", "$\\dfrac{1}{4}$"],
    answer: 1,
    explanation: "両辺を2乗すると $1 + 2 \\sin \\theta \\cos \\theta = \\dfrac{1}{4}$ なので、$\\sin \\theta \\cos \\theta = -\\dfrac{3}{8}$ です。"
  },
  {
    category: "三角比",
    question: "3辺が $a = 7$、$b = 5$、$c = 3$ の三角形で、最も大きい角 $A$ は？",
    choices: ["$90^\\circ$", "$120^\\circ$", "$135^\\circ$", "$150^\\circ$"],
    answer: 2,
    explanation: "$\\cos A = \\dfrac{5^{2} + 3^{2} - 7^{2}}{2\\cdot 5\\cdot 3} = -\\dfrac{15}{30} = -\\dfrac{1}{2}$ なので、$A = 120^\\circ$ です。"
  },
  {
    category: "三角比",
    question: "$0^\\circ \\leqq \\theta \\leqq 180^\\circ$ で $\\sin \\theta = \\dfrac{1}{2}$ を満たす $\\theta$ は？",
    choices: ["$30^\\circ$", "$60^\\circ$", "$30^\\circ , 150^\\circ$", "$60^\\circ , 120^\\circ$"],
    answer: 3,
    explanation: "単位円で $y$座標が $\\dfrac{1}{2}$ になる角は $30^\\circ$ と $150^\\circ$ の2つです。"
  },
  {
    category: "三角比",
    question: "スコアボードから 10 m 離れた地点で、てっぺんを見上げた角が $30^\\circ$ だった。スコアボードの高さは？（目の高さは考えない）",
    choices: ["5 m", "$\\dfrac{10\\sqrt{3}}{3} m$", "$10\\sqrt{3} m$", "20 m"],
    answer: 2,
    explanation: "高さ $= 10 \\times \\tan 30^\\circ = \\dfrac{10}{\\sqrt{3}} = \\dfrac{10\\sqrt{3}}{3}$（約 5.8 m）です。"
  },
  {
    category: "データの分析",
    question: "データ $2, 4, 4, 5, 10$ の中央値は？",
    choices: ["$4$", "$4.5$", "$5$", "$8$"],
    answer: 1,
    explanation: "小さい順に並べたときの真ん中（3番目）の値なので 4 です。平均値 5 と混同しないように。"
  },
  {
    category: "データの分析",
    question: "データ $2, 4, 4, 5, 10$ の分散は？",
    choices: ["$6$", "$7.2$", "$36$", "$5$"],
    answer: 2,
    explanation: "平均は 5。偏差の2乗は $9, 1, 1, 0, 25$ で合計 36。分散は $36 \\div 5 = 7.2$ です。"
  },
  {
    category: "データの分析",
    question: "データ $1, 3, 5, 7, 9$ の四分位範囲は？",
    choices: ["$8$", "$4$", "$5$", "$6$"],
    answer: 4,
    explanation: "中央値 5 を除いた下半分 $\\{1, 3\\}$ から $Q1 = 2$、上半分 $\\{7, 9\\}$ から $Q3 = 8$。四分位範囲は $8 - 2 = 6$ です。"
  },
  {
    category: "データの分析",
    question: "相関係数 $r$ がとりうる値の範囲は？",
    choices: ["$0 \\leqq r \\leqq 1$", "$0 < r < 1$", "$-1 \\leqq r \\leqq 1$", "$r \\geqq 0$"],
    answer: 3,
    explanation: "相関係数は $-1$ 以上 1 以下の値をとります。"
  },
  {
    category: "データの分析",
    question: "変量 $x$ の分散が 4 のとき、$y = 3x + 2$ の分散は？",
    choices: ["$14$", "$36$", "$12$", "$38$"],
    answer: 2,
    explanation: "$y = ax + b$ の分散は $a^{2}$ 倍になり、$b$ は影響しません。$9 \\times 4 = 36$ です。"
  },
  {
    category: "データの分析",
    question: "データのすべての値に 5 を加えると、平均値と分散はどうなる？",
    choices: ["平均値も分散も変わらない", "平均値は変わらず、分散は 5 増える", "平均値も分散も 5 増える", "平均値は 5 増え、分散は変わらない"],
    answer: 4,
    explanation: "全体が平行移動するだけなので、平均値は 5 増え、散らばり（分散）は変わりません。"
  },
  {
    category: "場合の数",
    question: "野球部員 5人から主将と副主将を1人ずつ選ぶ方法は何通り？",
    choices: ["10通り", "20通り", "25通り", "60通り"],
    answer: 2,
    explanation: "役職に区別があるので順列 ${}_{5}\\mathrm{P}_{2} = 5 \\times 4 = 20$ 通りです。"
  },
  {
    category: "場合の数",
    question: "6人が円形のテーブルに座る方法は何通り？",
    choices: ["120通り", "720通り", "60通り", "360通り"],
    answer: 1,
    explanation: "円順列なので $(6 - 1)! = 120$ 通りです。"
  },
  {
    category: "場合の数",
    question: "$1, 2, 3, 4, 5$ から異なる3つの数字を使ってできる3桁の偶数は何個？",
    choices: ["36個", "12個", "60個", "24個"],
    answer: 4,
    explanation: "一の位が 2 か 4 の2通り、残りの百・十の位は ${}_{4}\\mathrm{P}_{2} = 12$ 通り。$2 \\times 12 = 24$ 個です。"
  },
  {
    category: "場合の数",
    question: "$a, a, b, b, c$ の5文字を1列に並べる方法は何通り？",
    choices: ["60通り", "20通り", "30通り", "120通り"],
    answer: 3,
    explanation: "同じものを含む順列なので $\\dfrac{5!}{2!\\cdot 2!} = \\dfrac{120}{4} = 30$ 通りです。"
  },
  {
    category: "場合の数",
    question: "正八角形の対角線は何本？",
    choices: ["16本", "20本", "28本", "24本"],
    answer: 2,
    explanation: "8つの頂点から2つ選ぶ ${}_{8}\\mathrm{C}_{2} = 28$ から、辺の 8 本を引いて 20 本です。"
  },
  {
    category: "場合の数",
    question: "4人を2人ずつの2組に分ける方法は何通り？（組に区別はない）",
    choices: ["6通り", "3通り", "12通り", "2通り"],
    answer: 2,
    explanation: "${}_{4}\\mathrm{C}_{2} = 6$ ですが、組に区別がないので $2!$ で割って 3 通りです。"
  },
  {
    category: "場合の数",
    question: "9人の選手からピッチャーとキャッチャーを1人ずつ選ぶ方法は何通り？",
    choices: ["36通り", "81通り", "72通り", "18通り"],
    answer: 3,
    explanation: "役割に区別があるので ${}_{9}\\mathrm{P}_{2} = 9 \\times 8 = 72$ 通りです。"
  },
  {
    category: "確率",
    question: "3人で1回じゃんけんをするとき、あいこになる確率は？",
    choices: ["$\\dfrac{1}{9}$", "$\\dfrac{2}{9}$", "$\\dfrac{1}{3}$", "$\\dfrac{2}{3}$"],
    answer: 3,
    explanation: "手の出し方は $3^{3} = 27$ 通り。全員同じ手が 3 通り、全員違う手が $3! = 6$ 通りで、$\\dfrac{9}{27} = \\dfrac{1}{3}$ です。"
  },
  {
    category: "確率",
    question: "サイコロを2個投げて、目の和が 7 になる確率は？",
    choices: ["$\\dfrac{5}{36}$", "$\\dfrac{1}{6}$", "$\\dfrac{7}{36}$", "$\\dfrac{1}{12}$"],
    answer: 2,
    explanation: "和が 7 になるのは $(1,6)(2,5)(3,4)(4,3)(5,2)(6,1)$ の 6 通り。$\\dfrac{6}{36} = \\dfrac{1}{6}$ です。"
  },
  {
    category: "確率",
    question: "コインを3回投げて、少なくとも1回表が出る確率は？",
    choices: ["$\\dfrac{1}{8}$", "$\\dfrac{3}{8}$", "$\\dfrac{7}{8}$", "$\\dfrac{1}{2}$"],
    answer: 3,
    explanation: "余事象「3回とも裏」の確率 $\\dfrac{1}{8}$ を 1 から引いて $\\dfrac{7}{8}$ です。"
  },
  {
    category: "確率",
    question: "赤玉3個と白玉2個が入った袋から同時に2個取り出すとき、2個とも赤玉である確率は？",
    choices: ["$\\dfrac{9}{25}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{5}$", "$\\dfrac{3}{10}$"],
    answer: 4,
    explanation: "$\\dfrac{{}_{3}\\mathrm{C}_{2}}{{}_{5}\\mathrm{C}_{2}} = \\dfrac{3}{10}$ です。"
  },
  {
    category: "確率",
    question: "サイコロを2個投げて目の和が偶数だったとき、2個とも奇数である条件付き確率は？",
    choices: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{3}$"],
    answer: 1,
    explanation: "和が偶数になるのは「両方偶数」9通り＋「両方奇数」9通りの 18 通り。そのうち両方奇数は 9 通りで $\\dfrac{9}{18} = \\dfrac{1}{2}$ です。"
  },
  {
    category: "確率",
    question: "確率 $\\dfrac{1}{3}$ で成功する試行を3回くり返すとき、ちょうど2回成功する確率は？",
    choices: ["$\\dfrac{4}{27}$", "$\\dfrac{2}{9}$", "$\\dfrac{1}{9}$", "$\\dfrac{1}{3}$"],
    answer: 2,
    explanation: "反復試行の確率 ${}_{3}\\mathrm{C}_{2} \\left(\\dfrac{1}{3}\\right)^{2} \\left(\\dfrac{2}{3}\\right) = 3 \\times \\dfrac{1}{9} \\times \\dfrac{2}{3} = \\dfrac{2}{9}$ です。"
  },
  {
    category: "確率",
    question: "サイコロを1回投げ、出た目 $\\times 100$ 円がもらえるとき、もらえる金額の期待値は？",
    choices: ["300円", "600円", "350円", "400円"],
    answer: 3,
    explanation: "$(100 + 200 + \\cdots + 600) \\times \\dfrac{1}{6} = \\dfrac{2100}{6} = 350$ 円です。"
  },
  {
    category: "整数の性質",
    question: "168 と 180 の最大公約数は？",
    choices: ["$6$", "$12$", "$24$", "$36$"],
    answer: 2,
    explanation: "$168 = 2^{3}\\cdot 3\\cdot 7$、$180 = 2^{2}\\cdot 3^{2}\\cdot 5$ なので、共通部分は $2^{2}\\cdot 3 = 12$ です。"
  },
  {
    category: "整数の性質",
    question: "12 と 18 の最小公倍数は？",
    choices: ["$72$", "$6$", "$216$", "$36$"],
    answer: 4,
    explanation: "$12 = 2^{2}\\cdot 3$、$18 = 2\\cdot 3^{2}$ なので、$2^{2}\\cdot 3^{2} = 36$ です。"
  },
  {
    category: "整数の性質",
    question: "360 の正の約数は何個？",
    choices: ["12個", "18個", "24個", "36個"],
    answer: 3,
    explanation: "$360 = 2^{3}\\cdot 3^{2}\\cdot 5$ なので、$(3 + 1)(2 + 1)(1 + 1) = 24$ 個です。"
  },
  {
    category: "整数の性質",
    question: "10進法の 25 を2進法で表すと？",
    choices: ["$10011$", "$10101$", "$11001$", "$11100$"],
    answer: 3,
    explanation: "$25 = 16 + 8 + 1 = 1\\cdot 2^{4} + 1\\cdot 2^{3} + 0\\cdot 2^{2} + 0\\cdot 2 + 1$ なので $11001_{(2)}$ です。"
  },
  {
    category: "整数の性質",
    question: "方程式 $3x + 5y = 1$ を満たす整数 $(x, y)$ の組の1つは？",
    choices: ["$(2, -1)$", "$(1, -1)$", "$(-2, 1)$", "$(2, 1)$"],
    answer: 1,
    explanation: "$3\\cdot 2 + 5\\cdot (-1) = 6 - 5 = 1$ です。他は $-2$、$-1$、11 になります。"
  },
  {
    category: "図形の性質",
    question: "三角形の重心は、各中線をどんな比に内分する？（頂点側：辺側）",
    choices: ["1 : 1", "2 : 1", "3 : 1", "3 : 2"],
    answer: 2,
    explanation: "重心は中線を頂点側から 2 : 1 に内分します。"
  },
  {
    category: "図形の性質",
    question: "円に内接する四角形 $ABCD$ で $\\angle A = 70^\\circ$ のとき、$\\angle C$ は？",
    choices: ["$70^\\circ$", "$90^\\circ$", "$110^\\circ$", "$140^\\circ$"],
    answer: 3,
    explanation: "円に内接する四角形の向かい合う角の和は $180^\\circ$ なので、$\\angle C = 110^\\circ$ です。"
  },
  {
    category: "図形の性質",
    question: "点 $P$ を通る2直線が円と $A, B$ および $C, D$ で交わる。$PA = 4$、$PB = 6$、$PC = 3$ のとき $PD$ は？",
    choices: ["$4.5$", "$7$", "$8$", "$9$"],
    answer: 3,
    explanation: "方べきの定理 $PA\\cdot PB = PC\\cdot PD$ より、$24 = 3\\cdot PD$、$PD = 8$ です。"
  },
  {
    category: "図形の性質",
    question: "$\\triangle ABC$ で $AB = 6$、$AC = 4$、$BC = 5$。$\\angle A$ の二等分線と $BC$ の交点を $D$ とするとき、$BD$ は？",
    choices: ["$3$", "$2$", "$2.5$", "$3.5$"],
    answer: 1,
    explanation: "$BD$ : $DC = AB$ : $AC = 3$ : 2 なので、$BD = 5 \\times \\dfrac{3}{5} = 3$ です。"
  },
  {
    category: "図形の性質",
    question: "ある弧に対する中心角が $100^\\circ$ のとき、同じ弧に対する円周角は？",
    choices: ["$100^\\circ$", "$50^\\circ$", "$130^\\circ$", "$80^\\circ$"],
    answer: 2,
    explanation: "円周角は中心角の半分なので $50^\\circ$ です。"
  },
  // ---- 数学II・B・C ----
  {
    category: "式と証明",
    question: "$(2x + 1)^{5}$ を展開したとき、$x^{3}$ の係数は？",
    choices: ["$10$", "$80$", "$160$", "$40$"],
    answer: 2,
    explanation: "二項定理より ${}_{5}\\mathrm{C}_{3} \\cdot 2^{3} = 10 \\times 8 = 80$ です。"
  },
  {
    category: "式と証明",
    question: "$\\left(x + \\dfrac{1}{x}\\right)^{6}$ を展開したときの定数項は？",
    choices: ["$15$", "$6$", "$1$", "$20$"],
    answer: 4,
    explanation: "一般項は ${}_{6}\\mathrm{C}_{r} x^{6-r} \\left(\\dfrac{1}{x}\\right)^{r} = {}_{6}\\mathrm{C}_{r} x^{6-2r}$。$r = 3$ のとき定数項で ${}_{6}\\mathrm{C}_{3} = 20$ です。"
  },
  {
    category: "式と証明",
    question: "$\\dfrac{1}{x - 1} - \\dfrac{1}{x + 1}$ を計算すると？",
    choices: ["$\\dfrac{2}{x^{2} - 1}$", "$-\\dfrac{2}{x^{2} - 1}$", "$\\dfrac{2x}{x^{2} - 1}$", "$0$"],
    answer: 1,
    explanation: "通分すると $\\dfrac{(x + 1) - (x - 1)}{(x - 1)(x + 1)} = \\dfrac{2}{x^{2} - 1}$ です。"
  },
  {
    category: "式と証明",
    question: "$a(x - 1) + b(x + 1) = 3x + 1$ が $x$ についての恒等式となる $a, b$ は？",
    choices: ["$a = 2, b = 1$", "$a = 1, b = 2$", "$a = -1, b = 2$", "$a = 1, b = -2$"],
    answer: 2,
    explanation: "左辺 $= (a + b)x + (-a + b)$。係数を比べて $a + b = 3$、$-a + b = 1$ より $a = 1, b = 2$ です。"
  },
  {
    category: "式と証明",
    question: "$x > 0$ のとき、$x + \\dfrac{4}{x}$ の最小値は？",
    choices: ["$8$", "$4$", "$5$", "$2$"],
    answer: 2,
    explanation: "相加平均と相乗平均の関係より $x + \\dfrac{4}{x} \\geqq 2\\sqrt{x \\cdot \\dfrac{4}{x}} = 4$。等号は $x = 2$ のときです。"
  },
  {
    category: "式と証明",
    question: "$a > 0, b > 0, ab = 9$ のとき、$a + b$ の最小値は？",
    choices: ["$18$", "$6$", "$9$", "$3$"],
    answer: 2,
    explanation: "$a + b \\geqq 2\\sqrt{ab} = 2 \\times 3 = 6$。等号は $a = b = 3$ のときです。"
  },
  {
    category: "式と証明",
    question: "${}_{n}\\mathrm{C}_{0} + {}_{n}\\mathrm{C}_{1} + {}_{n}\\mathrm{C}_{2} + \\cdots + {}_{n}\\mathrm{C}_{n}$ の値は？",
    choices: ["$n^{2}$", "$2n$", "$2^{n}$", "$n!$"],
    answer: 3,
    explanation: "二項定理 $(1 + x)^{n} = \\sum {}_{n}\\mathrm{C}_{k} x^{k}$ に $x = 1$ を代入すると $2^{n}$ です。"
  },
  {
    category: "式と証明",
    question: "実数 $x, y$ が $x + y = 1$ を満たすとき、$x^{2} + y^{2}$ の最小値は？",
    choices: ["$0$", "$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{4}$"],
    answer: 2,
    explanation: "$y = 1 - x$ を代入すると $2x^{2} - 2x + 1 = 2\\left(x - \\dfrac{1}{2}\\right)^{2} + \\dfrac{1}{2}$。最小値は $\\dfrac{1}{2}$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$(2 + 3i)(1 - i)$ を計算すると？",
    choices: ["$5 - i$", "$5 + i$", "$2 - 3i$", "$-1 + i$"],
    answer: 2,
    explanation: "$2 - 2i + 3i - 3i^{2} = 2 + i + 3 = 5 + i$ です（$i^{2} = -1$）。"
  },
  {
    category: "複素数と方程式",
    question: "$i^{10}$ の値は？",
    choices: ["$-i$", "$-1$", "$i$", "$1$"],
    answer: 2,
    explanation: "$i^{4} = 1$ なので $i^{10} = (i^{4})^{2} \\cdot i^{2} = -1$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$\\dfrac{1 + i}{1 - i}$ を計算すると？",
    choices: ["$1 + i$", "$1$", "$-i$", "$i$"],
    answer: 4,
    explanation: "分母・分子に $(1 + i)$ をかけると $\\dfrac{(1 + i)^{2}}{2} = \\dfrac{2i}{2} = i$ です。"
  },
  {
    category: "複素数と方程式",
    question: "2次方程式 $x^{2} + 2x + 5 = 0$ の解は？",
    choices: ["$x = -1 \\pm 4i$", "$x = -2 \\pm i$", "$x = -1 \\pm 2i$", "$x = 1 \\pm 2i$"],
    answer: 3,
    explanation: "解の公式より $x = -1 \\pm \\sqrt{1 - 5} = -1 \\pm 2i$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$2x^{2} - 3x + 5 = 0$ の2つの解を $\\alpha , \\beta$ とするとき、$\\alpha + \\beta$ と $\\alpha \\beta$ は？",
    choices: ["$\\alpha + \\beta = \\dfrac{3}{2}, \\alpha \\beta = \\dfrac{5}{2}$", "$\\alpha + \\beta = \\dfrac{3}{2}, \\alpha \\beta = -\\dfrac{5}{2}$", "$\\alpha + \\beta = 3, \\alpha \\beta = 5$", "$\\alpha + \\beta = -\\dfrac{3}{2}, \\alpha \\beta = \\dfrac{5}{2}$"],
    answer: 1,
    explanation: "解と係数の関係より $\\alpha + \\beta = -\\dfrac{-3}{2} = \\dfrac{3}{2}$、$\\alpha \\beta = \\dfrac{5}{2}$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$\\alpha + \\beta = 3$、$\\alpha \\beta = 1$ のとき、$\\alpha ^{2} + \\beta ^{2}$ の値は？",
    choices: ["$7$", "$11$", "$5$", "$9$"],
    answer: 1,
    explanation: "$\\alpha ^{2} + \\beta ^{2} = (\\alpha + \\beta )^{2} - 2\\alpha \\beta = 9 - 2 = 7$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$x^{3} + 2x^{2} - x + 3$ を $x - 1$ で割った余りは？",
    choices: ["$3$", "$7$", "$5$", "$1$"],
    answer: 3,
    explanation: "剰余の定理より、余りは $f(1) = 1 + 2 - 1 + 3 = 5$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$x^{3} - 3x + 2$ を因数分解すると？",
    choices: ["$(x - 1)^{2}(x + 2)$", "$(x - 1)(x^{2} + x + 2)$", "$(x + 1)^{2}(x - 2)$", "$(x - 1)(x + 1)(x - 2)$"],
    answer: 1,
    explanation: "$x = 1$ を代入すると 0 なので $x - 1$ を因数にもちます。割ると $x^{2} + x - 2 = (x - 1)(x + 2)$ となり、$(x - 1)^{2}(x + 2)$ です。"
  },
  {
    category: "複素数と方程式",
    question: "$x^{2} + kx + 4 = 0$ が虚数解をもつような $k$ の範囲は？",
    choices: ["$-4 < k < 4$", "$-2 < k < 2$", "$k < 4$", "$k < -4, 4 < k$"],
    answer: 1,
    explanation: "判別式 $D = k^{2} - 16 < 0$ より $-4 < k < 4$ です。"
  },
  {
    category: "複素数と方程式",
    question: "1 の3乗根のうち虚数であるものを $\\omega$ とするとき、$\\omega ^{2} + \\omega + 1$ の値は？",
    choices: ["$1$", "$0$", "$\\omega$", "$-1$"],
    answer: 2,
    explanation: "$\\omega ^{3} = 1$ より $(\\omega - 1)(\\omega ^{2} + \\omega + 1) = 0$。$\\omega \\neq 1$ なので $\\omega ^{2} + \\omega + 1 = 0$ です。"
  },
  {
    category: "複素数と方程式",
    question: "方程式 $x^{3} = 8$ の虚数解は？",
    choices: ["$x = -1 \\pm \\sqrt{3} i$", "$x = -1 \\pm 2i$", "$x = -2 \\pm \\sqrt{3} i$", "$x = 1 \\pm \\sqrt{3} i$"],
    answer: 1,
    explanation: "$x^{3} - 8 = (x - 2)(x^{2} + 2x + 4) = 0$。$x^{2} + 2x + 4 = 0$ を解いて $x = -1 \\pm \\sqrt{3} i$ です。"
  },
  {
    category: "図形と方程式",
    question: "2点 $A(1, 2)$、$B(4, 6)$ の間の距離は？",
    choices: ["$\\sqrt{7}$", "$5$", "$7$", "$25$"],
    answer: 2,
    explanation: "$\\sqrt{(4 - 1)^{2} + (6 - 2)^{2}} = \\sqrt{9 + 16} = 5$ です。"
  },
  {
    category: "図形と方程式",
    question: "2点 $A(1, 2)$、$B(7, -4)$ を結ぶ線分 $AB$ を 2 : 1 に内分する点の座標は？",
    choices: ["$(13, -10)$", "$(4, -1)$", "$(5, -2)$", "$(3, 0)$"],
    answer: 3,
    explanation: "$\\left(\\dfrac{1\\cdot 1 + 2\\cdot 7}{3}, \\dfrac{1\\cdot 2 + 2\\cdot (-4)}{3}\\right) = (5, -2)$ です。$(13, -10)$ は 2 : 1 に外分する点です。"
  },
  {
    category: "図形と方程式",
    question: "点 $(1, 2)$ を通り、傾きが 3 の直線の方程式は？",
    choices: ["$y = 3x - 1$", "$y = 3x - 5$", "$y = 3x + 2$", "$y = 3x + 1$"],
    answer: 1,
    explanation: "$y - 2 = 3(x - 1)$ より $y = 3x - 1$ です。"
  },
  {
    category: "図形と方程式",
    question: "直線 $y = 2x + 1$ に垂直で、原点を通る直線の方程式は？",
    choices: ["$y = \\left(\\dfrac{1}{2}\\right)x$", "$y = -2x$", "$y = 2x$", "$y = -\\left(\\dfrac{1}{2}\\right)x$"],
    answer: 4,
    explanation: "垂直な2直線の傾きの積は $-1$ なので、傾きは $-\\dfrac{1}{2}$。原点を通るので $y = -\\left(\\dfrac{1}{2}\\right)x$ です。"
  },
  {
    category: "図形と方程式",
    question: "点 $(3, 4)$ と直線 $3x + 4y - 5 = 0$ の距離は？",
    choices: ["$5$", "$3$", "$20$", "$4$"],
    answer: 4,
    explanation: "点と直線の距離の公式より $\\dfrac{|3\\cdot 3 + 4\\cdot 4 - 5|}{\\sqrt{3^{2} + 4^{2}}} = \\dfrac{20}{5} = 4$ です。"
  },
  {
    category: "図形と方程式",
    question: "円 $x^{2} + y^{2} - 4x + 6y - 3 = 0$ の中心と半径は？",
    choices: ["中心 $(2, -3)$、半径 16", "中心 $(-2, 3)$、半径 $\\sqrt{3}$", "中心 $(-2, 3)$、半径 4", "中心 $(2, -3)$、半径 4"],
    answer: 4,
    explanation: "$(x - 2)^{2} + (y + 3)^{2} = 3 + 4 + 9 = 16$ と変形できるので、中心 $(2, -3)$、半径 4 です。"
  },
  {
    category: "図形と方程式",
    question: "円 $x^{2} + y^{2} = 10$ 上の点 $(1, 3)$ における接線の方程式は？",
    choices: ["$x - 3y = 10$", "$x + 3y = 1$", "$3x + y = 10$", "$x + 3y = 10$"],
    answer: 4,
    explanation: "円 $x^{2} + y^{2} = r^{2}$ 上の点 $(x_{1}, y_{1})$ における接線は $x_{1}x + y_{1}y = r^{2}$ なので、$x + 3y = 10$ です。"
  },
  {
    category: "図形と方程式",
    question: "円 $x^{2} + y^{2} = 5$ と直線 $y = 2x + k$ が接するときの $k$ の値は？",
    choices: ["$k = 5$", "$k = \\pm 5$", "$k = \\pm \\sqrt{5}$", "$k = \\pm 25$"],
    answer: 2,
    explanation: "中心 $(0, 0)$ と直線 $2x - y + k = 0$ の距離 $\\dfrac{|k|}{\\sqrt{5}}$ が半径 $\\sqrt{5}$ に等しいので $|k| = 5$、$k = \\pm 5$ です。"
  },
  {
    category: "図形と方程式",
    question: "不等式 $x^{2} + y^{2} < 4$ の表す領域は？",
    choices: ["原点中心・半径4の円の内部", "原点中心・半径2の円の内部（境界を含む）", "原点中心・半径2の円の外部", "原点中心・半径2の円の内部（境界を含まない）"],
    answer: 4,
    explanation: "$x^{2} + y^{2} = 4$ は原点中心・半径2の円。「$<$」なので内部で、境界は含みません。"
  },
  {
    category: "図形と方程式",
    question: "2点 $A(0, 0)$、$B(4, 0)$ から等しい距離にある点 $P$ の軌跡は？",
    choices: ["直線 $y = 2$", "直線 $y = x$", "円 $x^{2} + y^{2} = 4$", "直線 $x = 2$"],
    answer: 4,
    explanation: "$P(x, y)$ とすると $x^{2} + y^{2} = (x - 4)^{2} + y^{2}$ より $x = 2$。線分 $AB$ の垂直二等分線です。"
  },
  {
    category: "三角関数",
    question: "$210^\\circ$ を弧度法で表すと？",
    choices: ["$\\dfrac{5\\pi }{6}$", "$\\dfrac{7\\pi }{3}$", "$\\dfrac{7\\pi }{6}$", "$\\dfrac{4\\pi }{3}$"],
    answer: 3,
    explanation: "$180^\\circ = \\pi$ なので $210^\\circ = 210 \\times \\dfrac{\\pi }{180} = \\dfrac{7\\pi }{6}$ です。"
  },
  {
    category: "三角関数",
    question: "$\\sin \\left(\\dfrac{7\\pi }{6}\\right)$ の値は？",
    choices: ["$-\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$-\\dfrac{1}{2}$", "$\\dfrac{1}{2}$"],
    answer: 3,
    explanation: "$\\dfrac{7\\pi }{6} = \\pi + \\dfrac{\\pi }{6}$ なので $\\sin \\left(\\dfrac{7\\pi }{6}\\right) = -\\sin \\left(\\dfrac{\\pi }{6}\\right) = -\\dfrac{1}{2}$ です。"
  },
  {
    category: "三角関数",
    question: "$\\tan \\left(\\dfrac{3\\pi }{4}\\right)$ の値は？",
    choices: ["$-1$", "$\\sqrt{3}$", "$-\\sqrt{3}$", "$1$"],
    answer: 1,
    explanation: "$\\dfrac{3\\pi }{4}$ は $135^\\circ$ で、$\\tan 135^\\circ = -1$ です。"
  },
  {
    category: "三角関数",
    question: "$\\sin 75^\\circ$ の値は？",
    choices: ["$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{2} + 1}{2}$", "$\\dfrac{\\sqrt{3} + 1}{2}$"],
    answer: 1,
    explanation: "加法定理より $\\sin (45^\\circ + 30^\\circ ) = \\sin 45^\\circ \\cos 30^\\circ + \\cos 45^\\circ \\sin 30^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$ です。"
  },
  {
    category: "三角関数",
    question: "$\\cos 105^\\circ$ の値は？",
    choices: ["$\\dfrac{\\sqrt{2} - \\sqrt{6}}{4}$", "$\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}$", "$-\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}$", "$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$"],
    answer: 1,
    explanation: "$\\cos (60^\\circ + 45^\\circ ) = \\cos 60^\\circ \\cos 45^\\circ - \\sin 60^\\circ \\sin 45^\\circ = \\dfrac{\\sqrt{2}}{4} - \\dfrac{\\sqrt{6}}{4} = \\dfrac{\\sqrt{2} - \\sqrt{6}}{4}$ です。"
  },
  {
    category: "三角関数",
    question: "$\\sin \\theta = \\dfrac{3}{5}$（$0 < \\theta < \\dfrac{\\pi }{2}$）のとき、$\\sin 2\\theta$ の値は？",
    choices: ["$\\dfrac{7}{25}$", "$\\dfrac{6}{5}$", "$\\dfrac{12}{25}$", "$\\dfrac{24}{25}$"],
    answer: 4,
    explanation: "$\\cos \\theta = \\dfrac{4}{5}$ なので、2倍角の公式より $\\sin 2\\theta = 2 \\cdot \\dfrac{3}{5} \\cdot \\dfrac{4}{5} = \\dfrac{24}{25}$ です。"
  },
  {
    category: "三角関数",
    question: "$\\sin \\theta = \\dfrac{3}{5}$ のとき、$\\cos 2\\theta$ の値は？",
    choices: ["$\\dfrac{7}{25}$", "$\\dfrac{16}{25}$", "$\\dfrac{24}{25}$", "$-\\dfrac{7}{25}$"],
    answer: 1,
    explanation: "$\\cos 2\\theta = 1 - 2\\sin ^{2}\\theta = 1 - \\dfrac{18}{25} = \\dfrac{7}{25}$ です。"
  },
  {
    category: "三角関数",
    question: "$y = \\sin \\theta + \\sqrt{3} \\cos \\theta$ の最大値は？",
    choices: ["$4$", "$\\sqrt{3}$", "$2$", "$1 + \\sqrt{3}$"],
    answer: 3,
    explanation: "三角関数の合成より $y = 2 \\sin \\left(\\theta + \\dfrac{\\pi }{3}\\right)$ なので、最大値は 2 です。"
  },
  {
    category: "三角関数",
    question: "$y = 2 \\sin 3x$ の周期は？",
    choices: ["$\\dfrac{2\\pi }{3}$", "$\\dfrac{3\\pi }{2}$", "$\\dfrac{\\pi }{3}$", "$6\\pi$"],
    answer: 1,
    explanation: "$\\sin kx$ の周期は $\\dfrac{2\\pi }{k}$ なので $\\dfrac{2\\pi }{3}$ です。前の 2 は振幅で、周期には関係しません。"
  },
  {
    category: "三角関数",
    question: "$0 \\leqq \\theta < 2\\pi$ のとき、$\\cos \\theta = -\\dfrac{1}{2}$ を満たす $\\theta$ は？",
    choices: ["$\\theta = \\dfrac{2\\pi }{3}, \\dfrac{4\\pi }{3}$", "$\\theta = \\dfrac{\\pi }{3}, \\dfrac{5\\pi }{3}$", "$\\theta = \\dfrac{2\\pi }{3}, \\dfrac{5\\pi }{3}$", "$\\theta = \\dfrac{5\\pi }{6}, \\dfrac{7\\pi }{6}$"],
    answer: 1,
    explanation: "単位円で $x$座標が $-\\dfrac{1}{2}$ になる角なので、$\\dfrac{2\\pi }{3}$ と $\\dfrac{4\\pi }{3}$ です。"
  },
  {
    category: "三角関数",
    question: "$0 \\leqq \\theta < 2\\pi$ のとき、$\\sin \\theta > \\dfrac{1}{2}$ を満たす $\\theta$ の範囲は？",
    choices: ["$0 \\leqq \\theta < \\dfrac{\\pi }{6}, \\dfrac{5\\pi }{6} < \\theta < 2\\pi$", "$\\dfrac{\\pi }{3} < \\theta < \\dfrac{2\\pi }{3}$", "$\\dfrac{\\pi }{6} < \\theta < \\dfrac{7\\pi }{6}$", "$\\dfrac{\\pi }{6} < \\theta < \\dfrac{5\\pi }{6}$"],
    answer: 4,
    explanation: "$\\sin \\theta = \\dfrac{1}{2}$ となるのは $\\dfrac{\\pi }{6}$ と $\\dfrac{5\\pi }{6}$。$y$座標が $\\dfrac{1}{2}$ より大きいのはその間です。"
  },
  {
    category: "三角関数",
    question: "半角の公式で、$\\cos ^{2}\\left(\\dfrac{\\theta }{2}\\right)$ を $\\cos \\theta$ で表すと？",
    choices: ["$\\dfrac{1 + \\cos \\theta }{2}$", "$\\dfrac{1 + \\sin \\theta }{2}$", "$1 + \\cos \\theta$", "$\\dfrac{1 - \\cos \\theta }{2}$"],
    answer: 1,
    explanation: "$\\cos \\theta = 2\\cos ^{2}\\left(\\dfrac{\\theta }{2}\\right) - 1$ より、$\\cos ^{2}\\left(\\dfrac{\\theta }{2}\\right) = \\dfrac{1 + \\cos \\theta }{2}$ です。"
  },
  {
    category: "三角関数",
    question: "1 ラジアンはおよそ何度？",
    choices: ["約 $60^\\circ$", "約 $57^\\circ$", "約 $3.14^\\circ$", "約 $45^\\circ$"],
    answer: 2,
    explanation: "1 ラジアン $= \\dfrac{180^\\circ }{\\pi } \\fallingdotseq 57.3^\\circ$ です。"
  },
  {
    category: "指数・対数",
    question: "$8^{\\frac{2}{3}}$ の値は？",
    choices: ["$4$", "$2$", "$\\dfrac{16}{3}$", "$64$"],
    answer: 1,
    explanation: "$8^{\\frac{2}{3}} = (\\sqrt[3]{8})^{2} = 2^{2} = 4$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\left(\\dfrac{1}{27}\\right)^{-\\frac{1}{3}}$ の値は？",
    choices: ["$9$", "$\\dfrac{1}{3}$", "$-3$", "$3$"],
    answer: 4,
    explanation: "$\\left(\\dfrac{1}{27}\\right)^{-\\frac{1}{3}} = 27^{\\frac{1}{3}} = 3$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\log _{2} 32$ の値は？",
    choices: ["$6$", "$5$", "$4$", "$16$"],
    answer: 2,
    explanation: "$2^{5} = 32$ なので $\\log _{2} 32 = 5$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\log _{3} 18 - \\log _{3} 2$ の値は？",
    choices: ["$3$", "$\\log _{3} 16$", "$2$", "$1$"],
    answer: 3,
    explanation: "$\\log _{3} 18 - \\log _{3} 2 = \\log _{3} \\left(\\dfrac{18}{2}\\right) = \\log _{3} 9 = 2$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\log _{2} 3 \\times \\log _{3} 8$ の値は？",
    choices: ["$24$", "$\\log _{2} 24$", "$3$", "$8$"],
    answer: 3,
    explanation: "底の変換より $\\log _{2} 3 \\times (\\log _{2} 8 / \\log _{2} 3) = \\log _{2} 8 = 3$ です。"
  },
  {
    category: "指数・対数",
    question: "方程式 $2^{x} = \\dfrac{1}{8}$ の解は？",
    choices: ["$x = -\\dfrac{1}{3}$", "$x = -3$", "$x = 3$", "$x = \\dfrac{1}{3}$"],
    answer: 2,
    explanation: "$\\dfrac{1}{8} = 2^{-3}$ なので $x = -3$ です。"
  },
  {
    category: "指数・対数",
    question: "方程式 $\\log _{2}(x - 1) = 3$ の解は？",
    choices: ["$x = 9$", "$x = 8$", "$x = 7$", "$x = 4$"],
    answer: 1,
    explanation: "$x - 1 = 2^{3} = 8$ より $x = 9$（真数条件 $x > 1$ も満たす）です。"
  },
  {
    category: "指数・対数",
    question: "不等式 $2^{x+1} > 16$ の解は？",
    choices: ["$x < 3$", "$x > 7$", "$x > 3$", "$x > 4$"],
    answer: 3,
    explanation: "$16 = 2^{4}$ で、底 $2 > 1$ なので $x + 1 > 4$、$x > 3$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\log _{10} 2 = 0.3010$ とするとき、$2^{50}$ は何桁の整数？",
    choices: ["16桁", "50桁", "17桁", "15桁"],
    answer: 1,
    explanation: "$\\log _{10} 2^{50} = 50 \\times 0.3010 = 15.05$。$15 \\leqq 15.05 < 16$ なので 16 桁です。"
  },
  {
    category: "指数・対数",
    question: "不等式 $\\log _{\\frac{1}{2}} x > 1$ の解は？",
    choices: ["$x > 2$", "$x > \\dfrac{1}{2}$", "$0 < x < \\dfrac{1}{2}$", "$x < \\dfrac{1}{2}$"],
    answer: 3,
    explanation: "底 $\\dfrac{1}{2}$ は 1 より小さいので不等号の向きが変わり $x < \\dfrac{1}{2}$。真数条件 $x > 0$ とあわせて $0 < x < \\dfrac{1}{2}$ です。"
  },
  {
    category: "指数・対数",
    question: "$\\sqrt{2}$ と $\\sqrt[3]{3}$ の大小関係は？",
    choices: ["比べられない", "$\\sqrt{2} > \\sqrt[3]{3}$", "$\\sqrt[3]{3} > \\sqrt{2}$", "$\\sqrt{2} = \\sqrt[3]{3}$"],
    answer: 3,
    explanation: "両方を6乗すると $(\\sqrt{2})^{6} = 8$、$(\\sqrt[3]{3})^{6} = 9$。よって $\\sqrt[3]{3}$ の方が大きいです。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} - 3x^{2} + 2$ の導関数 $f'(x)$ は？",
    choices: ["$3x^{2} - 3x$", "$3x^{2} - 6x + 2$", "$x^{2} - 6x$", "$3x^{2} - 6x$"],
    answer: 4,
    explanation: "$(x^{n})' = nx^{n-1}$ で、定数の微分は 0。$f'(x) = 3x^{2} - 6x$ です。"
  },
  {
    category: "微分・積分",
    question: "曲線 $y = x^{2}$ 上の点 $(1, 1)$ における接線の方程式は？",
    choices: ["$y = 2x$", "$y = 2x - 1$", "$y = x$", "$y = 2x + 1$"],
    answer: 2,
    explanation: "$y' = 2x$ より傾きは 2。$y - 1 = 2(x - 1)$ なので $y = 2x - 1$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} - 3x$ の極大値は？",
    choices: ["$1$", "$2$", "$-2$", "$0$"],
    answer: 2,
    explanation: "$f'(x) = 3(x + 1)(x - 1)$。$x = -1$ で極大となり、$f(-1) = -1 + 3 = 2$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} - 6x^{2} + 9x$ の極小値は？",
    choices: ["$-4$", "$3$", "$0$", "$4$"],
    answer: 3,
    explanation: "$f'(x) = 3(x - 1)(x - 3)$。$x = 3$ で極小となり、$f(3) = 27 - 54 + 27 = 0$ です（極大値は $f(1) = 4$）。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{2}$ で、$x$ が 1 から 3 まで変わるときの平均変化率は？",
    choices: ["$4$", "$2$", "$8$", "$6$"],
    answer: 1,
    explanation: "$\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\lim_{h\\to 0} \\dfrac{(2 + h)^{2} - 4}{h}$ の値は？",
    choices: ["$8$", "$0$", "$4$", "$2$"],
    answer: 3,
    explanation: "$\\dfrac{(4 + 4h + h^{2}) - 4}{h} = 4 + h \\to 4$。これは $f(x) = x^{2}$ の $x = 2$ における微分係数です。"
  },
  {
    category: "微分・積分",
    question: "$\\int (3x^{2} - 2x + 1)\\,dx$ を求めると？（$C$ は積分定数）",
    choices: ["$6x - 2 + C$", "$x^{3} - 2x^{2} + x + C$", "$3x^{3} - 2x^{2} + x + C$", "$x^{3} - x^{2} + x + C$"],
    answer: 4,
    explanation: "$\\int x^{n}\\,dx = \\dfrac{x^{n+1}}{n + 1} + C$ より $x^{3} - x^{2} + x + C$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\int_{0}^{2} (x^{2} + 1)\\,dx$ の値は？",
    choices: ["$5$", "$\\dfrac{8}{3}$", "$\\dfrac{10}{3}$", "$\\dfrac{14}{3}$"],
    answer: 4,
    explanation: "$\\left[\\dfrac{x^{3}}{3} + x\\right]_{0}^{2} = \\dfrac{8}{3} + 2 = \\dfrac{14}{3}$ です。"
  },
  {
    category: "微分・積分",
    question: "放物線 $y = x^{2} - 2x$ と $x$軸で囲まれた部分の面積は？",
    choices: ["$\\dfrac{2}{3}$", "$\\dfrac{8}{3}$", "$1$", "$\\dfrac{4}{3}$"],
    answer: 4,
    explanation: "$0 \\leqq x \\leqq 2$ で $x$軸の下にあるので $\\int_{0}^{2} (2x - x^{2})\\,dx = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$ です。"
  },
  {
    category: "微分・積分",
    question: "曲線 $y = x^{2}$ と直線 $y = x$ で囲まれた部分の面積は？",
    choices: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{5}{6}$"],
    answer: 2,
    explanation: "交点は $x = 0, 1$。$\\int_{0}^{1} (x - x^{2})\\,dx = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\int_{-1}^{1} (x^{3} + 3x^{2})\\,dx$ の値は？",
    choices: ["$4$", "$0$", "$1$", "$2$"],
    answer: 4,
    explanation: "$x^{3}$ は奇関数なので $-1$ から 1 までの積分は 0。$\\int_{-1}^{1} 3x^{2}\\,dx = [x^{3}]_{-1}^{1} = 2$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\dfrac{d}{dx} \\int_{1}^{x} (t^{2} + 1)\\,dt$ を求めると？",
    choices: ["$\\dfrac{x^{3}}{3} + x - \\dfrac{4}{3}$", "$\\dfrac{x^{3}}{3} + x$", "$x^{2} + 1$", "$2x$"],
    answer: 3,
    explanation: "$\\dfrac{d}{dx} \\int$ₐ$^{x} f(t)\\,dt = f(x)$ なので $x^{2} + 1$ です。"
  },
  {
    category: "微分・積分",
    question: "3次方程式 $x^{3} - 3x - k = 0$ が異なる3つの実数解をもつ $k$ の範囲は？",
    choices: ["$k < -2$", "$-2 < k < 2$", "$-1 < k < 1$", "$k > 2$"],
    answer: 2,
    explanation: "$y = x^{3} - 3x$（極大値 2、極小値 $-2$）と直線 $y = k$ が3点で交わる条件なので $-2 < k < 2$ です。"
  },
  {
    category: "数列",
    question: "等差数列 $3, 7, 11, \\cdots$ の第20項は？",
    choices: ["$79$", "$80$", "$76$", "$83$"],
    answer: 1,
    explanation: "初項 3、公差 4 なので $a_{20} = 3 + 19 \\times 4 = 79$ です。"
  },
  {
    category: "数列",
    question: "初項 2、公差 3 の等差数列の、初項から第10項までの和は？",
    choices: ["$145$", "$155$", "$290$", "$165$"],
    answer: 2,
    explanation: "$S = \\dfrac{10}{2} \\times \\{2\\cdot 2 + (10 - 1)\\cdot 3\\} = 5 \\times 31 = 155$ です。"
  },
  {
    category: "数列",
    question: "等比数列 $2, 6, 18, \\cdots$ の第6項は？",
    choices: ["$162$", "$243$", "$486$", "$1458$"],
    answer: 3,
    explanation: "初項 2、公比 3 なので $2 \\times 3^{5} = 486$ です。"
  },
  {
    category: "数列",
    question: "初項 1、公比 2 の等比数列の、初項から第10項までの和は？",
    choices: ["$1024$", "$2047$", "$511$", "$1023$"],
    answer: 4,
    explanation: "$S = 1 \\times \\dfrac{2^{10} - 1}{2 - 1} = 1023$ です。"
  },
  {
    category: "数列",
    question: "$\\sum_{k=1}^{10} k$ の値は？",
    choices: ["$55$", "$100$", "$45$", "$110$"],
    answer: 1,
    explanation: "$\\sum k = \\dfrac{n(n + 1)}{2}$ より $10 \\times \\dfrac{11}{2} = 55$ です。"
  },
  {
    category: "数列",
    question: "$\\sum_{k=1}^{n} k^{2}$ を $n$ の式で表すと？",
    choices: ["$\\left\\{\\dfrac{n(n + 1)}{2}\\right\\}^{2}$", "$\\dfrac{n(n + 1)}{2}$", "$\\dfrac{n^{2}(n + 1)}{2}$", "$\\dfrac{n(n + 1)(2n + 1)}{6}$"],
    answer: 4,
    explanation: "平方の和の公式です。$\\left\\{\\dfrac{n(n + 1)}{2}\\right\\}^{2}$ は立方の和 $\\sum k^{3}$ の公式です。"
  },
  {
    category: "数列",
    question: "$\\sum_{k=1}^{4} k^{3}$ の値は？",
    choices: ["$30$", "$64$", "$50$", "$100$"],
    answer: 4,
    explanation: "$1 + 8 + 27 + 64 = 100$。公式 $\\left\\{\\dfrac{n(n + 1)}{2}\\right\\}^{2} = 10^{2} = 100$ とも一致します。"
  },
  {
    category: "数列",
    question: "$\\sum_{k=1}^{n} (2k - 1)$ を $n$ の式で表すと？",
    choices: ["$2n^{2} - 1$", "$n^{2}$", "$n^{2} - n$", "$n(n + 1)$"],
    answer: 2,
    explanation: "$2 \\times \\dfrac{n(n + 1)}{2} - n = n^{2}$。奇数を小さい順に $n$ 個たすと $n^{2}$ になります。"
  },
  {
    category: "数列",
    question: "数列 $1, 2, 4, 7, 11, \\cdots$ の一般項 $a_{n}$ は？",
    choices: ["$\\dfrac{n^{2} + n}{2}$", "$n^{2} - n + 1$", "$2n - 1$", "$\\dfrac{n^{2} - n + 2}{2}$"],
    answer: 4,
    explanation: "階差数列が $1, 2, 3, 4, \\cdots$ なので $a_{n} = 1 + \\sum_{k=1}^{n-1} k = 1 + \\dfrac{n(n - 1)}{2} = \\dfrac{n^{2} - n + 2}{2}$ です。"
  },
  {
    category: "数列",
    question: "$a_{1} = 1$、$a_{n+1} = a_{n} + 3$ で定められる数列の一般項は？",
    choices: ["$a_{n} = 3n$", "$a_{n} = 3n - 2$", "$a_{n} = 3n + 1$", "$a_{n} = n + 3$"],
    answer: 2,
    explanation: "初項 1、公差 3 の等差数列なので $a_{n} = 1 + 3(n - 1) = 3n - 2$ です。"
  },
  {
    category: "数列",
    question: "$a_{1} = 1$、$a_{n+1} = 2a_{n} + 1$ で定められる数列の一般項は？",
    choices: ["$a_{n} = 2n - 1$", "$a_{n} = 2^{n-1}$", "$a_{n} = 2^{n} - 1$", "$a_{n} = 2^{n} + 1$"],
    answer: 3,
    explanation: "$a_{n+1} + 1 = 2(a_{n} + 1)$ と変形できるので、$a_{n} + 1$ は初項 2、公比 2 の等比数列。$a_{n} = 2^{n} - 1$ です。"
  },
  {
    category: "数列",
    question: "$\\sum_{k=1}^{n} \\dfrac{1}{k(k + 1)}$ を $n$ の式で表すと？",
    choices: ["$\\dfrac{1}{n + 1}$", "$\\dfrac{n + 1}{n}$", "$1 - \\dfrac{1}{n}$", "$\\dfrac{n}{n + 1}$"],
    answer: 4,
    explanation: "$\\dfrac{1}{k(k + 1)} = \\dfrac{1}{k} - \\dfrac{1}{k + 1}$ と分けると、途中が消えて $1 - \\dfrac{1}{n + 1} = \\dfrac{n}{n + 1}$ です。"
  },
  {
    category: "数列",
    question: "初項から第 $n$ 項までの和が $S_{n} = n^{2} + 2n$ である数列の一般項は？",
    choices: ["$a_{n} = 2n - 1$", "$a_{n} = 2n + 3$", "$a_{n} = 2n + 1$", "$a_{n} = n^{2} + 2n$"],
    answer: 3,
    explanation: "$n \\geqq 2$ のとき $a_{n} = S_{n} - S_{n-1} = 2n + 1$。$a_{1} = S_{1} = 3$ もこの式を満たします。"
  },
  {
    category: "数列",
    question: "等差数列で $a_{3} = 10$、$a_{7} = 22$ のとき、一般項は？",
    choices: ["$a_{n} = 3n - 1$", "$a_{n} = 3n + 1$", "$a_{n} = 4n - 2$", "$a_{n} = 3n + 4$"],
    answer: 2,
    explanation: "$a_{7} - a_{3} = 4d = 12$ より $d = 3$、$a_{1} = 10 - 2\\cdot 3 = 4$。$a_{n} = 4 + 3(n - 1) = 3n + 1$ です。"
  },
  {
    category: "数列",
    question: "数学的帰納法で、最初に示すことは？",
    choices: ["$n = 1$ のとき成り立つこと", "$n = k$ のとき成り立つこと", "$n = 0$ のとき成り立たないこと", "すべての $n$ で成り立つこと"],
    answer: 1,
    explanation: "①$n = 1$ のとき成り立つ、②$n = k$ で成り立てば $n = k + 1$ でも成り立つ、の2段階で示します。"
  },
  {
    category: "数列",
    question: "3つの正の数 $2, x, 18$ がこの順に等比数列になるとき、$x$ は？",
    choices: ["$10$", "$6$", "$9$", "$8$"],
    answer: 2,
    explanation: "等比中項より $x^{2} = 2 \\times 18 = 36$、$x > 0$ なので $x = 6$ です。10 は等差中項です。"
  },
  {
    category: "数列",
    question: "素振りを1日目に10回、その後は毎日前日より5回ずつ増やす。30日間の合計回数は？",
    choices: ["4650回", "2475回", "2325回", "2550回"],
    answer: 2,
    explanation: "30日目は $10 + 29 \\times 5 = 155$ 回。合計は $30 \\times \\dfrac{10 + 155}{2} = 2475$ 回です。"
  },
  {
    category: "統計的な推測",
    question: "確率変数 $X$ が $1, 2, 3$ をそれぞれ確率 $\\dfrac{1}{2}, \\dfrac{1}{3}, \\dfrac{1}{6}$ でとるとき、期待値 $E(X)$ は？",
    choices: ["$\\dfrac{3}{2}$", "$1$", "$2$", "$\\dfrac{5}{3}$"],
    answer: 4,
    explanation: "$E(X) = 1 \\times \\dfrac{1}{2} + 2 \\times \\dfrac{1}{3} + 3 \\times \\dfrac{1}{6} = \\dfrac{1}{2} + \\dfrac{2}{3} + \\dfrac{1}{2} = \\dfrac{5}{3}$ です。"
  },
  {
    category: "統計的な推測",
    question: "$E(X) = 3$、$V(X) = 4$ のとき、$Y = 2X + 1$ の期待値と分散は？",
    choices: ["$E(Y) = 7, V(Y) = 16$", "$E(Y) = 6, V(Y) = 8$", "$E(Y) = 7, V(Y) = 8$", "$E(Y) = 7, V(Y) = 9$"],
    answer: 1,
    explanation: "$E(aX + b) = aE(X) + b = 7$、$V(aX + b) = a^{2}V(X) = 4 \\times 4 = 16$ です。"
  },
  {
    category: "統計的な推測",
    question: "二項分布 $B\\left(100, \\dfrac{1}{5}\\right)$ に従う確率変数の平均と標準偏差は？",
    choices: ["平均 20、標準偏差 16", "平均 5、標準偏差 4", "平均 20、標準偏差 2", "平均 20、標準偏差 4"],
    answer: 4,
    explanation: "平均 $np = 20$、分散 $np(1 - p) = 100 \\times \\dfrac{1}{5} \\times \\dfrac{4}{5} = 16$ なので標準偏差は 4 です。"
  },
  {
    category: "統計的な推測",
    question: "打率 .300 の打者が 10 打席に立つとき、ヒットの本数の期待値は？（各打席は独立とする）",
    choices: ["0.3本", "7本", "3本", "2.1本"],
    answer: 3,
    explanation: "ヒット数は二項分布 $B(10, 0.3)$ に従うので、期待値は $10 \\times 0.3 = 3$ 本です（2.1 は分散）。"
  },
  {
    category: "統計的な推測",
    question: "正規分布 $N(m, \\sigma ^{2})$ に従う $X$ が $m - \\sigma \\leqq X \\leqq m + \\sigma$ の範囲に入る確率はおよそ？",
    choices: ["約 0.95", "約 0.50", "約 0.68", "約 0.34"],
    answer: 3,
    explanation: "平均 $\\pm 1\\sigma$ の範囲に入る確率は約 $68\\%$（$\\pm 2\\sigma$ なら約 $95\\%$）です。"
  },
  {
    category: "統計的な推測",
    question: "$X$ が正規分布 $N(50, 10^{2})$ に従うとき、$Z = \\dfrac{X - 50}{10}$ が従う分布は？",
    choices: ["$N(5, 1)$", "$N(0, 1)$", "$N(0, 10)$", "$N(50, 1)$"],
    answer: 2,
    explanation: "平均を引いて標準偏差で割る（標準化する）と、標準正規分布 $N(0, 1)$ に従います。"
  },
  {
    category: "統計的な推測",
    question: "母標準偏差 10 の母集団から大きさ 100 の標本をとるとき、標本平均の標準偏差は？",
    choices: ["$100$", "$1$", "$0.1$", "$10$"],
    answer: 2,
    explanation: "標本平均の標準偏差は $\\dfrac{\\sigma }{\\sqrt{n}} = \\dfrac{10}{\\sqrt{100}} = 1$ です。"
  },
  {
    category: "統計的な推測",
    question: "母平均の信頼度 $95\\%$ の信頼区間を求めるときに使う値は？",
    choices: ["$1.64$", "$3.00$", "$1.96$", "$2.58$"],
    answer: 3,
    explanation: "信頼区間は $\\bar{X} \\pm 1.96 \\times \\dfrac{\\sigma }{\\sqrt{n}}$ です（2.58 は信頼度 $99\\%$）。"
  },
  {
    category: "統計的な推測",
    question: "確率密度関数が $f(x) = 2x$（$0 \\leqq x \\leqq 1$）のとき、$P\\left(0 \\leqq X \\leqq \\dfrac{1}{2}\\right)$ は？",
    choices: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{4}$", "$1$"],
    answer: 1,
    explanation: "$\\int_{0}^{\\frac{1}{2}} 2x\\,dx = [x^{2}]_{0}^{\\frac{1}{2}} = \\dfrac{1}{4}$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\vec{a} = (2, 3)$、$\\vec{b} = (-1, 4)$ のとき、$\\vec{a} + 2\\vec{b}$ は？",
    choices: ["$(0, 11)$", "$(0, 5)$", "$(1, 7)$", "$(3, -1)$"],
    answer: 1,
    explanation: "$(2 + 2\\cdot (-1), 3 + 2\\cdot 4) = (0, 11)$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\vec{a} = (3, -4)$ の大きさ $|\\vec{a}|$ は？",
    choices: ["$7$", "$5$", "$1$", "$25$"],
    answer: 2,
    explanation: "$|\\vec{a}| = \\sqrt{3^{2} + (-4)^{2}} = \\sqrt{25} = 5$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\vec{a} = (1, 2)$、$\\vec{b} = (3, -1)$ の内積 $\\vec{a}\\cdot \\vec{b}$ は？",
    choices: ["$1$", "$-1$", "$5$", "$7$"],
    answer: 1,
    explanation: "$1 \\times 3 + 2 \\times (-1) = 1$ です。"
  },
  {
    category: "ベクトル",
    question: "$|\\vec{a}| = 2$、$|\\vec{b}| = 3$、$\\vec{a}\\cdot \\vec{b} = 3$ のとき、$\\vec{a}$ と $\\vec{b}$ のなす角は？",
    choices: ["$30^\\circ$", "$120^\\circ$", "$45^\\circ$", "$60^\\circ$"],
    answer: 4,
    explanation: "$\\cos \\theta = \\dfrac{3}{2 \\times 3} = \\dfrac{1}{2}$ なので $\\theta = 60^\\circ$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\vec{a} = (2, x)$ と $\\vec{b} = (3, 6)$ が平行になる $x$ の値は？",
    choices: ["$1$", "$4$", "$-1$", "$9$"],
    answer: 2,
    explanation: "平行条件 $2 \\times 6 - x \\times 3 = 0$ より $x = 4$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\vec{a} = (2, x)$ と $\\vec{b} = (3, 6)$ が垂直になる $x$ の値は？",
    choices: ["$1$", "$-1$", "$-4$", "$4$"],
    answer: 2,
    explanation: "垂直なら内積が 0。$2 \\times 3 + x \\times 6 = 0$ より $x = -1$ です。"
  },
  {
    category: "ベクトル",
    question: "$\\triangle ABC$ の頂点の位置ベクトルを $\\vec{a}, \\vec{b}, \\vec{c}$ とするとき、重心 $G$ の位置ベクトルは？",
    choices: ["$\\vec{a} + \\vec{b} + \\vec{c}$", "$\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{2}$", "$\\dfrac{\\vec{a} + \\vec{b}}{2} + \\vec{c}$", "$\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}$"],
    answer: 4,
    explanation: "重心は3頂点の位置ベクトルの平均で $\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}$ です。"
  },
  {
    category: "ベクトル",
    question: "2点 $A(\\vec{a})$、$B(\\vec{b})$ を結ぶ線分 $AB$ を 3 : 1 に内分する点の位置ベクトルは？",
    choices: ["$\\dfrac{3\\vec{a} + \\vec{b}}{4}$", "$\\dfrac{-\\vec{a} + 3\\vec{b}}{2}$", "$\\dfrac{\\vec{a} + 3\\vec{b}}{4}$", "$\\dfrac{\\vec{a} + 3\\vec{b}}{3}$"],
    answer: 3,
    explanation: "m : $n$ に内分する点は $\\dfrac{n\\vec{a} + m\\vec{b}}{m + n}$ なので $\\dfrac{\\vec{a} + 3\\vec{b}}{4}$ です。$\\dfrac{-\\vec{a} + 3\\vec{b}}{2}$ は外分点です。"
  },
  {
    category: "ベクトル",
    question: "$|\\vec{a}| = 3$、$|\\vec{b}| = 2$、$\\vec{a}\\cdot \\vec{b} = 1$ のとき、$|\\vec{a} + \\vec{b}|$ は？",
    choices: ["$\\sqrt{11}$", "$\\sqrt{13}$", "$5$", "$\\sqrt{15}$"],
    answer: 4,
    explanation: "$|\\vec{a} + \\vec{b}|^{2} = |\\vec{a}|^{2} + 2\\vec{a}\\cdot \\vec{b} + |\\vec{b}|^{2} = 9 + 2 + 4 = 15$ なので $\\sqrt{15}$ です。"
  },
  {
    category: "ベクトル",
    question: "空間ベクトル $\\vec{a} = (1, 2, 2)$ の大きさは？",
    choices: ["$3$", "$9$", "$5$", "$\\sqrt{5}$"],
    answer: 1,
    explanation: "$\\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$ です。"
  },
  {
    category: "ベクトル",
    question: "空間の2点 $A(1, 0, 2)$、$B(3, 4, -2)$ を結ぶ線分の中点の座標は？",
    choices: ["$(1, 2, -2)$", "$(4, 4, 0)$", "$(2, 2, 0)$", "$(2, 4, 0)$"],
    answer: 3,
    explanation: "各座標の平均をとって $\\left(\\dfrac{1 + 3}{2}, \\dfrac{0 + 4}{2}, \\dfrac{2 - 2}{2}\\right) = (2, 2, 0)$ です。"
  },
  {
    category: "ベクトル",
    question: "空間の2点 $A(1, 2, 3)$、$B(4, 6, 3)$ の間の距離は？",
    choices: ["$5$", "$25$", "$7$", "$\\sqrt{7}$"],
    answer: 1,
    explanation: "$\\sqrt{3^{2} + 4^{2} + 0^{2}} = \\sqrt{25} = 5$ です。"
  },
  {
    category: "複素数平面",
    question: "複素数 $3 + 4i$ の絶対値は？",
    choices: ["$25$", "$\\sqrt{7}$", "$7$", "$5$"],
    answer: 4,
    explanation: "$|3 + 4i| = \\sqrt{3^{2} + 4^{2}} = 5$ です。"
  },
  {
    category: "複素数平面",
    question: "$z = 1 + i$ を極形式で表すと？（偏角は 0 以上 $2\\pi$ 未満）",
    choices: ["$2 \\left(\\cos \\dfrac{\\pi }{4} + i \\sin \\dfrac{\\pi }{4}\\right)$", "$\\cos \\dfrac{\\pi }{4} + i \\sin \\dfrac{\\pi }{4}$", "$\\sqrt{2} \\left(\\cos \\dfrac{\\pi }{2} + i \\sin \\dfrac{\\pi }{2}\\right)$", "$\\sqrt{2} \\left(\\cos \\dfrac{\\pi }{4} + i \\sin \\dfrac{\\pi }{4}\\right)$"],
    answer: 4,
    explanation: "$|z| = \\sqrt{2}$、偏角は $\\dfrac{\\pi }{4}$ なので $\\sqrt{2} \\left(\\cos \\dfrac{\\pi }{4} + i \\sin \\dfrac{\\pi }{4}\\right)$ です。"
  },
  {
    category: "複素数平面",
    question: "$\\left(\\cos \\dfrac{\\pi }{6} + i \\sin \\dfrac{\\pi }{6}\\right)^{6}$ の値は？",
    choices: ["$i$", "$1$", "$-1$", "$-i$"],
    answer: 3,
    explanation: "ド・モアブルの定理より $\\cos \\pi + i \\sin \\pi = -1$ です。"
  },
  {
    category: "複素数平面",
    question: "複素数平面上で、点 $z$ に $i$ をかけた点 $iz$ は、点 $z$ をどう移動した点？",
    choices: ["原点を中心に $-\\dfrac{\\pi }{2}$ 回転した点", "原点を中心に $\\pi$ 回転した点", "実軸に関して対称移動した点", "原点を中心に $\\dfrac{\\pi }{2}$ 回転した点"],
    answer: 4,
    explanation: "$i = \\cos \\dfrac{\\pi }{2} + i \\sin \\dfrac{\\pi }{2}$ なので、$i$ をかけると原点のまわりに $\\dfrac{\\pi }{2}$ 回転します。"
  },
  {
    category: "複素数平面",
    question: "複素数 $z$ とその共役複素数 $\\bar{z}$ について、$z\\cdot \\bar{z}$ に等しいものは？",
    choices: ["$|z|$", "$2 \\times$ ($z$ の実部)", "$0$", "$|z|^{2}$"],
    answer: 4,
    explanation: "$z = a + bi$ なら $z\\cdot \\bar{z} = (a + bi)(a - bi) = a^{2} + b^{2} = |z|^{2}$ です。"
  },
  {
    category: "平面上の曲線",
    question: "楕円 $\\dfrac{x^{2}}{25} + \\dfrac{y^{2}}{9} = 1$ の焦点の座標は？",
    choices: ["$(\\pm \\sqrt{34}, 0)$", "$(\\pm 5, 0)$", "$(0, \\pm 4)$", "$(\\pm 4, 0)$"],
    answer: 4,
    explanation: "$a^{2} = 25$、$b^{2} = 9$ で横長の楕円。$c = \\sqrt{25 - 9} = 4$ なので焦点は $(\\pm 4, 0)$ です。"
  },
  {
    category: "平面上の曲線",
    question: "放物線 $y^{2} = 8x$ の焦点の座標は？",
    choices: ["$(0, 2)$", "$(8, 0)$", "$(2, 0)$", "$(4, 0)$"],
    answer: 3,
    explanation: "$y^{2} = 4px$ と比べて $p = 2$。焦点は $(2, 0)$、準線は $x = -2$ です。"
  },
  {
    category: "平面上の曲線",
    question: "双曲線 $\\dfrac{x^{2}}{9} - \\dfrac{y^{2}}{16} = 1$ の漸近線は？",
    choices: ["$y = \\pm x$", "$y = \\pm \\left(\\dfrac{3}{4}\\right)x$", "$y = \\pm \\left(\\dfrac{16}{9}\\right)x$", "$y = \\pm \\left(\\dfrac{4}{3}\\right)x$"],
    answer: 4,
    explanation: "$\\dfrac{x^{2}}{a^{2}} - \\dfrac{y^{2}}{b^{2}} = 1$ の漸近線は $y = \\pm \\left(\\dfrac{b}{a}\\right)x$ なので $y = \\pm \\left(\\dfrac{4}{3}\\right)x$ です。"
  },
  {
    category: "平面上の曲線",
    question: "極座標で $\\left(2, \\dfrac{\\pi }{3}\\right)$ と表される点を直交座標で表すと？",
    choices: ["$(1, 2)$", "$(1, \\sqrt{3})$", "$(\\sqrt{3}, 1)$", "$(2, \\sqrt{3})$"],
    answer: 2,
    explanation: "$x = 2 \\cos \\left(\\dfrac{\\pi }{3}\\right) = 1$、$y = 2 \\sin \\left(\\dfrac{\\pi }{3}\\right) = \\sqrt{3}$ です。"
  },
  // ---- 追加：空間ベクトル 20問・微分・積分 20問 ----
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, -2, 2)$、$\\vec{b} = (3, 0, -1)$ のとき、$\\vec{a} + \\vec{b}$ は？",
    choices: ["$(2, 2, -3)$", "$(4, -2, 1)$", "$(3, 0, -2)$", "$(4, -2, 3)$"],
    answer: 2,
    explanation: "成分ごとにたして $(1 + 3, -2 + 0, 2 - 1) = (4, -2, 1)$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, -2, 2)$、$\\vec{b} = (3, 0, -1)$ のとき、$2\\vec{a} - \\vec{b}$ は？",
    choices: ["$(1, 4, -5)$", "$(5, -4, 3)$", "$(-1, -4, 3)$", "$(-1, -4, 5)$"],
    answer: 4,
    explanation: "$2\\vec{a} = (2, -4, 4)$ から $\\vec{b}$ を引いて $(2 - 3, -4 - 0, 4 + 1) = (-1, -4, 5)$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, -2, 2)$、$\\vec{b} = (3, 0, -1)$ の内積 $\\vec{a}\\cdot \\vec{b}$ は？",
    choices: ["$3$", "$5$", "$1$", "$-1$"],
    answer: 3,
    explanation: "$1 \\times 3 + (-2) \\times 0 + 2 \\times (-1) = 3 + 0 - 2 = 1$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{b} = (3, 0, -1)$ の大きさ $|\\vec{b}|$ は？",
    choices: ["$\\sqrt{8}$", "$4$", "$10$", "$\\sqrt{10}$"],
    answer: 4,
    explanation: "$|\\vec{b}| = \\sqrt{3^{2} + 0^{2} + (-1)^{2}} = \\sqrt{10}$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, 1, 0)$、$\\vec{b} = (1, 0, 1)$ のなす角は？",
    choices: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    answer: 3,
    explanation: "$\\vec{a}\\cdot \\vec{b} = 1$、$|\\vec{a}| = |\\vec{b}| = \\sqrt{2}$ なので $\\cos \\theta = \\dfrac{1}{2}$。$\\theta = 60^\\circ$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (2, -1, 3)$ と $\\vec{b} = (x, 4, 2)$ が垂直になる $x$ の値は？",
    choices: ["$5$", "$-1$", "$1$", "$-5$"],
    answer: 2,
    explanation: "垂直なら内積が 0。$2x - 4 + 6 = 0$ より $x = -1$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, 2, -1)$ と $\\vec{b} = (2, x, y)$ が平行になる $x, y$ の値は？",
    choices: ["$x = 4, y = 2$", "$x = 1, y = -\\dfrac{1}{2}$", "$x = -4, y = 2$", "$x = 4, y = -2$"],
    answer: 4,
    explanation: "$\\vec{b} = k\\vec{a}$ とおくと、$x$成分から $k = 2$。よって $x = 2 \\times 2 = 4$、$y = 2 \\times (-1) = -2$ です。"
  },
  {
    category: "空間ベクトル",
    question: "2点 $A(1, 2, 3)$、$B(3, -2, 7)$ について、$|\\overrightarrow{AB}|$ は？",
    choices: ["$36$", "$6$", "$4$", "$2\\sqrt{6}$"],
    answer: 2,
    explanation: "$\\overrightarrow{AB} = (2, -4, 4)$ なので $|\\overrightarrow{AB}| = \\sqrt{4 + 16 + 16} = \\sqrt{36} = 6$ です。"
  },
  {
    category: "空間ベクトル",
    question: "2点 $A(2, 0, 4)$、$B(6, 4, 0)$ を結ぶ線分 $AB$ を 1 : 3 に内分する点の座標は？",
    choices: ["$(3, 1, 3)$", "$(4, 2, 2)$", "$(0, -2, 6)$", "$(5, 3, 1)$"],
    answer: 1,
    explanation: "$\\dfrac{3A + 1B}{4} = \\left(\\dfrac{6 + 6}{4}, \\dfrac{0 + 4}{4}, \\dfrac{12 + 0}{4}\\right) = (3, 1, 3)$ です。$(0, -2, 6)$ は 1 : 3 に外分する点です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 $A(1, 0, 0)$、$B(0, 2, 0)$、$C(0, 0, 3)$ を頂点とする $\\triangle ABC$ の重心の座標は？",
    choices: ["$(1, 2, 3)$", "$\\left(\\dfrac{1}{3}, \\dfrac{1}{3}, \\dfrac{1}{3}\\right)$", "$\\left(\\dfrac{1}{2}, 1, \\dfrac{3}{2}\\right)$", "$\\left(\\dfrac{1}{3}, \\dfrac{2}{3}, 1\\right)$"],
    answer: 4,
    explanation: "3頂点の座標の平均をとって $\\left(\\dfrac{1 + 0 + 0}{3}, \\dfrac{0 + 2 + 0}{3}, \\dfrac{0 + 0 + 3}{3}\\right) = \\left(\\dfrac{1}{3}, \\dfrac{2}{3}, 1\\right)$ です。"
  },
  {
    category: "空間ベクトル",
    question: "点 $(2, -3, 5)$ と $xy$平面に関して対称な点の座標は？",
    choices: ["$(2, -3, -5)$", "$(2, 3, 5)$", "$(-2, 3, -5)$", "$(-2, 3, 5)$"],
    answer: 1,
    explanation: "$xy$平面に関して対称移動すると、$z$座標だけ符号が変わります。"
  },
  {
    category: "空間ベクトル",
    question: "点 $P(1, 2, 3)$ と $yz$平面との距離は？",
    choices: ["$3$", "$\\sqrt{14}$", "$1$", "$2$"],
    answer: 3,
    explanation: "$yz$平面は $x = 0$ の平面なので、距離は $x$座標の絶対値 1 です。"
  },
  {
    category: "空間ベクトル",
    question: "中心 $(1, -2, 3)$、半径 4 の球面の方程式は？",
    choices: ["$(x - 1)^{2} + (y + 2)^{2} + (z - 3)^{2} = 8$", "$(x - 1)^{2} + (y + 2)^{2} + (z - 3)^{2} = 4$", "$(x + 1)^{2} + (y - 2)^{2} + (z + 3)^{2} = 16$", "$(x - 1)^{2} + (y + 2)^{2} + (z - 3)^{2} = 16$"],
    answer: 4,
    explanation: "中心 $(a, b, c)$、半径 $r$ の球面は $(x - a)^{2} + (y - b)^{2} + (z - c)^{2} = r^{2}$ です。"
  },
  {
    category: "空間ベクトル",
    question: "球面 $x^{2} + y^{2} + z^{2} - 2x + 4y - 6z = 0$ の中心と半径は？",
    choices: ["中心 $(1, -2, 3)$、半径 $\\sqrt{14}$", "中心 $(1, -2, 3)$、半径 2", "中心 $(1, -2, 3)$、半径 14", "中心 $(-1, 2, -3)$、半径 $\\sqrt{14}$"],
    answer: 1,
    explanation: "平方完成すると $(x - 1)^{2} + (y + 2)^{2} + (z - 3)^{2} = 1 + 4 + 9 = 14$ なので、中心 $(1, -2, 3)$、半径 $\\sqrt{14}$ です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 $A(1, 0, 0)$、$B(0, 1, 0)$、$C(0, 0, 1)$ を頂点とする $\\triangle ABC$ の面積は？",
    choices: ["$\\dfrac{1}{2}$", "$\\sqrt{2}$", "$\\sqrt{3}$", "$\\dfrac{\\sqrt{3}}{2}$"],
    answer: 4,
    explanation: "$\\overrightarrow{AB} = (-1, 1, 0)$、$\\overrightarrow{AC} = (-1, 0, 1)$ より $S = \\left(\\dfrac{1}{2}\\right)\\sqrt{|\\overrightarrow{AB}|^{2}|\\overrightarrow{AC}|^{2} - (\\overrightarrow{AB}\\cdot \\overrightarrow{AC})^{2}} = \\left(\\dfrac{1}{2}\\right)\\sqrt{4 - 1} = \\dfrac{\\sqrt{3}}{2}$ です。1辺 $\\sqrt{2}$ の正三角形と考えても同じです。"
  },
  {
    category: "空間ベクトル",
    question: "$\\vec{a} = (1, 0, 1)$、$\\vec{b} = (0, 1, 1)$ の両方に垂直な単位ベクトルは？",
    choices: ["$\\pm \\left(\\dfrac{1}{\\sqrt{3}}\\right)(1, 1, 1)$", "$(1, 1, -1)$", "$\\pm \\left(\\dfrac{1}{\\sqrt{3}}\\right)(1, 1, -1)$", "$\\pm \\left(\\dfrac{1}{\\sqrt{2}}\\right)(1, -1, 0)$"],
    answer: 3,
    explanation: "求めるベクトルを $(x, y, z)$ とすると $x + z = 0$、$y + z = 0$。$(1, 1, -1)$ の向きで、大きさを 1 にすると $\\pm \\left(\\dfrac{1}{\\sqrt{3}}\\right)(1, 1, -1)$ です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 $A(1, 2, 3)$、$B(2, 4, 5)$、$C(x, 8, y)$ が一直線上にあるとき、$x, y$ の値は？",
    choices: ["$x = 4, y = 6$", "$x = 3, y = 9$", "$x = 3, y = 6$", "$x = 4, y = 9$"],
    answer: 4,
    explanation: "$\\overrightarrow{AC} = k\\overrightarrow{AB}$ となる。$\\overrightarrow{AB} = (1, 2, 2)$、$\\overrightarrow{AC} = (x - 1, 6, y - 3)$ の $y$成分から $k = 3$。$x - 1 = 3$、$y - 3 = 6$ より $x = 4$、$y = 9$ です。"
  },
  {
    category: "空間ベクトル",
    question: "$|\\vec{a}| = 2$、$|\\vec{b}| = 3$、$|\\vec{a} - \\vec{b}| = \\sqrt{7}$ のとき、内積 $\\vec{a}\\cdot \\vec{b}$ は？",
    choices: ["$3$", "$6$", "$-3$", "$\\dfrac{3}{2}$"],
    answer: 1,
    explanation: "$|\\vec{a} - \\vec{b}|^{2} = |\\vec{a}|^{2} - 2\\vec{a}\\cdot \\vec{b} + |\\vec{b}|^{2}$ より $7 = 4 - 2\\vec{a}\\cdot \\vec{b} + 9$。よって $\\vec{a}\\cdot \\vec{b} = 3$ です。"
  },
  {
    category: "空間ベクトル",
    question: "四面体 $OABC$ で $\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$、$\\overrightarrow{OC} = \\vec{c}$ とする。辺 $AB$ の中点を $M$、辺 $OC$ の中点を $N$ とするとき、$\\overrightarrow{MN}$ は？",
    choices: ["$\\dfrac{-\\vec{a} + \\vec{b} + \\vec{c}}{2}$", "$\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{2}$", "$\\dfrac{\\vec{a} + \\vec{b} - \\vec{c}}{2}$", "$\\dfrac{-\\vec{a} - \\vec{b} + \\vec{c}}{2}$"],
    answer: 4,
    explanation: "$\\overrightarrow{MN} = \\overrightarrow{ON} - \\overrightarrow{OM} = \\dfrac{\\vec{c}}{2} - \\dfrac{\\vec{a} + \\vec{b}}{2} = \\dfrac{-\\vec{a} - \\vec{b} + \\vec{c}}{2}$ です。"
  },
  {
    category: "空間ベクトル",
    question: "原点 $O$ と $A(1, 2, 2)$ を通る直線に、点 $B(2, 1, 4)$ から垂線を下ろす。垂線の足 $H$ の座標は？",
    choices: ["$(1, 2, 2)$", "$(2, 4, 4)$", "$\\left(\\dfrac{2}{3}, \\dfrac{4}{3}, \\dfrac{4}{3}\\right)$", "$\\left(\\dfrac{4}{3}, \\dfrac{8}{3}, \\dfrac{8}{3}\\right)$"],
    answer: 4,
    explanation: "$\\overrightarrow{OH} = t \\overrightarrow{OA}$ とおき、$\\overrightarrow{BH}\\cdot \\overrightarrow{OA} = 0$ から $9t - 12 = 0$、$t = \\dfrac{4}{3}$。$H\\left(\\dfrac{4}{3}, \\dfrac{8}{3}, \\dfrac{8}{3}\\right)$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = (2x - 1)(x + 3)$ の導関数 $f'(x)$ は？",
    choices: ["$4x + 5$", "$4x + 3$", "$2x + 5$", "$4x - 5$"],
    answer: 1,
    explanation: "展開すると $f(x) = 2x^{2} + 5x - 3$ なので $f'(x) = 4x + 5$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = 2x^{3} - x^{2} + 4$ のとき、$f'(2)$ の値は？",
    choices: ["$16$", "$20$", "$24$", "$12$"],
    answer: 2,
    explanation: "$f'(x) = 6x^{2} - 2x$ なので $f'(2) = 24 - 4 = 20$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\lim_{h\\to 0} \\dfrac{f(a + h) - f(a)}{h}$ は何を表す？",
    choices: ["$f'(a + h)$", "$f'(a)$", "$f(a)$", "$0$"],
    answer: 2,
    explanation: "$x = a$ における微分係数 $f'(a)$ の定義です。グラフ上では $x = a$ での接線の傾きを表します。"
  },
  {
    category: "微分・積分",
    question: "曲線 $y = x^{3} - 2x$ 上の点 $(1, -1)$ における接線の方程式は？",
    choices: ["$y = 3x - 4$", "$y = x$", "$y = x - 2$", "$y = -x$"],
    answer: 3,
    explanation: "$y' = 3x^{2} - 2$ より、$x = 1$ での傾きは 1。$y + 1 = 1\\cdot (x - 1)$ なので $y = x - 2$ です。"
  },
  {
    category: "微分・積分",
    question: "点 $(1, -3)$ から放物線 $y = x^{2}$ に引いた接線の、接点の $x$座標は？",
    choices: ["$x = 3, 1$", "$x = 1, -3$", "$x = -3, 1$", "$x = 3, -1$"],
    answer: 4,
    explanation: "接点を $(t, t^{2})$ とすると接線は $y = 2tx - t^{2}$。$(1, -3)$ を通るので $-3 = 2t - t^{2}$、$t^{2} - 2t - 3 = 0$ より $t = 3, -1$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} - 3x^{2}$ が減少する $x$ の範囲は？",
    choices: ["$0 < x < 2$", "$0 < x < 3$", "$-2 < x < 0$", "$x < 0, 2 < x$"],
    answer: 1,
    explanation: "$f'(x) = 3x^{2} - 6x = 3x(x - 2) < 0$ となるのは $0 < x < 2$ です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = -x^{3} + 3x + 1$ の極小値は？",
    choices: ["$1$", "$-1$", "$-3$", "$3$"],
    answer: 2,
    explanation: "$f'(x) = -3(x + 1)(x - 1)$。$x = -1$ で極小となり $f(-1) = 1 - 3 + 1 = -1$ です（$x = 1$ で極大値 3）。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} + ax + 2$ が $x = 1$ で極値をとるとき、$a$ の値は？",
    choices: ["$-3$", "$3$", "$-1$", "$1$"],
    answer: 1,
    explanation: "$f'(x) = 3x^{2} + a$。$f'(1) = 3 + a = 0$ より $a = -3$。このとき $f'(x) = 3(x + 1)(x - 1)$ で、$x = 1$ の前後で符号が変わるので確かに極値をとります。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} - 3x + k$ の極大値が 5 となるとき、$k$ の値は？",
    choices: ["$3$", "$1$", "$5$", "$7$"],
    answer: 1,
    explanation: "$f'(x) = 3(x + 1)(x - 1)$。$x = -1$ で極大となり $f(-1) = 2 + k = 5$、よって $k = 3$ です。"
  },
  {
    category: "微分・積分",
    question: "$0 \\leqq x \\leqq 3$ における $f(x) = x^{3} - 3x^{2} + 1$ の最大値は？",
    choices: ["$1$", "$-3$", "$3$", "$0$"],
    answer: 1,
    explanation: "$f'(x) = 3x(x - 2)$。$f(0) = 1$、$f(2) = -3$（極小）、$f(3) = 1$ なので、最大値は 1（$x = 0, 3$ のとき）です。"
  },
  {
    category: "微分・積分",
    question: "$f(x) = x^{3} + ax^{2} + 3x$ が極値をもつような $a$ の範囲は？",
    choices: ["$a < -3, 3 < a$", "$-3 < a < 3$", "$a \\leqq -3, 3 \\leqq a$", "$a > 3$"],
    answer: 1,
    explanation: "$f'(x) = 3x^{2} + 2ax + 3 = 0$ が異なる2つの実数解をもてばよい。$\\dfrac{D}{4} = a^{2} - 9 > 0$ より $a < -3, 3 < a$ です。"
  },
  {
    category: "微分・積分",
    question: "真上に投げたボールの $t$ 秒後の高さが $h = 20t - 5t^{2}$（m）のとき、最高点の高さは？",
    choices: ["15 m", "20 m", "40 m", "10 m"],
    answer: 2,
    explanation: "$h' = 20 - 10t = 0$ となる $t = 2$ で最高点。$h = 40 - 20 = 20 m$ です。"
  },
  {
    category: "微分・積分",
    question: "真上に投げたボールの $t$ 秒後の高さが $h = 20t - 5t^{2}$（m）のとき、1 秒後の瞬間の速さは？",
    choices: ["10 m/秒", "20 m/秒", "5 m/秒", "15 m/秒"],
    answer: 1,
    explanation: "速さは $h$ を $t$ で微分した $h' = 20 - 10t$。$t = 1$ を代入して 10 m/秒です。"
  },
  {
    category: "微分・積分",
    question: "方程式 $x^{3} - 3x + 1 = 0$ の異なる実数解の個数は？",
    choices: ["1個", "0個", "3個", "2個"],
    answer: 3,
    explanation: "$f(x) = x^{3} - 3x + 1$ の極大値 $f(-1) = 3 > 0$、極小値 $f(1) = -1 < 0$ なので、グラフは $x$軸と3点で交わります。"
  },
  {
    category: "微分・積分",
    question: "$\\int (x - 1)^{2}\\,dx$ を求めると？（$C$ は積分定数）",
    choices: ["$\\dfrac{x^{3}}{3} - x^{2} + x + C$", "$2(x - 1) + C$", "$\\dfrac{x^{3}}{3} - x + C$", "$x^{3} - 2x^{2} + x + C$"],
    answer: 1,
    explanation: "$(x - 1)^{2} = x^{2} - 2x + 1$ を積分して $\\dfrac{x^{3}}{3} - x^{2} + x + C$ です。"
  },
  {
    category: "微分・積分",
    question: "$F'(x) = 3x^{2} - 4x$、$F(1) = 2$ を満たす関数 $F(x)$ は？",
    choices: ["$F(x) = x^{3} - 2x^{2} + 2$", "$F(x) = x^{3} - 2x^{2} + 3$", "$F(x) = 6x - 4$", "$F(x) = x^{3} - 2x^{2} + 1$"],
    answer: 2,
    explanation: "$F(x) = x^{3} - 2x^{2} + C$。$F(1) = -1 + C = 2$ より $C = 3$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\int_{1}^{3} (2x - 1)\\,dx$ の値は？",
    choices: ["$4$", "$8$", "$10$", "$6$"],
    answer: 4,
    explanation: "$[x^{2} - x]_{1}^{3} = (9 - 3) - (1 - 1) = 6$ です。"
  },
  {
    category: "微分・積分",
    question: "$\\int_{-2}^{2} (x^{3} - 4x + 3)\\,dx$ の値は？",
    choices: ["$6$", "$24$", "$12$", "$0$"],
    answer: 3,
    explanation: "$x^{3}$ と $-4x$ は奇関数なので $-2$ から 2 までの積分は 0。残りは $\\int_{-2}^{2} 3\\,dx = 3 \\times 4 = 12$ です。"
  },
  {
    category: "微分・積分",
    question: "放物線 $y = -x^{2} + 4$ と $x$軸で囲まれた部分の面積は？",
    choices: ["$8$", "$\\dfrac{16}{3}$", "$\\dfrac{64}{3}$", "$\\dfrac{32}{3}$"],
    answer: 4,
    explanation: "交点は $x = \\pm 2$。$\\int_{-2}^{2} (4 - x^{2})\\,dx = 16 - \\dfrac{16}{3} = \\dfrac{32}{3}$ です。"
  },
  {
    category: "微分・積分",
    question: "放物線 $y = x^{2} - 1$ と直線 $y = x + 1$ で囲まれた部分の面積は？",
    choices: ["$3$", "$\\dfrac{9}{2}$", "$9$", "$\\dfrac{27}{2}$"],
    answer: 2,
    explanation: "交点は $x^{2} - x - 2 = 0$ より $x = -1, 2$。$\\int_{-1}^{2} \\{(x + 1) - (x^{2} - 1)\\}\\,dx = \\dfrac{(2 - (-1))^{3}}{6} = \\dfrac{9}{2}$ です。"
  }
];
