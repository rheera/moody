import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUJEYf31pyGFifSmAhsTSyZBs_9SOJb5Y",
  authDomain: "moody-dcadc.firebaseapp.com",
  projectId: "moody-dcadc",
  storageBucket: "moody-dcadc.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
