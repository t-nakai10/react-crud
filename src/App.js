import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebase.js";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.forEach((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  return <div className="App"></div>;
}

export default App;
