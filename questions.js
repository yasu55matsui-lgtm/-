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
  },
  // ---- 数学II・B・C ----
  {
    category: "式と証明",
    question: "(2x + 1)⁵ を展開したとき、x³ の係数は？",
    choices: ["10", "80", "160", "40"],
    answer: 2,
    explanation: "二項定理より ₅C₃ · 2³ = 10 × 8 = 80 です。"
  },
  {
    category: "式と証明",
    question: "(x + 1/x)⁶ を展開したときの定数項は？",
    choices: ["15", "6", "1", "20"],
    answer: 4,
    explanation: "一般項は ₆Cᵣ x⁶⁻ʳ (1/x)ʳ = ₆Cᵣ x⁶⁻²ʳ。r = 3 のとき定数項で ₆C₃ = 20 です。"
  },
  {
    category: "式と証明",
    question: "1/(x − 1) − 1/(x + 1) を計算すると？",
    choices: ["2/(x² − 1)", "−2/(x² − 1)", "2x/(x² − 1)", "0"],
    answer: 1,
    explanation: "通分すると {(x + 1) − (x − 1)}/{(x − 1)(x + 1)} = 2/(x² − 1) です。"
  },
  {
    category: "式と証明",
    question: "a(x − 1) + b(x + 1) = 3x + 1 が x についての恒等式となる a, b は？",
    choices: ["a = 2, b = 1", "a = 1, b = 2", "a = −1, b = 2", "a = 1, b = −2"],
    answer: 2,
    explanation: "左辺 = (a + b)x + (−a + b)。係数を比べて a + b = 3、−a + b = 1 より a = 1, b = 2 です。"
  },
  {
    category: "式と証明",
    question: "x > 0 のとき、x + 4/x の最小値は？",
    choices: ["8", "4", "5", "2"],
    answer: 2,
    explanation: "相加平均と相乗平均の関係より x + 4/x ≧ 2√(x · 4/x) = 4。等号は x = 2 のときです。"
  },
  {
    category: "式と証明",
    question: "a > 0, b > 0, ab = 9 のとき、a + b の最小値は？",
    choices: ["18", "6", "9", "3"],
    answer: 2,
    explanation: "a + b ≧ 2√(ab) = 2 × 3 = 6。等号は a = b = 3 のときです。"
  },
  {
    category: "式と証明",
    question: "ₙC₀ + ₙC₁ + ₙC₂ + … + ₙCₙ の値は？",
    choices: ["n²", "2n", "2ⁿ", "n!"],
    answer: 3,
    explanation: "二項定理 (1 + x)ⁿ = Σ ₙCₖ xᵏ に x = 1 を代入すると 2ⁿ です。"
  },
  {
    category: "式と証明",
    question: "実数 x, y が x + y = 1 を満たすとき、x² + y² の最小値は？",
    choices: ["0", "1/2", "1", "1/4"],
    answer: 2,
    explanation: "y = 1 − x を代入すると 2x² − 2x + 1 = 2(x − 1/2)² + 1/2。最小値は 1/2 です。"
  },
  {
    category: "複素数と方程式",
    question: "(2 + 3i)(1 − i) を計算すると？",
    choices: ["5 − i", "5 + i", "2 − 3i", "−1 + i"],
    answer: 2,
    explanation: "2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i です（i² = −1）。"
  },
  {
    category: "複素数と方程式",
    question: "i¹⁰ の値は？",
    choices: ["−i", "−1", "i", "1"],
    answer: 2,
    explanation: "i⁴ = 1 なので i¹⁰ = (i⁴)² · i² = −1 です。"
  },
  {
    category: "複素数と方程式",
    question: "(1 + i)/(1 − i) を計算すると？",
    choices: ["1 + i", "1", "−i", "i"],
    answer: 4,
    explanation: "分母・分子に (1 + i) をかけると (1 + i)²/2 = 2i/2 = i です。"
  },
  {
    category: "複素数と方程式",
    question: "2次方程式 x² + 2x + 5 = 0 の解は？",
    choices: ["x = −1 ± 4i", "x = −2 ± i", "x = −1 ± 2i", "x = 1 ± 2i"],
    answer: 3,
    explanation: "解の公式より x = −1 ± √(1 − 5) = −1 ± 2i です。"
  },
  {
    category: "複素数と方程式",
    question: "2x² − 3x + 5 = 0 の2つの解を α, β とするとき、α + β と αβ は？",
    choices: ["α + β = 3/2, αβ = 5/2", "α + β = 3/2, αβ = −5/2", "α + β = 3, αβ = 5", "α + β = −3/2, αβ = 5/2"],
    answer: 1,
    explanation: "解と係数の関係より α + β = −(−3)/2 = 3/2、αβ = 5/2 です。"
  },
  {
    category: "複素数と方程式",
    question: "α + β = 3、αβ = 1 のとき、α² + β² の値は？",
    choices: ["7", "11", "5", "9"],
    answer: 1,
    explanation: "α² + β² = (α + β)² − 2αβ = 9 − 2 = 7 です。"
  },
  {
    category: "複素数と方程式",
    question: "x³ + 2x² − x + 3 を x − 1 で割った余りは？",
    choices: ["3", "7", "5", "1"],
    answer: 3,
    explanation: "剰余の定理より、余りは f(1) = 1 + 2 − 1 + 3 = 5 です。"
  },
  {
    category: "複素数と方程式",
    question: "x³ − 3x + 2 を因数分解すると？",
    choices: ["(x − 1)²(x + 2)", "(x − 1)(x² + x + 2)", "(x + 1)²(x − 2)", "(x − 1)(x + 1)(x − 2)"],
    answer: 1,
    explanation: "x = 1 を代入すると 0 なので x − 1 を因数にもちます。割ると x² + x − 2 = (x − 1)(x + 2) となり、(x − 1)²(x + 2) です。"
  },
  {
    category: "複素数と方程式",
    question: "x² + kx + 4 = 0 が虚数解をもつような k の範囲は？",
    choices: ["−4 < k < 4", "−2 < k < 2", "k < 4", "k < −4, 4 < k"],
    answer: 1,
    explanation: "判別式 D = k² − 16 < 0 より −4 < k < 4 です。"
  },
  {
    category: "複素数と方程式",
    question: "1 の3乗根のうち虚数であるものを ω とするとき、ω² + ω + 1 の値は？",
    choices: ["1", "0", "ω", "−1"],
    answer: 2,
    explanation: "ω³ = 1 より (ω − 1)(ω² + ω + 1) = 0。ω ≠ 1 なので ω² + ω + 1 = 0 です。"
  },
  {
    category: "複素数と方程式",
    question: "方程式 x³ = 8 の虚数解は？",
    choices: ["x = −1 ± √3 i", "x = −1 ± 2i", "x = −2 ± √3 i", "x = 1 ± √3 i"],
    answer: 1,
    explanation: "x³ − 8 = (x − 2)(x² + 2x + 4) = 0。x² + 2x + 4 = 0 を解いて x = −1 ± √3 i です。"
  },
  {
    category: "図形と方程式",
    question: "2点 A(1, 2)、B(4, 6) の間の距離は？",
    choices: ["√7", "5", "7", "25"],
    answer: 2,
    explanation: "√{(4 − 1)² + (6 − 2)²} = √(9 + 16) = 5 です。"
  },
  {
    category: "図形と方程式",
    question: "2点 A(1, 2)、B(7, −4) を結ぶ線分 AB を 2 : 1 に内分する点の座標は？",
    choices: ["(13, −10)", "(4, −1)", "(5, −2)", "(3, 0)"],
    answer: 3,
    explanation: "((1·1 + 2·7)/3, (1·2 + 2·(−4))/3) = (5, −2) です。(13, −10) は 2 : 1 に外分する点です。"
  },
  {
    category: "図形と方程式",
    question: "点 (1, 2) を通り、傾きが 3 の直線の方程式は？",
    choices: ["y = 3x − 1", "y = 3x − 5", "y = 3x + 2", "y = 3x + 1"],
    answer: 1,
    explanation: "y − 2 = 3(x − 1) より y = 3x − 1 です。"
  },
  {
    category: "図形と方程式",
    question: "直線 y = 2x + 1 に垂直で、原点を通る直線の方程式は？",
    choices: ["y = (1/2)x", "y = −2x", "y = 2x", "y = −(1/2)x"],
    answer: 4,
    explanation: "垂直な2直線の傾きの積は −1 なので、傾きは −1/2。原点を通るので y = −(1/2)x です。"
  },
  {
    category: "図形と方程式",
    question: "点 (3, 4) と直線 3x + 4y − 5 = 0 の距離は？",
    choices: ["5", "3", "20", "4"],
    answer: 4,
    explanation: "点と直線の距離の公式より |3·3 + 4·4 − 5|/√(3² + 4²) = 20/5 = 4 です。"
  },
  {
    category: "図形と方程式",
    question: "円 x² + y² − 4x + 6y − 3 = 0 の中心と半径は？",
    choices: ["中心 (2, −3)、半径 16", "中心 (−2, 3)、半径 √3", "中心 (−2, 3)、半径 4", "中心 (2, −3)、半径 4"],
    answer: 4,
    explanation: "(x − 2)² + (y + 3)² = 3 + 4 + 9 = 16 と変形できるので、中心 (2, −3)、半径 4 です。"
  },
  {
    category: "図形と方程式",
    question: "円 x² + y² = 10 上の点 (1, 3) における接線の方程式は？",
    choices: ["x − 3y = 10", "x + 3y = 1", "3x + y = 10", "x + 3y = 10"],
    answer: 4,
    explanation: "円 x² + y² = r² 上の点 (x₁, y₁) における接線は x₁x + y₁y = r² なので、x + 3y = 10 です。"
  },
  {
    category: "図形と方程式",
    question: "円 x² + y² = 5 と直線 y = 2x + k が接するときの k の値は？",
    choices: ["k = 5", "k = ±5", "k = ±√5", "k = ±25"],
    answer: 2,
    explanation: "中心 (0, 0) と直線 2x − y + k = 0 の距離 |k|/√5 が半径 √5 に等しいので |k| = 5、k = ±5 です。"
  },
  {
    category: "図形と方程式",
    question: "不等式 x² + y² < 4 の表す領域は？",
    choices: ["原点中心・半径4の円の内部", "原点中心・半径2の円の内部（境界を含む）", "原点中心・半径2の円の外部", "原点中心・半径2の円の内部（境界を含まない）"],
    answer: 4,
    explanation: "x² + y² = 4 は原点中心・半径2の円。「<」なので内部で、境界は含みません。"
  },
  {
    category: "図形と方程式",
    question: "2点 A(0, 0)、B(4, 0) から等しい距離にある点 P の軌跡は？",
    choices: ["直線 y = 2", "直線 y = x", "円 x² + y² = 4", "直線 x = 2"],
    answer: 4,
    explanation: "P(x, y) とすると x² + y² = (x − 4)² + y² より x = 2。線分 AB の垂直二等分線です。"
  },
  {
    category: "三角関数",
    question: "210° を弧度法で表すと？",
    choices: ["5π/6", "7π/3", "7π/6", "4π/3"],
    answer: 3,
    explanation: "180° = π なので 210° = 210 × π/180 = 7π/6 です。"
  },
  {
    category: "三角関数",
    question: "sin(7π/6) の値は？",
    choices: ["−√3/2", "√3/2", "−1/2", "1/2"],
    answer: 3,
    explanation: "7π/6 = π + π/6 なので sin(7π/6) = −sin(π/6) = −1/2 です。"
  },
  {
    category: "三角関数",
    question: "tan(3π/4) の値は？",
    choices: ["−1", "√3", "−√3", "1"],
    answer: 1,
    explanation: "3π/4 は 135° で、tan 135° = −1 です。"
  },
  {
    category: "三角関数",
    question: "sin 75° の値は？",
    choices: ["(√6 + √2)/4", "(√6 − √2)/4", "(√2 + 1)/2", "(√3 + 1)/2"],
    answer: 1,
    explanation: "加法定理より sin(45° + 30°) = sin45°cos30° + cos45°sin30° = (√6 + √2)/4 です。"
  },
  {
    category: "三角関数",
    question: "cos 105° の値は？",
    choices: ["(√2 − √6)/4", "(√2 + √6)/4", "−(√2 + √6)/4", "(√6 − √2)/4"],
    answer: 1,
    explanation: "cos(60° + 45°) = cos60°cos45° − sin60°sin45° = √2/4 − √6/4 = (√2 − √6)/4 です。"
  },
  {
    category: "三角関数",
    question: "sin θ = 3/5（0 < θ < π/2）のとき、sin 2θ の値は？",
    choices: ["7/25", "6/5", "12/25", "24/25"],
    answer: 4,
    explanation: "cos θ = 4/5 なので、2倍角の公式より sin 2θ = 2 · 3/5 · 4/5 = 24/25 です。"
  },
  {
    category: "三角関数",
    question: "sin θ = 3/5 のとき、cos 2θ の値は？",
    choices: ["7/25", "16/25", "24/25", "−7/25"],
    answer: 1,
    explanation: "cos 2θ = 1 − 2sin²θ = 1 − 18/25 = 7/25 です。"
  },
  {
    category: "三角関数",
    question: "y = sin θ + √3 cos θ の最大値は？",
    choices: ["4", "√3", "2", "1 + √3"],
    answer: 3,
    explanation: "三角関数の合成より y = 2 sin(θ + π/3) なので、最大値は 2 です。"
  },
  {
    category: "三角関数",
    question: "y = 2 sin 3x の周期は？",
    choices: ["2π/3", "3π/2", "π/3", "6π"],
    answer: 1,
    explanation: "sin kx の周期は 2π/k なので 2π/3 です。前の 2 は振幅で、周期には関係しません。"
  },
  {
    category: "三角関数",
    question: "0 ≦ θ < 2π のとき、cos θ = −1/2 を満たす θ は？",
    choices: ["θ = 2π/3, 4π/3", "θ = π/3, 5π/3", "θ = 2π/3, 5π/3", "θ = 5π/6, 7π/6"],
    answer: 1,
    explanation: "単位円で x座標が −1/2 になる角なので、2π/3 と 4π/3 です。"
  },
  {
    category: "三角関数",
    question: "0 ≦ θ < 2π のとき、sin θ > 1/2 を満たす θ の範囲は？",
    choices: ["0 ≦ θ < π/6, 5π/6 < θ < 2π", "π/3 < θ < 2π/3", "π/6 < θ < 7π/6", "π/6 < θ < 5π/6"],
    answer: 4,
    explanation: "sin θ = 1/2 となるのは π/6 と 5π/6。y座標が 1/2 より大きいのはその間です。"
  },
  {
    category: "三角関数",
    question: "半角の公式で、cos²(θ/2) を cos θ で表すと？",
    choices: ["(1 + cos θ)/2", "(1 + sin θ)/2", "1 + cos θ", "(1 − cos θ)/2"],
    answer: 1,
    explanation: "cos θ = 2cos²(θ/2) − 1 より、cos²(θ/2) = (1 + cos θ)/2 です。"
  },
  {
    category: "三角関数",
    question: "1 ラジアンはおよそ何度？",
    choices: ["約 60°", "約 57°", "約 3.14°", "約 45°"],
    answer: 2,
    explanation: "1 ラジアン = 180°/π ≒ 57.3° です。"
  },
  {
    category: "指数・対数",
    question: "8^(2/3) の値は？",
    choices: ["4", "2", "16/3", "64"],
    answer: 1,
    explanation: "8^(2/3) = (³√8)² = 2² = 4 です。"
  },
  {
    category: "指数・対数",
    question: "(1/27)^(−1/3) の値は？",
    choices: ["9", "1/3", "−3", "3"],
    answer: 4,
    explanation: "(1/27)^(−1/3) = 27^(1/3) = 3 です。"
  },
  {
    category: "指数・対数",
    question: "log₂ 32 の値は？",
    choices: ["6", "5", "4", "16"],
    answer: 2,
    explanation: "2⁵ = 32 なので log₂ 32 = 5 です。"
  },
  {
    category: "指数・対数",
    question: "log₃ 18 − log₃ 2 の値は？",
    choices: ["3", "log₃ 16", "2", "1"],
    answer: 3,
    explanation: "log₃ 18 − log₃ 2 = log₃ (18/2) = log₃ 9 = 2 です。"
  },
  {
    category: "指数・対数",
    question: "log₂ 3 × log₃ 8 の値は？",
    choices: ["24", "log₂ 24", "3", "8"],
    answer: 3,
    explanation: "底の変換より log₂ 3 × (log₂ 8 / log₂ 3) = log₂ 8 = 3 です。"
  },
  {
    category: "指数・対数",
    question: "方程式 2ˣ = 1/8 の解は？",
    choices: ["x = −1/3", "x = −3", "x = 3", "x = 1/3"],
    answer: 2,
    explanation: "1/8 = 2⁻³ なので x = −3 です。"
  },
  {
    category: "指数・対数",
    question: "方程式 log₂(x − 1) = 3 の解は？",
    choices: ["x = 9", "x = 8", "x = 7", "x = 4"],
    answer: 1,
    explanation: "x − 1 = 2³ = 8 より x = 9（真数条件 x > 1 も満たす）です。"
  },
  {
    category: "指数・対数",
    question: "不等式 2^(x+1) > 16 の解は？",
    choices: ["x < 3", "x > 7", "x > 3", "x > 4"],
    answer: 3,
    explanation: "16 = 2⁴ で、底 2 > 1 なので x + 1 > 4、x > 3 です。"
  },
  {
    category: "指数・対数",
    question: "log₁₀ 2 = 0.3010 とするとき、2⁵⁰ は何桁の整数？",
    choices: ["16桁", "50桁", "17桁", "15桁"],
    answer: 1,
    explanation: "log₁₀ 2⁵⁰ = 50 × 0.3010 = 15.05。15 ≦ 15.05 < 16 なので 16 桁です。"
  },
  {
    category: "指数・対数",
    question: "不等式 log_(1/2) x > 1 の解は？",
    choices: ["x > 2", "x > 1/2", "0 < x < 1/2", "x < 1/2"],
    answer: 3,
    explanation: "底 1/2 は 1 より小さいので不等号の向きが変わり x < 1/2。真数条件 x > 0 とあわせて 0 < x < 1/2 です。"
  },
  {
    category: "指数・対数",
    question: "√2 と ³√3 の大小関係は？",
    choices: ["比べられない", "√2 > ³√3", "³√3 > √2", "√2 = ³√3"],
    answer: 3,
    explanation: "両方を6乗すると (√2)⁶ = 8、(³√3)⁶ = 9。よって ³√3 の方が大きいです。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ − 3x² + 2 の導関数 f′(x) は？",
    choices: ["3x² − 3x", "3x² − 6x + 2", "x² − 6x", "3x² − 6x"],
    answer: 4,
    explanation: "(xⁿ)′ = nxⁿ⁻¹ で、定数の微分は 0。f′(x) = 3x² − 6x です。"
  },
  {
    category: "微分・積分",
    question: "曲線 y = x² 上の点 (1, 1) における接線の方程式は？",
    choices: ["y = 2x", "y = 2x − 1", "y = x", "y = 2x + 1"],
    answer: 2,
    explanation: "y′ = 2x より傾きは 2。y − 1 = 2(x − 1) なので y = 2x − 1 です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ − 3x の極大値は？",
    choices: ["1", "2", "−2", "0"],
    answer: 2,
    explanation: "f′(x) = 3(x + 1)(x − 1)。x = −1 で極大となり、f(−1) = −1 + 3 = 2 です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ − 6x² + 9x の極小値は？",
    choices: ["−4", "3", "0", "4"],
    answer: 3,
    explanation: "f′(x) = 3(x − 1)(x − 3)。x = 3 で極小となり、f(3) = 27 − 54 + 27 = 0 です（極大値は f(1) = 4）。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x² で、x が 1 から 3 まで変わるときの平均変化率は？",
    choices: ["4", "2", "8", "6"],
    answer: 1,
    explanation: "(f(3) − f(1))/(3 − 1) = (9 − 1)/2 = 4 です。"
  },
  {
    category: "微分・積分",
    question: "lim(h→0) {(2 + h)² − 4}/h の値は？",
    choices: ["8", "0", "4", "2"],
    answer: 3,
    explanation: "{(4 + 4h + h²) − 4}/h = 4 + h → 4。これは f(x) = x² の x = 2 における微分係数です。"
  },
  {
    category: "微分・積分",
    question: "∫(3x² − 2x + 1) dx を求めると？（C は積分定数）",
    choices: ["6x − 2 + C", "x³ − 2x² + x + C", "3x³ − 2x² + x + C", "x³ − x² + x + C"],
    answer: 4,
    explanation: "∫xⁿ dx = xⁿ⁺¹/(n + 1) + C より x³ − x² + x + C です。"
  },
  {
    category: "微分・積分",
    question: "∫₀² (x² + 1) dx の値は？",
    choices: ["5", "8/3", "10/3", "14/3"],
    answer: 4,
    explanation: "[x³/3 + x]₀² = 8/3 + 2 = 14/3 です。"
  },
  {
    category: "微分・積分",
    question: "放物線 y = x² − 2x と x軸で囲まれた部分の面積は？",
    choices: ["2/3", "8/3", "1", "4/3"],
    answer: 4,
    explanation: "0 ≦ x ≦ 2 で x軸の下にあるので ∫₀² (2x − x²) dx = 4 − 8/3 = 4/3 です。"
  },
  {
    category: "微分・積分",
    question: "曲線 y = x² と直線 y = x で囲まれた部分の面積は？",
    choices: ["1/3", "1/6", "1/2", "5/6"],
    answer: 2,
    explanation: "交点は x = 0, 1。∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6 です。"
  },
  {
    category: "微分・積分",
    question: "∫₋₁¹ (x³ + 3x²) dx の値は？",
    choices: ["4", "0", "1", "2"],
    answer: 4,
    explanation: "x³ は奇関数なので −1 から 1 までの積分は 0。∫₋₁¹ 3x² dx = [x³]₋₁¹ = 2 です。"
  },
  {
    category: "微分・積分",
    question: "d/dx ∫₁ˣ (t² + 1) dt を求めると？",
    choices: ["x³/3 + x − 4/3", "x³/3 + x", "x² + 1", "2x"],
    answer: 3,
    explanation: "d/dx ∫ₐˣ f(t) dt = f(x) なので x² + 1 です。"
  },
  {
    category: "微分・積分",
    question: "3次方程式 x³ − 3x − k = 0 が異なる3つの実数解をもつ k の範囲は？",
    choices: ["k < −2", "−2 < k < 2", "−1 < k < 1", "k > 2"],
    answer: 2,
    explanation: "y = x³ − 3x（極大値 2、極小値 −2）と直線 y = k が3点で交わる条件なので −2 < k < 2 です。"
  },
  {
    category: "数列",
    question: "等差数列 3, 7, 11, … の第20項は？",
    choices: ["79", "80", "76", "83"],
    answer: 1,
    explanation: "初項 3、公差 4 なので a₂₀ = 3 + 19 × 4 = 79 です。"
  },
  {
    category: "数列",
    question: "初項 2、公差 3 の等差数列の、初項から第10項までの和は？",
    choices: ["145", "155", "290", "165"],
    answer: 2,
    explanation: "S = 10/2 × {2·2 + (10 − 1)·3} = 5 × 31 = 155 です。"
  },
  {
    category: "数列",
    question: "等比数列 2, 6, 18, … の第6項は？",
    choices: ["162", "243", "486", "1458"],
    answer: 3,
    explanation: "初項 2、公比 3 なので 2 × 3⁵ = 486 です。"
  },
  {
    category: "数列",
    question: "初項 1、公比 2 の等比数列の、初項から第10項までの和は？",
    choices: ["1024", "2047", "511", "1023"],
    answer: 4,
    explanation: "S = 1 × (2¹⁰ − 1)/(2 − 1) = 1023 です。"
  },
  {
    category: "数列",
    question: "Σ(k=1〜10) k の値は？",
    choices: ["55", "100", "45", "110"],
    answer: 1,
    explanation: "Σk = n(n + 1)/2 より 10 × 11/2 = 55 です。"
  },
  {
    category: "数列",
    question: "Σ(k=1〜n) k² を n の式で表すと？",
    choices: ["{n(n + 1)/2}²", "n(n + 1)/2", "n²(n + 1)/2", "n(n + 1)(2n + 1)/6"],
    answer: 4,
    explanation: "平方の和の公式です。{n(n + 1)/2}² は立方の和 Σk³ の公式です。"
  },
  {
    category: "数列",
    question: "Σ(k=1〜4) k³ の値は？",
    choices: ["30", "64", "50", "100"],
    answer: 4,
    explanation: "1 + 8 + 27 + 64 = 100。公式 {n(n + 1)/2}² = 10² = 100 とも一致します。"
  },
  {
    category: "数列",
    question: "Σ(k=1〜n) (2k − 1) を n の式で表すと？",
    choices: ["2n² − 1", "n²", "n² − n", "n(n + 1)"],
    answer: 2,
    explanation: "2 × n(n + 1)/2 − n = n²。奇数を小さい順に n 個たすと n² になります。"
  },
  {
    category: "数列",
    question: "数列 1, 2, 4, 7, 11, … の一般項 aₙ は？",
    choices: ["(n² + n)/2", "n² − n + 1", "2n − 1", "(n² − n + 2)/2"],
    answer: 4,
    explanation: "階差数列が 1, 2, 3, 4, … なので aₙ = 1 + Σ(k=1〜n−1) k = 1 + n(n − 1)/2 = (n² − n + 2)/2 です。"
  },
  {
    category: "数列",
    question: "a₁ = 1、aₙ₊₁ = aₙ + 3 で定められる数列の一般項は？",
    choices: ["aₙ = 3n", "aₙ = 3n − 2", "aₙ = 3n + 1", "aₙ = n + 3"],
    answer: 2,
    explanation: "初項 1、公差 3 の等差数列なので aₙ = 1 + 3(n − 1) = 3n − 2 です。"
  },
  {
    category: "数列",
    question: "a₁ = 1、aₙ₊₁ = 2aₙ + 1 で定められる数列の一般項は？",
    choices: ["aₙ = 2n − 1", "aₙ = 2ⁿ⁻¹", "aₙ = 2ⁿ − 1", "aₙ = 2ⁿ + 1"],
    answer: 3,
    explanation: "aₙ₊₁ + 1 = 2(aₙ + 1) と変形できるので、aₙ + 1 は初項 2、公比 2 の等比数列。aₙ = 2ⁿ − 1 です。"
  },
  {
    category: "数列",
    question: "Σ(k=1〜n) 1/{k(k + 1)} を n の式で表すと？",
    choices: ["1/(n + 1)", "(n + 1)/n", "1 − 1/n", "n/(n + 1)"],
    answer: 4,
    explanation: "1/{k(k + 1)} = 1/k − 1/(k + 1) と分けると、途中が消えて 1 − 1/(n + 1) = n/(n + 1) です。"
  },
  {
    category: "数列",
    question: "初項から第 n 項までの和が Sₙ = n² + 2n である数列の一般項は？",
    choices: ["aₙ = 2n − 1", "aₙ = 2n + 3", "aₙ = 2n + 1", "aₙ = n² + 2n"],
    answer: 3,
    explanation: "n ≧ 2 のとき aₙ = Sₙ − Sₙ₋₁ = 2n + 1。a₁ = S₁ = 3 もこの式を満たします。"
  },
  {
    category: "数列",
    question: "等差数列で a₃ = 10、a₇ = 22 のとき、一般項は？",
    choices: ["aₙ = 3n − 1", "aₙ = 3n + 1", "aₙ = 4n − 2", "aₙ = 3n + 4"],
    answer: 2,
    explanation: "a₇ − a₃ = 4d = 12 より d = 3、a₁ = 10 − 2·3 = 4。aₙ = 4 + 3(n − 1) = 3n + 1 です。"
  },
  {
    category: "数列",
    question: "数学的帰納法で、最初に示すことは？",
    choices: ["n = 1 のとき成り立つこと", "n = k のとき成り立つこと", "n = 0 のとき成り立たないこと", "すべての n で成り立つこと"],
    answer: 1,
    explanation: "①n = 1 のとき成り立つ、②n = k で成り立てば n = k + 1 でも成り立つ、の2段階で示します。"
  },
  {
    category: "数列",
    question: "3つの正の数 2, x, 18 がこの順に等比数列になるとき、x は？",
    choices: ["10", "6", "9", "8"],
    answer: 2,
    explanation: "等比中項より x² = 2 × 18 = 36、x > 0 なので x = 6 です。10 は等差中項です。"
  },
  {
    category: "数列",
    question: "素振りを1日目に10回、その後は毎日前日より5回ずつ増やす。30日間の合計回数は？",
    choices: ["4650回", "2475回", "2325回", "2550回"],
    answer: 2,
    explanation: "30日目は 10 + 29 × 5 = 155 回。合計は 30 × (10 + 155)/2 = 2475 回です。"
  },
  {
    category: "統計的な推測",
    question: "確率変数 X が 1, 2, 3 をそれぞれ確率 1/2, 1/3, 1/6 でとるとき、期待値 E(X) は？",
    choices: ["3/2", "1", "2", "5/3"],
    answer: 4,
    explanation: "E(X) = 1 × 1/2 + 2 × 1/3 + 3 × 1/6 = 1/2 + 2/3 + 1/2 = 5/3 です。"
  },
  {
    category: "統計的な推測",
    question: "E(X) = 3、V(X) = 4 のとき、Y = 2X + 1 の期待値と分散は？",
    choices: ["E(Y) = 7, V(Y) = 16", "E(Y) = 6, V(Y) = 8", "E(Y) = 7, V(Y) = 8", "E(Y) = 7, V(Y) = 9"],
    answer: 1,
    explanation: "E(aX + b) = aE(X) + b = 7、V(aX + b) = a²V(X) = 4 × 4 = 16 です。"
  },
  {
    category: "統計的な推測",
    question: "二項分布 B(100, 1/5) に従う確率変数の平均と標準偏差は？",
    choices: ["平均 20、標準偏差 16", "平均 5、標準偏差 4", "平均 20、標準偏差 2", "平均 20、標準偏差 4"],
    answer: 4,
    explanation: "平均 np = 20、分散 np(1 − p) = 100 × 1/5 × 4/5 = 16 なので標準偏差は 4 です。"
  },
  {
    category: "統計的な推測",
    question: "打率 .300 の打者が 10 打席に立つとき、ヒットの本数の期待値は？（各打席は独立とする）",
    choices: ["0.3本", "7本", "3本", "2.1本"],
    answer: 3,
    explanation: "ヒット数は二項分布 B(10, 0.3) に従うので、期待値は 10 × 0.3 = 3 本です（2.1 は分散）。"
  },
  {
    category: "統計的な推測",
    question: "正規分布 N(m, σ²) に従う X が m − σ ≦ X ≦ m + σ の範囲に入る確率はおよそ？",
    choices: ["約 0.95", "約 0.50", "約 0.68", "約 0.34"],
    answer: 3,
    explanation: "平均 ± 1σ の範囲に入る確率は約 68%（± 2σ なら約 95%）です。"
  },
  {
    category: "統計的な推測",
    question: "X が正規分布 N(50, 10²) に従うとき、Z = (X − 50)/10 が従う分布は？",
    choices: ["N(5, 1)", "N(0, 1)", "N(0, 10)", "N(50, 1)"],
    answer: 2,
    explanation: "平均を引いて標準偏差で割る（標準化する）と、標準正規分布 N(0, 1) に従います。"
  },
  {
    category: "統計的な推測",
    question: "母標準偏差 10 の母集団から大きさ 100 の標本をとるとき、標本平均の標準偏差は？",
    choices: ["100", "1", "0.1", "10"],
    answer: 2,
    explanation: "標本平均の標準偏差は σ/√n = 10/√100 = 1 です。"
  },
  {
    category: "統計的な推測",
    question: "母平均の信頼度 95% の信頼区間を求めるときに使う値は？",
    choices: ["1.64", "3.00", "1.96", "2.58"],
    answer: 3,
    explanation: "信頼区間は X̄ ± 1.96 × σ/√n です（2.58 は信頼度 99%）。"
  },
  {
    category: "統計的な推測",
    question: "確率密度関数が f(x) = 2x（0 ≦ x ≦ 1）のとき、P(0 ≦ X ≦ 1/2) は？",
    choices: ["1/4", "1/2", "3/4", "1"],
    answer: 1,
    explanation: "∫₀^(1/2) 2x dx = [x²]₀^(1/2) = 1/4 です。"
  },
  {
    category: "ベクトル",
    question: "a⃗ = (2, 3)、b⃗ = (−1, 4) のとき、a⃗ + 2b⃗ は？",
    choices: ["(0, 11)", "(0, 5)", "(1, 7)", "(3, −1)"],
    answer: 1,
    explanation: "(2 + 2·(−1), 3 + 2·4) = (0, 11) です。"
  },
  {
    category: "ベクトル",
    question: "a⃗ = (3, −4) の大きさ |a⃗| は？",
    choices: ["7", "5", "1", "25"],
    answer: 2,
    explanation: "|a⃗| = √(3² + (−4)²) = √25 = 5 です。"
  },
  {
    category: "ベクトル",
    question: "a⃗ = (1, 2)、b⃗ = (3, −1) の内積 a⃗·b⃗ は？",
    choices: ["1", "−1", "5", "7"],
    answer: 1,
    explanation: "1 × 3 + 2 × (−1) = 1 です。"
  },
  {
    category: "ベクトル",
    question: "|a⃗| = 2、|b⃗| = 3、a⃗·b⃗ = 3 のとき、a⃗ と b⃗ のなす角は？",
    choices: ["30°", "120°", "45°", "60°"],
    answer: 4,
    explanation: "cos θ = 3/(2 × 3) = 1/2 なので θ = 60° です。"
  },
  {
    category: "ベクトル",
    question: "a⃗ = (2, x) と b⃗ = (3, 6) が平行になる x の値は？",
    choices: ["1", "4", "−1", "9"],
    answer: 2,
    explanation: "平行条件 2 × 6 − x × 3 = 0 より x = 4 です。"
  },
  {
    category: "ベクトル",
    question: "a⃗ = (2, x) と b⃗ = (3, 6) が垂直になる x の値は？",
    choices: ["1", "−1", "−4", "4"],
    answer: 2,
    explanation: "垂直なら内積が 0。2 × 3 + x × 6 = 0 より x = −1 です。"
  },
  {
    category: "ベクトル",
    question: "△ABC の頂点の位置ベクトルを a⃗, b⃗, c⃗ とするとき、重心 G の位置ベクトルは？",
    choices: ["a⃗ + b⃗ + c⃗", "(a⃗ + b⃗ + c⃗)/2", "(a⃗ + b⃗)/2 + c⃗", "(a⃗ + b⃗ + c⃗)/3"],
    answer: 4,
    explanation: "重心は3頂点の位置ベクトルの平均で (a⃗ + b⃗ + c⃗)/3 です。"
  },
  {
    category: "ベクトル",
    question: "2点 A(a⃗)、B(b⃗) を結ぶ線分 AB を 3 : 1 に内分する点の位置ベクトルは？",
    choices: ["(3a⃗ + b⃗)/4", "(−a⃗ + 3b⃗)/2", "(a⃗ + 3b⃗)/4", "(a⃗ + 3b⃗)/3"],
    answer: 3,
    explanation: "m : n に内分する点は (na⃗ + mb⃗)/(m + n) なので (a⃗ + 3b⃗)/4 です。(−a⃗ + 3b⃗)/2 は外分点です。"
  },
  {
    category: "ベクトル",
    question: "|a⃗| = 3、|b⃗| = 2、a⃗·b⃗ = 1 のとき、|a⃗ + b⃗| は？",
    choices: ["√11", "√13", "5", "√15"],
    answer: 4,
    explanation: "|a⃗ + b⃗|² = |a⃗|² + 2a⃗·b⃗ + |b⃗|² = 9 + 2 + 4 = 15 なので √15 です。"
  },
  {
    category: "ベクトル",
    question: "空間ベクトル a⃗ = (1, 2, 2) の大きさは？",
    choices: ["3", "9", "5", "√5"],
    answer: 1,
    explanation: "√(1 + 4 + 4) = √9 = 3 です。"
  },
  {
    category: "ベクトル",
    question: "空間の2点 A(1, 0, 2)、B(3, 4, −2) を結ぶ線分の中点の座標は？",
    choices: ["(1, 2, −2)", "(4, 4, 0)", "(2, 2, 0)", "(2, 4, 0)"],
    answer: 3,
    explanation: "各座標の平均をとって ((1 + 3)/2, (0 + 4)/2, (2 − 2)/2) = (2, 2, 0) です。"
  },
  {
    category: "ベクトル",
    question: "空間の2点 A(1, 2, 3)、B(4, 6, 3) の間の距離は？",
    choices: ["5", "25", "7", "√7"],
    answer: 1,
    explanation: "√{3² + 4² + 0²} = √25 = 5 です。"
  },
  {
    category: "複素数平面",
    question: "複素数 3 + 4i の絶対値は？",
    choices: ["25", "√7", "7", "5"],
    answer: 4,
    explanation: "|3 + 4i| = √(3² + 4²) = 5 です。"
  },
  {
    category: "複素数平面",
    question: "z = 1 + i を極形式で表すと？（偏角は 0 以上 2π 未満）",
    choices: ["2 (cos π/4 + i sin π/4)", "cos π/4 + i sin π/4", "√2 (cos π/2 + i sin π/2)", "√2 (cos π/4 + i sin π/4)"],
    answer: 4,
    explanation: "|z| = √2、偏角は π/4 なので √2 (cos π/4 + i sin π/4) です。"
  },
  {
    category: "複素数平面",
    question: "(cos π/6 + i sin π/6)⁶ の値は？",
    choices: ["i", "1", "−1", "−i"],
    answer: 3,
    explanation: "ド・モアブルの定理より cos π + i sin π = −1 です。"
  },
  {
    category: "複素数平面",
    question: "複素数平面上で、点 z に i をかけた点 iz は、点 z をどう移動した点？",
    choices: ["原点を中心に −π/2 回転した点", "原点を中心に π 回転した点", "実軸に関して対称移動した点", "原点を中心に π/2 回転した点"],
    answer: 4,
    explanation: "i = cos π/2 + i sin π/2 なので、i をかけると原点のまわりに π/2 回転します。"
  },
  {
    category: "複素数平面",
    question: "複素数 z とその共役複素数 z̄ について、z·z̄ に等しいものは？",
    choices: ["|z|", "2 × (z の実部)", "0", "|z|²"],
    answer: 4,
    explanation: "z = a + bi なら z·z̄ = (a + bi)(a − bi) = a² + b² = |z|² です。"
  },
  {
    category: "平面上の曲線",
    question: "楕円 x²/25 + y²/9 = 1 の焦点の座標は？",
    choices: ["(±√34, 0)", "(±5, 0)", "(0, ±4)", "(±4, 0)"],
    answer: 4,
    explanation: "a² = 25、b² = 9 で横長の楕円。c = √(25 − 9) = 4 なので焦点は (±4, 0) です。"
  },
  {
    category: "平面上の曲線",
    question: "放物線 y² = 8x の焦点の座標は？",
    choices: ["(0, 2)", "(8, 0)", "(2, 0)", "(4, 0)"],
    answer: 3,
    explanation: "y² = 4px と比べて p = 2。焦点は (2, 0)、準線は x = −2 です。"
  },
  {
    category: "平面上の曲線",
    question: "双曲線 x²/9 − y²/16 = 1 の漸近線は？",
    choices: ["y = ±x", "y = ±(3/4)x", "y = ±(16/9)x", "y = ±(4/3)x"],
    answer: 4,
    explanation: "x²/a² − y²/b² = 1 の漸近線は y = ±(b/a)x なので y = ±(4/3)x です。"
  },
  {
    category: "平面上の曲線",
    question: "極座標で (2, π/3) と表される点を直交座標で表すと？",
    choices: ["(1, 2)", "(1, √3)", "(√3, 1)", "(2, √3)"],
    answer: 2,
    explanation: "x = 2 cos(π/3) = 1、y = 2 sin(π/3) = √3 です。"
  },
  // ---- 追加：空間ベクトル 20問・微分・積分 20問 ----
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, −2, 2)、b⃗ = (3, 0, −1) のとき、a⃗ + b⃗ は？",
    choices: ["(2, 2, −3)", "(4, −2, 1)", "(3, 0, −2)", "(4, −2, 3)"],
    answer: 2,
    explanation: "成分ごとにたして (1 + 3, −2 + 0, 2 − 1) = (4, −2, 1) です。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, −2, 2)、b⃗ = (3, 0, −1) のとき、2a⃗ − b⃗ は？",
    choices: ["(1, 4, −5)", "(5, −4, 3)", "(−1, −4, 3)", "(−1, −4, 5)"],
    answer: 4,
    explanation: "2a⃗ = (2, −4, 4) から b⃗ を引いて (2 − 3, −4 − 0, 4 + 1) = (−1, −4, 5) です。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, −2, 2)、b⃗ = (3, 0, −1) の内積 a⃗·b⃗ は？",
    choices: ["3", "5", "1", "−1"],
    answer: 3,
    explanation: "1 × 3 + (−2) × 0 + 2 × (−1) = 3 + 0 − 2 = 1 です。"
  },
  {
    category: "空間ベクトル",
    question: "b⃗ = (3, 0, −1) の大きさ |b⃗| は？",
    choices: ["√8", "4", "10", "√10"],
    answer: 4,
    explanation: "|b⃗| = √(3² + 0² + (−1)²) = √10 です。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, 1, 0)、b⃗ = (1, 0, 1) のなす角は？",
    choices: ["30°", "45°", "60°", "90°"],
    answer: 3,
    explanation: "a⃗·b⃗ = 1、|a⃗| = |b⃗| = √2 なので cos θ = 1/2。θ = 60° です。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (2, −1, 3) と b⃗ = (x, 4, 2) が垂直になる x の値は？",
    choices: ["5", "−1", "1", "−5"],
    answer: 2,
    explanation: "垂直なら内積が 0。2x − 4 + 6 = 0 より x = −1 です。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, 2, −1) と b⃗ = (2, x, y) が平行になる x, y の値は？",
    choices: ["x = 4, y = 2", "x = 1, y = −1/2", "x = −4, y = 2", "x = 4, y = −2"],
    answer: 4,
    explanation: "b⃗ = ka⃗ とおくと、x成分から k = 2。よって x = 2 × 2 = 4、y = 2 × (−1) = −2 です。"
  },
  {
    category: "空間ベクトル",
    question: "2点 A(1, 2, 3)、B(3, −2, 7) について、|AB⃗| は？",
    choices: ["36", "6", "4", "2√6"],
    answer: 2,
    explanation: "AB⃗ = (2, −4, 4) なので |AB⃗| = √(4 + 16 + 16) = √36 = 6 です。"
  },
  {
    category: "空間ベクトル",
    question: "2点 A(2, 0, 4)、B(6, 4, 0) を結ぶ線分 AB を 1 : 3 に内分する点の座標は？",
    choices: ["(3, 1, 3)", "(4, 2, 2)", "(0, −2, 6)", "(5, 3, 1)"],
    answer: 1,
    explanation: "(3A + 1B)/4 = ((6 + 6)/4, (0 + 4)/4, (12 + 0)/4) = (3, 1, 3) です。(0, −2, 6) は 1 : 3 に外分する点です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 A(1, 0, 0)、B(0, 2, 0)、C(0, 0, 3) を頂点とする △ABC の重心の座標は？",
    choices: ["(1, 2, 3)", "(1/3, 1/3, 1/3)", "(1/2, 1, 3/2)", "(1/3, 2/3, 1)"],
    answer: 4,
    explanation: "3頂点の座標の平均をとって ((1 + 0 + 0)/3, (0 + 2 + 0)/3, (0 + 0 + 3)/3) = (1/3, 2/3, 1) です。"
  },
  {
    category: "空間ベクトル",
    question: "点 (2, −3, 5) と xy平面に関して対称な点の座標は？",
    choices: ["(2, −3, −5)", "(2, 3, 5)", "(−2, 3, −5)", "(−2, 3, 5)"],
    answer: 1,
    explanation: "xy平面に関して対称移動すると、z座標だけ符号が変わります。"
  },
  {
    category: "空間ベクトル",
    question: "点 P(1, 2, 3) と yz平面との距離は？",
    choices: ["3", "√14", "1", "2"],
    answer: 3,
    explanation: "yz平面は x = 0 の平面なので、距離は x座標の絶対値 1 です。"
  },
  {
    category: "空間ベクトル",
    question: "中心 (1, −2, 3)、半径 4 の球面の方程式は？",
    choices: ["(x − 1)² + (y + 2)² + (z − 3)² = 8", "(x − 1)² + (y + 2)² + (z − 3)² = 4", "(x + 1)² + (y − 2)² + (z + 3)² = 16", "(x − 1)² + (y + 2)² + (z − 3)² = 16"],
    answer: 4,
    explanation: "中心 (a, b, c)、半径 r の球面は (x − a)² + (y − b)² + (z − c)² = r² です。"
  },
  {
    category: "空間ベクトル",
    question: "球面 x² + y² + z² − 2x + 4y − 6z = 0 の中心と半径は？",
    choices: ["中心 (1, −2, 3)、半径 √14", "中心 (1, −2, 3)、半径 2", "中心 (1, −2, 3)、半径 14", "中心 (−1, 2, −3)、半径 √14"],
    answer: 1,
    explanation: "平方完成すると (x − 1)² + (y + 2)² + (z − 3)² = 1 + 4 + 9 = 14 なので、中心 (1, −2, 3)、半径 √14 です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 A(1, 0, 0)、B(0, 1, 0)、C(0, 0, 1) を頂点とする △ABC の面積は？",
    choices: ["1/2", "√2", "√3", "√3/2"],
    answer: 4,
    explanation: "AB⃗ = (−1, 1, 0)、AC⃗ = (−1, 0, 1) より S = (1/2)√(|AB⃗|²|AC⃗|² − (AB⃗·AC⃗)²) = (1/2)√(4 − 1) = √3/2 です。1辺 √2 の正三角形と考えても同じです。"
  },
  {
    category: "空間ベクトル",
    question: "a⃗ = (1, 0, 1)、b⃗ = (0, 1, 1) の両方に垂直な単位ベクトルは？",
    choices: ["±(1/√3)(1, 1, 1)", "(1, 1, −1)", "±(1/√3)(1, 1, −1)", "±(1/√2)(1, −1, 0)"],
    answer: 3,
    explanation: "求めるベクトルを (x, y, z) とすると x + z = 0、y + z = 0。(1, 1, −1) の向きで、大きさを 1 にすると ±(1/√3)(1, 1, −1) です。"
  },
  {
    category: "空間ベクトル",
    question: "3点 A(1, 2, 3)、B(2, 4, 5)、C(x, 8, y) が一直線上にあるとき、x, y の値は？",
    choices: ["x = 4, y = 6", "x = 3, y = 9", "x = 3, y = 6", "x = 4, y = 9"],
    answer: 4,
    explanation: "AC⃗ = kAB⃗ となる。AB⃗ = (1, 2, 2)、AC⃗ = (x − 1, 6, y − 3) の y成分から k = 3。x − 1 = 3、y − 3 = 6 より x = 4、y = 9 です。"
  },
  {
    category: "空間ベクトル",
    question: "|a⃗| = 2、|b⃗| = 3、|a⃗ − b⃗| = √7 のとき、内積 a⃗·b⃗ は？",
    choices: ["3", "6", "−3", "3/2"],
    answer: 1,
    explanation: "|a⃗ − b⃗|² = |a⃗|² − 2a⃗·b⃗ + |b⃗|² より 7 = 4 − 2a⃗·b⃗ + 9。よって a⃗·b⃗ = 3 です。"
  },
  {
    category: "空間ベクトル",
    question: "四面体 OABC で OA⃗ = a⃗、OB⃗ = b⃗、OC⃗ = c⃗ とする。辺 AB の中点を M、辺 OC の中点を N とするとき、MN⃗ は？",
    choices: ["(−a⃗ + b⃗ + c⃗)/2", "(a⃗ + b⃗ + c⃗)/2", "(a⃗ + b⃗ − c⃗)/2", "(−a⃗ − b⃗ + c⃗)/2"],
    answer: 4,
    explanation: "MN⃗ = ON⃗ − OM⃗ = c⃗/2 − (a⃗ + b⃗)/2 = (−a⃗ − b⃗ + c⃗)/2 です。"
  },
  {
    category: "空間ベクトル",
    question: "原点 O と A(1, 2, 2) を通る直線に、点 B(2, 1, 4) から垂線を下ろす。垂線の足 H の座標は？",
    choices: ["(1, 2, 2)", "(2, 4, 4)", "(2/3, 4/3, 4/3)", "(4/3, 8/3, 8/3)"],
    answer: 4,
    explanation: "OH⃗ = t OA⃗ とおき、BH⃗·OA⃗ = 0 から 9t − 12 = 0、t = 4/3。H(4/3, 8/3, 8/3) です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = (2x − 1)(x + 3) の導関数 f′(x) は？",
    choices: ["4x + 5", "4x + 3", "2x + 5", "4x − 5"],
    answer: 1,
    explanation: "展開すると f(x) = 2x² + 5x − 3 なので f′(x) = 4x + 5 です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = 2x³ − x² + 4 のとき、f′(2) の値は？",
    choices: ["16", "20", "24", "12"],
    answer: 2,
    explanation: "f′(x) = 6x² − 2x なので f′(2) = 24 − 4 = 20 です。"
  },
  {
    category: "微分・積分",
    question: "lim(h→0) {f(a + h) − f(a)}/h は何を表す？",
    choices: ["f′(a + h)", "f′(a)", "f(a)", "0"],
    answer: 2,
    explanation: "x = a における微分係数 f′(a) の定義です。グラフ上では x = a での接線の傾きを表します。"
  },
  {
    category: "微分・積分",
    question: "曲線 y = x³ − 2x 上の点 (1, −1) における接線の方程式は？",
    choices: ["y = 3x − 4", "y = x", "y = x − 2", "y = −x"],
    answer: 3,
    explanation: "y′ = 3x² − 2 より、x = 1 での傾きは 1。y + 1 = 1·(x − 1) なので y = x − 2 です。"
  },
  {
    category: "微分・積分",
    question: "点 (1, −3) から放物線 y = x² に引いた接線の、接点の x座標は？",
    choices: ["x = 3, 1", "x = 1, −3", "x = −3, 1", "x = 3, −1"],
    answer: 4,
    explanation: "接点を (t, t²) とすると接線は y = 2tx − t²。(1, −3) を通るので −3 = 2t − t²、t² − 2t − 3 = 0 より t = 3, −1 です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ − 3x² が減少する x の範囲は？",
    choices: ["0 < x < 2", "0 < x < 3", "−2 < x < 0", "x < 0, 2 < x"],
    answer: 1,
    explanation: "f′(x) = 3x² − 6x = 3x(x − 2) < 0 となるのは 0 < x < 2 です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = −x³ + 3x + 1 の極小値は？",
    choices: ["1", "−1", "−3", "3"],
    answer: 2,
    explanation: "f′(x) = −3(x + 1)(x − 1)。x = −1 で極小となり f(−1) = 1 − 3 + 1 = −1 です（x = 1 で極大値 3）。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ + ax + 2 が x = 1 で極値をとるとき、a の値は？",
    choices: ["−3", "3", "−1", "1"],
    answer: 1,
    explanation: "f′(x) = 3x² + a。f′(1) = 3 + a = 0 より a = −3。このとき f′(x) = 3(x + 1)(x − 1) で、x = 1 の前後で符号が変わるので確かに極値をとります。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ − 3x + k の極大値が 5 となるとき、k の値は？",
    choices: ["3", "1", "5", "7"],
    answer: 1,
    explanation: "f′(x) = 3(x + 1)(x − 1)。x = −1 で極大となり f(−1) = 2 + k = 5、よって k = 3 です。"
  },
  {
    category: "微分・積分",
    question: "0 ≦ x ≦ 3 における f(x) = x³ − 3x² + 1 の最大値は？",
    choices: ["1", "−3", "3", "0"],
    answer: 1,
    explanation: "f′(x) = 3x(x − 2)。f(0) = 1、f(2) = −3（極小）、f(3) = 1 なので、最大値は 1（x = 0, 3 のとき）です。"
  },
  {
    category: "微分・積分",
    question: "f(x) = x³ + ax² + 3x が極値をもつような a の範囲は？",
    choices: ["a < −3, 3 < a", "−3 < a < 3", "a ≦ −3, 3 ≦ a", "a > 3"],
    answer: 1,
    explanation: "f′(x) = 3x² + 2ax + 3 = 0 が異なる2つの実数解をもてばよい。D/4 = a² − 9 > 0 より a < −3, 3 < a です。"
  },
  {
    category: "微分・積分",
    question: "真上に投げたボールの t 秒後の高さが h = 20t − 5t² (m) のとき、最高点の高さは？",
    choices: ["15 m", "20 m", "40 m", "10 m"],
    answer: 2,
    explanation: "h′ = 20 − 10t = 0 となる t = 2 で最高点。h = 40 − 20 = 20 m です。"
  },
  {
    category: "微分・積分",
    question: "真上に投げたボールの t 秒後の高さが h = 20t − 5t² (m) のとき、1 秒後の瞬間の速さは？",
    choices: ["10 m/秒", "20 m/秒", "5 m/秒", "15 m/秒"],
    answer: 1,
    explanation: "速さは h を t で微分した h′ = 20 − 10t。t = 1 を代入して 10 m/秒です。"
  },
  {
    category: "微分・積分",
    question: "方程式 x³ − 3x + 1 = 0 の異なる実数解の個数は？",
    choices: ["1個", "0個", "3個", "2個"],
    answer: 3,
    explanation: "f(x) = x³ − 3x + 1 の極大値 f(−1) = 3 > 0、極小値 f(1) = −1 < 0 なので、グラフは x軸と3点で交わります。"
  },
  {
    category: "微分・積分",
    question: "∫(x − 1)² dx を求めると？（C は積分定数）",
    choices: ["x³/3 − x² + x + C", "2(x − 1) + C", "x³/3 − x + C", "x³ − 2x² + x + C"],
    answer: 1,
    explanation: "(x − 1)² = x² − 2x + 1 を積分して x³/3 − x² + x + C です。"
  },
  {
    category: "微分・積分",
    question: "F′(x) = 3x² − 4x、F(1) = 2 を満たす関数 F(x) は？",
    choices: ["F(x) = x³ − 2x² + 2", "F(x) = x³ − 2x² + 3", "F(x) = 6x − 4", "F(x) = x³ − 2x² + 1"],
    answer: 2,
    explanation: "F(x) = x³ − 2x² + C。F(1) = −1 + C = 2 より C = 3 です。"
  },
  {
    category: "微分・積分",
    question: "∫₁³ (2x − 1) dx の値は？",
    choices: ["4", "8", "10", "6"],
    answer: 4,
    explanation: "[x² − x]₁³ = (9 − 3) − (1 − 1) = 6 です。"
  },
  {
    category: "微分・積分",
    question: "∫₋₂² (x³ − 4x + 3) dx の値は？",
    choices: ["6", "24", "12", "0"],
    answer: 3,
    explanation: "x³ と −4x は奇関数なので −2 から 2 までの積分は 0。残りは ∫₋₂² 3 dx = 3 × 4 = 12 です。"
  },
  {
    category: "微分・積分",
    question: "放物線 y = −x² + 4 と x軸で囲まれた部分の面積は？",
    choices: ["8", "16/3", "64/3", "32/3"],
    answer: 4,
    explanation: "交点は x = ±2。∫₋₂² (4 − x²) dx = 16 − 16/3 = 32/3 です。"
  },
  {
    category: "微分・積分",
    question: "放物線 y = x² − 1 と直線 y = x + 1 で囲まれた部分の面積は？",
    choices: ["3", "9/2", "9", "27/2"],
    answer: 2,
    explanation: "交点は x² − x − 2 = 0 より x = −1, 2。∫₋₁² {(x + 1) − (x² − 1)} dx = (2 − (−1))³/6 = 9/2 です。"
  }
];
