// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFsaILmmuOOdvNywnNnBGMmnOkeFW0aEo",
  authDomain: "npk-values-4a297.firebaseapp.com",
  databaseURL: "https://npk-values-4a297-default-rtdb.firebaseio.com",
  projectId: "npk-values-4a297",
  storageBucket: "npk-values-4a297.firebasestorage.app",
  messagingSenderId: "767366753983",
  appId: "1:767366753983:web:8754c232555ee786d6a00a",
  measurementId: "G-50PHBHYNFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);