import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebase.js";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      console.log(querySnapshot);
    });
  }, []);

  return <div className="App"></div>;
}

export default App;
