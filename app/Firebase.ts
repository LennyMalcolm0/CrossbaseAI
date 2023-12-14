import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUi5aPoyq-LeHnajlrRWf38RfDsWuugGc",
  authDomain: "expressjs-fb8d1.firebaseapp.com",
  projectId: "expressjs-fb8d1",
  storageBucket: "expressjs-fb8d1.appspot.com",
  messagingSenderId: "41100849454",
  appId: "1:41100849454:web:9aee5d442df159d7648abf",
  measurementId: "G-0JGF6FYJ3L"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();