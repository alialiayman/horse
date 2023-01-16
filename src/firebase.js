// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLu3DrgsiI_N7PSZy5T3NOpEtnhC-EkwA",
  authDomain: "horse-elephant.firebaseapp.com",
  projectId: "horse-elephant",
  storageBucket: "horse-elephant.appspot.com",
  messagingSenderId: "195493246734",
  appId: "1:195493246734:web:0515d62d6871b419d5495f",
  measurementId: "G-829LWX643Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
