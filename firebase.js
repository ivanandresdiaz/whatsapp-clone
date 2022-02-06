// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5XdzIv2b-p2L1wlIsmB27RvyvP4nd3Pk",
  authDomain: "whatsap-clone-8a11e.firebaseapp.com",
  projectId: "whatsap-clone-8a11e",
  storageBucket: "whatsap-clone-8a11e.appspot.com",
  messagingSenderId: "452494865952",
  appId: "1:452494865952:web:90b7b52b9c98393dee6e45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
