// =============================================================
//  Firebase の設定
//  Firebase コンソール → プロジェクトの設定 → マイアプリ（ウェブ）に表示される
//  firebaseConfig の中身を、下の null の代わりに貼り付けてください。
//  （この値は公開しても問題ない設定値です。アクセス制御は firestore.rules で行います）
//
//  null のままでも、問題を解く機能と自分の成績（この端末だけ）は使えます。
// =============================================================
export const firebaseConfig = null;

/* 例：
export const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "math-quiz-xxxx.firebaseapp.com",
  projectId: "math-quiz-xxxx",
  storageBucket: "math-quiz-xxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
*/

// 先生の投稿に表示する名前
export const TEACHER_NAME = "野球好きな数学教師";
