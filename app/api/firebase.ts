import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUJEYf31pyGFifSmAhsTSyZBs_9SOJb5Y",
  authDomain: "moody-dcadc.firebaseapp.com",
  projectId: "moody-dcadc",
  storageBucket: "moody-dcadc.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function authCreateAccountWithEmail(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      console.error(error.message);
    });
}

export function authSignInWithEmail(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("logged in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error.message);
    });
}
