// =============================================================
//  問題データ
//  問題を追加するときは、下の { ... } をコピーして書き換えてください。
//
//  category : 単元名（絞り込みボタンに使われます）
//  question : 問題文（改行は \n）
//  choices  : 選択肢を4つ
//  answer   : 正解の選択肢の番号（1〜4）
//  explanation : 解説
//
//  数式の記号は ² ³ √ π ≦ ≧ − × ÷ ° θ などをそのまま使えます。
// =============================================================
const QUESTIONS = [
  {
    category: "2次関数",
    question: "松井「y = x² − 4x + 3 のグラフを x軸方向に 1 だけ平行移動したよ」\n由伸「移動後のグラフの式は？」",
    choices: ["y = x² − 2x", "y = x² − 4x + 4", "y = x² − 6x + 8", "y = x² − 6x + 10"],
    answer: 3,
    explanation: "もとの式は y = (x − 2)² − 1 で、頂点は (2, −1) です。x軸方向に 1 動かすと頂点は (3, −1) になるので、y = (x − 3)² − 1 = x² − 6x + 8 です。"
  },
  {
    category: "2次関数",
    question: "f(x) = (x − a)² + 1 の 0 ≦ x ≦ 2 における最小値が 1 となる a の条件は？",
    choices: ["a ≦ 0", "0 ≦ a ≦ 2", "a ≧ 2", "すべての実数 a"],
    answer: 2,
    explanation: "最小値が 1 になるのは、頂点の x座標 a が区間 0 ≦ x ≦ 2 に入っているときです。a が区間の外にあると、最小値は端点での値になり、1 より大きくなります。"
  },
  {
    category: "三角比",
    question: "△ABC の外接円の半径が 3、A = 30° のとき、a の値は？",
    choices: ["3/2", "√3", "3", "3√3"],
    answer: 3,
    explanation: "正弦定理より a / sin A = 2R なので、a = 2 × 3 × sin 30° = 6 × 1/2 = 3 です。"
  },
  {
    category: "2次関数",
    question: "y = 2x² − 8x + 5 の頂点の座標は？",
    choices: ["(2, −3)", "(−2, 29)", "(4, 5)", "(2, 5)"],
    answer: 1,
    explanation: "y = 2(x² − 4x) + 5 = 2(x − 2)² − 8 + 5 = 2(x − 2)² − 3 より、頂点は (2, −3) です。"
  },
  {
    category: "2次関数",
    question: "2次方程式 x² + 4x + k = 0 が異なる2つの実数解をもつ k の範囲は？",
    choices: ["k > 4", "k < 4", "k ≦ 4", "k < −4"],
    answer: 2,
    explanation: "判別式 D/4 = 2² − k = 4 − k > 0 より k < 4 です。"
  },
  {
    category: "三角比",
    question: "sin θ = 3/5（0° < θ < 90°）のとき、cos θ の値は？",
    choices: ["4/5", "3/4", "−4/5", "5/4"],
    answer: 1,
    explanation: "sin²θ + cos²θ = 1 より cos²θ = 1 − 9/25 = 16/25。0° < θ < 90° なので cos θ > 0、よって cos θ = 4/5 です。"
  },
  {
    category: "三角比",
    question: "△ABC で b = 3、c = 5、A = 120° のとき、a の値は？",
    choices: ["√19", "7", "√34", "8"],
    answer: 2,
    explanation: "余弦定理より a² = 3² + 5² − 2·3·5·cos120° = 9 + 25 + 15 = 49。よって a = 7 です。"
  },
  {
    category: "数と式",
    question: "(x + 2)(x − 5) を展開すると？",
    choices: ["x² − 3x − 10", "x² + 3x − 10", "x² − 7x − 10", "x² − 3x + 10"],
    answer: 1,
    explanation: "x² + (2 − 5)x + 2 × (−5) = x² − 3x − 10 です。"
  },
  {
    category: "数と式",
    question: "1 / (√3 − 1) の分母を有理化すると？",
    choices: ["√3 + 1", "(√3 + 1)/2", "(√3 − 1)/2", "√3 − 1"],
    answer: 2,
    explanation: "分母・分子に (√3 + 1) をかけると、(√3 + 1) / (3 − 1) = (√3 + 1)/2 です。"
  },
  {
    category: "場合の数",
    question: "野球のスタメン9人の打順の決め方は全部で何通り？（9人全員を1〜9番に並べる）",
    choices: ["81通り", "362880通り", "40320通り", "9通り"],
    answer: 2,
    explanation: "9人を一列に並べる順列なので 9! = 362880 通りです。"
  },
  {
    category: "場合の数",
    question: "投手5人の中から先発2人を選ぶ方法は何通り？（順番は区別しない）",
    choices: ["10通り", "20通り", "25通り", "5通り"],
    answer: 1,
    explanation: "組合せ ₅C₂ = (5 × 4)/(2 × 1) = 10 通りです。"
  },
  {
    category: "確率",
    question: "打率 .300 の打者が 2打席連続でヒットを打つ確率は？（各打席は独立とする）",
    choices: ["0.6", "0.3", "0.09", "0.51"],
    answer: 3,
    explanation: "独立な試行なので 0.3 × 0.3 = 0.09 です。"
  },
  {
    category: "数と式",
    question: "(a + b)³ を展開したとき、a²b の係数は？",
    choices: ["1", "2", "3", "6"],
    answer: 3,
    explanation: "(a + b)³ = a³ + 3a²b + 3ab² + b³ なので、a²b の係数は 3 です。"
  },
  {
    category: "数と式",
    question: "x² − 5x + 6 を因数分解すると？",
    choices: ["(x − 2)(x − 3)", "(x + 2)(x + 3)", "(x − 1)(x − 6)", "(x + 1)(x − 6)"],
    answer: 1,
    explanation: "かけて 6、たして −5 になる2数は −2 と −3 なので、(x − 2)(x − 3) です。"
  },
  {
    category: "数と式",
    question: "不等式 |x − 3| < 2 の解は？",
    choices: ["x < 1, 5 < x", "1 < x < 5", "−1 < x < 5", "−5 < x < 1"],
    answer: 2,
    explanation: "|x − 3| < 2 は −2 < x − 3 < 2 と同じなので、1 < x < 5 です。"
  },
  {
    category: "数と式",
    question: "√12 + √27 を簡単にすると？",
    choices: ["√39", "5√3", "6√3", "13√3"],
    answer: 2,
    explanation: "√12 = 2√3、√27 = 3√3 なので、2√3 + 3√3 = 5√3 です。"
  },
  {
    category: "数と式",
    question: "不等式 2x − 3 > 5x + 6 の解は？",
    choices: ["x < 3", "x > −3", "x < −3", "x > 3"],
    answer: 3,
    explanation: "−3x > 9 となり、両辺を −3 で割ると不等号の向きが変わって x < −3 です。"
  },
  {
    category: "数と式",
    question: "x = 1/(√2 − 1) のとき、x の整数部分は？",
    choices: ["1", "2", "3", "4"],
    answer: 2,
    explanation: "有理化すると x = √2 + 1。√2 = 1.414… なので x = 2.414…、整数部分は 2 です。"
  },
  {
    category: "数と式",
    question: "x + y = 5、xy = 3 のとき、x² + y² の値は？",
    choices: ["22", "31", "19", "25"],
    answer: 3,
    explanation: "x² + y² = (x + y)² − 2xy = 25 − 6 = 19 です。"
  },
  {
    category: "数と式",
    question: "x² − y² + 2y − 1 を因数分解すると？",
    choices: ["(x + y − 1)(x − y + 1)", "(x + y + 1)(x − y − 1)", "(x − y + 1)²", "(x + y − 1)(x + y + 1)"],
    answer: 1,
    explanation: "x² − (y² − 2y + 1) = x² − (y − 1)² = (x + y − 1)(x − y + 1) です。"
  },
  {
    category: "集合と論理",
    question: "x = 2 は、x² = 4 であるための何条件？",
    choices: ["必要条件であるが十分条件でない", "十分条件であるが必要条件でない", "必要十分条件", "必要条件でも十分条件でもない"],
    answer: 2,
    explanation: "x = 2 ⇒ x² = 4 は真ですが、x² = 4 ⇒ x = 2 は偽（x = −2 が反例）です。よって十分条件であるが必要条件ではありません。"
  },
  {
    category: "集合と論理",
    question: "命題「x > 2 ならば x > 1」の対偶は？",
    choices: ["x > 1 ならば x > 2", "x ≦ 2 ならば x ≦ 1", "x ≦ 1 ならば x ≦ 2", "x > 2 ならば x ≦ 1"],
    answer: 3,
    explanation: "「p ならば q」の対偶は「q でないならば p でない」なので、「x ≦ 1 ならば x ≦ 2」です。"
  },
  {
    category: "集合と論理",
    question: "1 から 10 までの整数のうち、2 の倍数または 3 の倍数であるものは何個？",
    choices: ["6個", "7個", "8個", "9個"],
    answer: 2,
    explanation: "2の倍数 5個、3の倍数 3個、6の倍数 1個なので、5 + 3 − 1 = 7個です。"
  },
  {
    category: "集合と論理",
    question: "「すべての実数 x について x² ≧ 0」の否定は？",
    choices: ["すべての実数 x について x² < 0", "ある実数 x について x² ≧ 0", "すべての実数 x について x² ≦ 0", "ある実数 x について x² < 0"],
    answer: 4,
    explanation: "「すべての x について p」の否定は「ある x について p でない」です。"
  },
  {
    category: "2次関数",
    question: "y = −x² + 6x − 5 の最大値は？",
    choices: ["−5", "3", "4", "9"],
    answer: 3,
    explanation: "y = −(x − 3)² + 4 なので、x = 3 のとき最大値 4 をとります。"
  },
  {
    category: "2次関数",
    question: "y = x² のグラフを x軸方向に 2、y軸方向に −3 だけ平行移動した式は？",
    choices: ["y = x² − 4x + 1", "y = x² + 4x + 1", "y = x² − 4x + 7", "y = x² + 4x − 3"],
    answer: 1,
    explanation: "y = (x − 2)² − 3 = x² − 4x + 1 です。"
  },
  {
    category: "2次関数",
    question: "2次不等式 x² − x − 6 < 0 の解は？",
    choices: ["x < −2, 3 < x", "−3 < x < 2", "−2 < x < 3", "x < −3, 2 < x"],
    answer: 3,
    explanation: "(x − 3)(x + 2) < 0 なので、−2 < x < 3 です。"
  },
  {
    category: "2次関数",
    question: "y = x² − 2x + k のグラフが x軸に接するときの k の値は？",
    choices: ["1", "−1", "2", "0"],
    answer: 1,
    explanation: "判別式 D/4 = 1 − k = 0 より k = 1 です。"
  },
  {
    category: "2次関数",
    question: "放物線 y = 2x² − 4x + 3 の軸は？",
    choices: ["x = −1", "x = 1", "x = 2", "x = 4"],
    answer: 2,
    explanation: "y = 2(x − 1)² + 1 なので、軸は x = 1 です。"
  },
  {
    category: "2次関数",
    question: "0 ≦ x ≦ 3 における y = x² − 2x の最大値は？",
    choices: ["0", "3", "−1", "9"],
    answer: 2,
    explanation: "頂点は (1, −1)。区間の端では x = 0 で 0、x = 3 で 3。軸から遠い x = 3 で最大値 3 です。"
  },
  {
    category: "2次関数",
    question: "2次方程式 2x² + 3x − 2 = 0 の解は？",
    choices: ["x = −1/2, 2", "x = 1, −2", "x = 2, −1", "x = 1/2, −2"],
    answer: 4,
    explanation: "(2x − 1)(x + 2) = 0 なので、x = 1/2, −2 です。"
  },
  {
    category: "2次関数",
    question: "頂点が (1, 2) で、点 (2, 5) を通る放物線の式は？",
    choices: ["y = 3x² − 6x + 5", "y = 3x² + 6x + 5", "y = x² − 2x + 3", "y = 3x² − 6x + 2"],
    answer: 1,
    explanation: "y = a(x − 1)² + 2 に (2, 5) を代入して a = 3。y = 3(x − 1)² + 2 = 3x² − 6x + 5 です。"
  },
  {
    category: "三角比",
    question: "sin 135° の値は？",
    choices: ["−1/√2", "1/√2", "−√3/2", "1/2"],
    answer: 2,
    explanation: "sin 135° = sin(180° − 45°) = sin 45° = 1/√2 です。"
  },
  {
    category: "三角比",
    question: "cos 150° の値は？",
    choices: ["√3/2", "−1/2", "−√3/2", "1/2"],
    answer: 3,
    explanation: "cos 150° = −cos 30° = −√3/2 です。"
  },
  {
    category: "三角比",
    question: "tan θ = 2（0° < θ < 90°）のとき、cos²θ の値は？",
    choices: ["2/5", "4/5", "1/√5", "1/5"],
    answer: 4,
    explanation: "1 + tan²θ = 1/cos²θ より、cos²θ = 1/(1 + 4) = 1/5 です。"
  },
  {
    category: "三角比",
    question: "△ABC で b = 4、c = 5、A = 30° のとき、面積は？",
    choices: ["5√3", "10", "5", "10√3"],
    answer: 3,
    explanation: "S = (1/2)bc sin A = (1/2) × 4 × 5 × (1/2) = 5 です。"
  },
  {
    category: "三角比",
    question: "sin θ + cos θ = 1/2 のとき、sin θ cos θ の値は？",
    choices: ["−3/8", "3/8", "−3/4", "1/4"],
    answer: 1,
    explanation: "両辺を2乗すると 1 + 2 sin θ cos θ = 1/4 なので、sin θ cos θ = −3/8 です。"
  },
  {
    category: "三角比",
    question: "3辺が a = 7、b = 5、c = 3 の三角形で、最も大きい角 A は？",
    choices: ["90°", "120°", "135°", "150°"],
    answer: 2,
    explanation: "cos A = (5² + 3² − 7²)/(2·5·3) = −15/30 = −1/2 なので、A = 120° です。"
  },
  {
    category: "三角比",
    question: "0° ≦ θ ≦ 180° で sin θ = 1/2 を満たす θ は？",
    choices: ["30°", "60°", "30°, 150°", "60°, 120°"],
    answer: 3,
    explanation: "単位円で y座標が 1/2 になる角は 30° と 150° の2つです。"
  },
  {
    category: "三角比",
    question: "スコアボードから 10 m 離れた地点で、てっぺんを見上げた角が 30° だった。スコアボードの高さは？（目の高さは考えない）",
    choices: ["5 m", "10√3/3 m", "10√3 m", "20 m"],
    answer: 2,
    explanation: "高さ = 10 × tan 30° = 10/√3 = 10√3/3（約 5.8 m）です。"
  },
  {
    category: "データの分析",
    question: "データ 2, 4, 4, 5, 10 の中央値は？",
    choices: ["4", "4.5", "5", "8"],
    answer: 1,
    explanation: "小さい順に並べたときの真ん中（3番目）の値なので 4 です。平均値 5 と混同しないように。"
  },
  {
    category: "データの分析",
    question: "データ 2, 4, 4, 5, 10 の分散は？",
    choices: ["6", "7.2", "36", "5"],
    answer: 2,
    explanation: "平均は 5。偏差の2乗は 9, 1, 1, 0, 25 で合計 36。分散は 36 ÷ 5 = 7.2 です。"
  },
  {
    category: "データの分析",
    question: "データ 1, 3, 5, 7, 9 の四分位範囲は？",
    choices: ["8", "4", "5", "6"],
    answer: 4,
    explanation: "中央値 5 を除いた下半分 {1, 3} から Q1 = 2、上半分 {7, 9} から Q3 = 8。四分位範囲は 8 − 2 = 6 です。"
  },
  {
    category: "データの分析",
    question: "相関係数 r がとりうる値の範囲は？",
    choices: ["0 ≦ r ≦ 1", "0 < r < 1", "−1 ≦ r ≦ 1", "r ≧ 0"],
    answer: 3,
    explanation: "相関係数は −1 以上 1 以下の値をとります。"
  },
  {
    category: "データの分析",
    question: "変量 x の分散が 4 のとき、y = 3x + 2 の分散は？",
    choices: ["14", "36", "12", "38"],
    answer: 2,
    explanation: "y = ax + b の分散は a² 倍になり、b は影響しません。9 × 4 = 36 です。"
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
    explanation: "役職に区別があるので順列 ₅P₂ = 5 × 4 = 20 通りです。"
  },
  {
    category: "場合の数",
    question: "6人が円形のテーブルに座る方法は何通り？",
    choices: ["120通り", "720通り", "60通り", "360通り"],
    answer: 1,
    explanation: "円順列なので (6 − 1)! = 120 通りです。"
  },
  {
    category: "場合の数",
    question: "1, 2, 3, 4, 5 から異なる3つの数字を使ってできる3桁の偶数は何個？",
    choices: ["36個", "12個", "60個", "24個"],
    answer: 4,
    explanation: "一の位が 2 か 4 の2通り、残りの百・十の位は ₄P₂ = 12 通り。2 × 12 = 24 個です。"
  },
  {
    category: "場合の数",
    question: "a, a, b, b, c の5文字を1列に並べる方法は何通り？",
    choices: ["60通り", "20通り", "30通り", "120通り"],
    answer: 3,
    explanation: "同じものを含む順列なので 5!/(2!·2!) = 120/4 = 30 通りです。"
  },
  {
    category: "場合の数",
    question: "正八角形の対角線は何本？",
    choices: ["16本", "20本", "28本", "24本"],
    answer: 2,
    explanation: "8つの頂点から2つ選ぶ ₈C₂ = 28 から、辺の 8 本を引いて 20 本です。"
  },
  {
    category: "場合の数",
    question: "4人を2人ずつの2組に分ける方法は何通り？（組に区別はない）",
    choices: ["6通り", "3通り", "12通り", "2通り"],
    answer: 2,
    explanation: "₄C₂ = 6 ですが、組に区別がないので 2! で割って 3 通りです。"
  },
  {
    category: "場合の数",
    question: "9人の選手からピッチャーとキャッチャーを1人ずつ選ぶ方法は何通り？",
    choices: ["36通り", "81通り", "72通り", "18通り"],
    answer: 3,
    explanation: "役割に区別があるので ₉P₂ = 9 × 8 = 72 通りです。"
  },
  {
    category: "確率",
    question: "3人で1回じゃんけんをするとき、あいこになる確率は？",
    choices: ["1/9", "2/9", "1/3", "2/3"],
    answer: 3,
    explanation: "手の出し方は 3³ = 27 通り。全員同じ手が 3 通り、全員違う手が 3! = 6 通りで、9/27 = 1/3 です。"
  },
  {
    category: "確率",
    question: "サイコロを2個投げて、目の和が 7 になる確率は？",
    choices: ["5/36", "1/6", "7/36", "1/12"],
    answer: 2,
    explanation: "和が 7 になるのは (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) の 6 通り。6/36 = 1/6 です。"
  },
  {
    category: "確率",
    question: "コインを3回投げて、少なくとも1回表が出る確率は？",
    choices: ["1/8", "3/8", "7/8", "1/2"],
    answer: 3,
    explanation: "余事象「3回とも裏」の確率 1/8 を 1 から引いて 7/8 です。"
  },
  {
    category: "確率",
    question: "赤玉3個と白玉2個が入った袋から同時に2個取り出すとき、2個とも赤玉である確率は？",
    choices: ["9/25", "3/5", "1/5", "3/10"],
    answer: 4,
    explanation: "₃C₂/₅C₂ = 3/10 です。"
  },
  {
    category: "確率",
    question: "サイコロを2個投げて目の和が偶数だったとき、2個とも奇数である条件付き確率は？",
    choices: ["1/2", "1/4", "2/3", "1/3"],
    answer: 1,
    explanation: "和が偶数になるのは「両方偶数」9通り＋「両方奇数」9通りの 18 通り。そのうち両方奇数は 9 通りで 9/18 = 1/2 です。"
  },
  {
    category: "確率",
    question: "確率 1/3 で成功する試行を3回くり返すとき、ちょうど2回成功する確率は？",
    choices: ["4/27", "2/9", "1/9", "1/3"],
    answer: 2,
    explanation: "反復試行の確率 ₃C₂ (1/3)² (2/3) = 3 × 1/9 × 2/3 = 2/9 です。"
  },
  {
    category: "確率",
    question: "サイコロを1回投げ、出た目 × 100 円がもらえるとき、もらえる金額の期待値は？",
    choices: ["300円", "600円", "350円", "400円"],
    answer: 3,
    explanation: "(100 + 200 + … + 600) × 1/6 = 2100/6 = 350 円です。"
  },
  {
    category: "整数の性質",
    question: "168 と 180 の最大公約数は？",
    choices: ["6", "12", "24", "36"],
    answer: 2,
    explanation: "168 = 2³·3·7、180 = 2²·3²·5 なので、共通部分は 2²·3 = 12 です。"
  },
  {
    category: "整数の性質",
    question: "12 と 18 の最小公倍数は？",
    choices: ["72", "6", "216", "36"],
    answer: 4,
    explanation: "12 = 2²·3、18 = 2·3² なので、2²·3² = 36 です。"
  },
  {
    category: "整数の性質",
    question: "360 の正の約数は何個？",
    choices: ["12個", "18個", "24個", "36個"],
    answer: 3,
    explanation: "360 = 2³·3²·5 なので、(3 + 1)(2 + 1)(1 + 1) = 24 個です。"
  },
  {
    category: "整数の性質",
    question: "10進法の 25 を2進法で表すと？",
    choices: ["10011", "10101", "11001", "11100"],
    answer: 3,
    explanation: "25 = 16 + 8 + 1 = 1·2⁴ + 1·2³ + 0·2² + 0·2 + 1 なので 11001₍₂₎ です。"
  },
  {
    category: "整数の性質",
    question: "方程式 3x + 5y = 1 を満たす整数 (x, y) の組の1つは？",
    choices: ["(2, −1)", "(1, −1)", "(−2, 1)", "(2, 1)"],
    answer: 1,
    explanation: "3·2 + 5·(−1) = 6 − 5 = 1 です。他は −2、−1、11 になります。"
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
    question: "円に内接する四角形 ABCD で ∠A = 70° のとき、∠C は？",
    choices: ["70°", "90°", "110°", "140°"],
    answer: 3,
    explanation: "円に内接する四角形の向かい合う角の和は 180° なので、∠C = 110° です。"
  },
  {
    category: "図形の性質",
    question: "点 P を通る2直線が円と A, B および C, D で交わる。PA = 4、PB = 6、PC = 3 のとき PD は？",
    choices: ["4.5", "7", "8", "9"],
    answer: 3,
    explanation: "方べきの定理 PA·PB = PC·PD より、24 = 3·PD、PD = 8 です。"
  },
  {
    category: "図形の性質",
    question: "△ABC で AB = 6、AC = 4、BC = 5。∠A の二等分線と BC の交点を D とするとき、BD は？",
    choices: ["3", "2", "2.5", "3.5"],
    answer: 1,
    explanation: "BD : DC = AB : AC = 3 : 2 なので、BD = 5 × 3/5 = 3 です。"
  },
  {
    category: "図形の性質",
    question: "ある弧に対する中心角が 100° のとき、同じ弧に対する円周角は？",
    choices: ["100°", "50°", "130°", "80°"],
    answer: 2,
    explanation: "円周角は中心角の半分なので 50° です。"
  }
];
