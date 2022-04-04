import firebase from "firebase";
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBG3Upp7-IGpf9BY8cq6VVnNaHZDjRc8FM",
  authDomain: "chat-app-f37f0.firebaseapp.com",
  projectId: "chat-app-f37f0",
  storageBucket: "chat-app-f37f0.appspot.com",
  messagingSenderId: "632588444334",
  appId: "1:632588444334:web:66e1070d880efef5f3033f",
  measurementId: "G-0545R51Q78"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }
export default firebase
