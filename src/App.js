import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebase.js";

function App() {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    // コレクションを参照.
    const usersCollectionRef = collection(db, "users");
    // onSnapshot でクエリを実行し、リアルタイムで更新を行う.
    // 更新を検知するためイベントリスナの登録が行われているため, 返却されるのは Unsubscribe.
    onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    const userCollectionRef = doc(collection(db, "users"));
    await setDoc(userCollectionRef, {
      name: name.value,
      email: email.value,
      timestamp: serverTimestamp(),
    });
  };

  const deleteUser = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await deleteDoc(userDocumentRef);
  };

  const deleteUserSameName = async (name) => {
    const userCollectionRef = collection(db, "users");
    // 名前が同じものに限定.
    const q = query(userCollectionRef, where("name", "==", name));
    // 実行.
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      // id を指定し特定のドキュメントのみ参照.
      const userDocumentRef = doc(db, "users", document.id);
      await deleteDoc(userDocumentRef);
    });
  };

  const changeEmail = async (e, id) => {
    e.preventDefault();
    const usersDocumentRef = doc(db, "users", id);
    await updateDoc(usersDocumentRef, {
      email: newEmail,
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">名前</label>
          <input type="text" name="name" placeholder="名前" />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" name="email" placeholder="メールアドレス" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <p>名前: {user.name}</p>
          <p>メール: {user.email}</p>
          {/* 引数を持たす場合コールバックにする必要がある? */}
          <button onClick={() => deleteUser(user.id)}>削除</button>
          <button onClick={() => deleteUserSameName(user.name)}>
            同じ名前のユーザーを削除
          </button>
          <form onSubmit={(e) => changeEmail(e, user.id)}>
            <input
              type="text"
              placeholder="メールアドレスを変更"
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
