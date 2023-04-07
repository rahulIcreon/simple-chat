import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlNWc5LbtTRfBR5peAM8ocRgEUHmebexQ",
  authDomain: "simplechat-8eab3.firebaseapp.com",
  projectId: "simplechat-8eab3",
  storageBucket: "simplechat-8eab3.appspot.com",
  messagingSenderId: "389823883382",
  appId: "1:389823883382:web:aa7f504431bfa244ab5757"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth()