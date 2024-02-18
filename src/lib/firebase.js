import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNFI5OlfPHx1mma6JF6dSx67QInDtAlMk",
  authDomain: "user-authentication-prac-2cf6a.firebaseapp.com",
  projectId: "user-authentication-prac-2cf6a",
  storageBucket: "user-authentication-prac-2cf6a.appspot.com",
  messagingSenderId: "616924309707",
  appId: "1:616924309707:web:0a65d4ebc072015deb534e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);