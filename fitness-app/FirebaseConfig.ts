// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" 
import {getFirestore} from "firebase/firestore"
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUiTxpZnoNmzZbfodyE4-FilWZ5HoKerU",
  authDomain: "fitness-app-b433f.firebaseapp.com",
  projectId: "fitness-app-b433f",
  storageBucket: "fitness-app-b433f.firebasestorage.app",
  messagingSenderId: "631674557228",
  appId: "1:631674557228:web:255a52646ed366b09f5289",
  measurementId: "G-LWF9H1DMSF"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FIREBASE_DB = getFirestore(FIREBASE_APP);