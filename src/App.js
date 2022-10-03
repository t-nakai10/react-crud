import { collection, getDocs, onSnapshot } from "firebase/firestore";
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

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label for="name">名前</label>
          <input type="text" name="name" placeholder="名前" />
        </div>
        <div>
          <label for="email">メールアドレス</label>
          <input type="email" name="email" placeholder="メールアドレス" />
        </div>
      </form>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;
