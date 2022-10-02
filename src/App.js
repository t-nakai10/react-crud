import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebase.js";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // コレクションを参照.
    const usersCollectionRef = collection(db, "users");
    // getDocs でクエリを実行し、一つづつ取り出す.
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
