import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);


  const handleSelect = async (user) => {
    console.log("user", user);
    setUsername(user.displayName);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const colRef = collection(db, "users");
      const docsSnap = await getDocs(colRef);
      const allUsers = [];
      docsSnap.forEach((doc) => {
        allUsers.push(doc.data());
      });
      setAllUsers(allUsers);
    };
    fetchUsers();
  }, []);
  return (
    <div className="search">
      {allUsers &&
        allUsers.filter((user) => user.uid !== currentUser.uid).map((user) => (
          <div
            className="userChat"
            onClick={() => {
              handleSelect(user);
            }}
          >
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
