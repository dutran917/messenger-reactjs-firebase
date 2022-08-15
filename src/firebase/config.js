import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEQuOhGu-QVVCEujIf1iXilJpQVZsUtPA",
  authDomain: "mess-6c8b6.firebaseapp.com",
  projectId: "mess-6c8b6",
  storageBucket: "mess-6c8b6.appspot.com",
  messagingSenderId: "1079694548124",
  appId: "1:1079694548124:web:270a48c9082b87587be159",
  measurementId: "G-N8FDH6G2WH",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
