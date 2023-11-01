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
export const auth = getAuth(app);

export async function authCreateAccountWithEmail(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function authSignInWithEmail(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error.message);
    });
}
