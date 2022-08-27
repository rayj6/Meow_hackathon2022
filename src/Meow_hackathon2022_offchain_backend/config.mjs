// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, getDocs, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO_evdroJzQSpbjEqcxf4JYf3LNrIiriQ",
  authDomain: "hackathon-33918.firebaseapp.com",
  projectId: "hackathon-33918",
  storageBucket: "hackathon-33918.appspot.com",
  messagingSenderId: "209606575067",
  appId: "1:209606575067:web:7afe9c0ef5b9e37d0b1dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export {db, auth, database};