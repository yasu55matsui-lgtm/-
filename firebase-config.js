// =============================================================
//  Firebase の設定（Firebase コンソール → プロジェクトの設定 → マイアプリ に表示される値）
//  この値は公開しても問題ない設定値です。誰が何を書き込めるかは firestore.rules で制限しています。
//  null にすると、共有機能なし（この端末だけ）のモードで動きます。
// =============================================================
export const firebaseConfig = {
  apiKey: "AIzaSyCuMtzd4wEpVSo5rMIWRzOTeQGvHVSKt4I",
  authDomain: "math-quiz-64b35.firebaseapp.com",
  projectId: "math-quiz-64b35",
  storageBucket: "math-quiz-64b35.firebasestorage.app",
  messagingSenderId: "588451647727",
  appId: "1:588451647727:web:ca9dec3f4ffe0412438b1a"
};

// 先生の投稿に表示する名前
export const TEACHER_NAME = "野球好きな数学教師";
