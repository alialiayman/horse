// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh8plKzcl4ipVixIK9xP1yGyPefCu5Gog",
  authDomain: "horse2023-1.firebaseapp.com",
  projectId: "horse2023-1",
  storageBucket: "horse2023-1.appspot.com",
  messagingSenderId: "293350384853",
  appId: "1:293350384853:web:2bb146bc8ddc3d71f0ae5c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
