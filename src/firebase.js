// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXRjrxUFWOJiwQ9hcBlpWCYzOz-xUhwt8",
  authDomain: "asm-elephant.firebaseapp.com",
  projectId: "asm-elephant",
  storageBucket: "asm-elephant.appspot.com",
  messagingSenderId: "881098966452",
  appId: "1:881098966452:web:0c41ee18ebfe02ff401ee1",
  measurementId: "G-JF6LNKEGXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
