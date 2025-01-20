// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwcYr3cBtdGTNh-1k2G59ILTZ8SobHNdw",
  authDomain: "ai-travel-planner-b2428.firebaseapp.com",
  projectId: "ai-travel-planner-b2428",
  storageBucket: "ai-travel-planner-b2428.firebasestorage.app",
  messagingSenderId: "1068424827584",
  appId: "1:1068424827584:web:c5c85c8b6b91f5eb179325",
  measurementId: "G-ZVCHJVFWD4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)