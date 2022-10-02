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
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;
