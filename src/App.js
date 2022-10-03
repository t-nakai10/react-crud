import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebase.js";

function App() {
  const [users, setUsers] = useState([]);

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
        </div>
      ))}
    </div>
  );
}

export default App;
