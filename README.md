# React CRUD

## 初期設定

### 環境変数

env を作成し
env.local に認証情報を設定する

```env.local
REACT_APP_APIKEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING=
REACT_APP_APP_ID=
```

### firebase 接続

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;
```

### jsconfig.json

- `import` を絶対パスで記述できるようにする

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src/*.js", "src/*.jsx"]
}
```

## CRUD 処理

### 作成

- `addDoc(コレクション参照, {データ})`

```js
const collectionRef = collection(db, "users");
const DocRef = await addDoc(collectionRef, {
  hoge: hoge,
  huga: huga,
});
```

- `setDoc(コレクション参照, {データ})`
  - addDoc だと簡単にできたが、setDoc はやや面倒
  - **ただし、追加したときの ID を取得することができる。**

```js
const documentRef = doc(collection(db, "users"));
// ドキュメントの参照を渡す必要がある.
await setDoc(documentRef, {
  hoge: hoge,
  huga: huga,
});
// IDは下記の通り.
const id = documentRef.id;
```

### 更新

- `updateDoc(ドキュメントの参照, {データ})`

```js
const documentRef = doc(db, "users", id);
await updateDoc(documentRef, {
  hoge: huga,
});
```

### 削除

- `deleteDoc(対象のドキュメント参照)`

```js
// doc を使用して id を指定し特定の users ドキュメントを参照
const documentRef = doc(db, "users", id);
// deleteDoc を使用して削除
await deleteDoc(documentRef);
```

- `query(ドキュメント参照, 条件, 値)` を使用して一括削除 ver

```js
// name が同じものを一括で削除してみる.
const deleteBulk = async (name) => {
  const usersRef = collection(db, "users");
  // 名前が同じものに限定.
  const q = query(usersRef, "==", name);
  // 実行
  const querySnapshot = getDoc(q);

  querySnapshot.forEach(async (document) => {
    // id を指定し特定のドキュメントのみ参照
    const userRef = doc(db, "users", document.id);
    await deleteDoc(userRef);
  });
};
```

## event から値を取得する

- 単体

```js
<input onChange={(e) => setNewEmail(e.target.value)} />
```

- 複数

```js
const { hoge, huga } = e.target.elements;
```
