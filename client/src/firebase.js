// Import Firebase functions individually
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfKWcv9ZYUJazu_w83FvtY9PR718V59H8",
  authDomain: "clone-b74be.firebaseapp.com",
  projectId: "clone-b74be",
  storageBucket: "clone-b74be.appspot.com",
  messagingSenderId: "26762841413",
  appId: "1:26762841413:web:d227b20a6ecc89ddb6422c",
  measurementId: "G-0X7GSET6BP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
