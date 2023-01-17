// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdSwA2yTnAICg2IqyEKR0RV_MWJMWlk-Q",
  authDomain: "ahmed-subhy.firebaseapp.com",
  projectId: "ahmed-subhy",
  storageBucket: "ahmed-subhy.appspot.com",
  messagingSenderId: "459044399263",
  appId: "1:459044399263:web:6ee4535a68f8133c97daaa",
  measurementId: "G-M16DLBB38S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
