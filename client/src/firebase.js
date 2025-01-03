// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBfKWcv9ZYUJazu_w83FvtY9PR718V59H8",
    authDomain: "clone-b74be.firebaseapp.com",
    projectId: "clone-b74be",
    storageBucket: "clone-b74be.appspot.com",
    messagingSenderId: "26762841413",
    appId: "1:26762841413:web:d227b20a6ecc89ddb6422c",
    measurementId: "G-0X7GSET6BP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };