import { initializeApp } from "firebase/app";
import {User, getAuth} from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlNWc5LbtTRfBR5peAM8ocRgEUHmebexQ",
  authDomain: "simplechat-8eab3.firebaseapp.com",
  projectId: "simplechat-8eab3",
  storageBucket: "simplechat-8eab3.appspot.com",
  messagingSenderId: "389823883382",
  appId: "1:389823883382:web:aa7f504431bfa244ab5757"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(firebaseApp);

export const createUserDocument = async (user: User) => {
  const { displayName, email, uid,phoneNumber,photoURL } = user;
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        phoneNumber,
        photoURL,
        createdAt: new Date(),
      });
      console.log("Document set");
    } catch (error) {
      console.log("Could not set the Document: ", error);
    }
  }else{
    console.log("Something went wrong")
  }
};