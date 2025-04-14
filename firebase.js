// firebase/index.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5ReIwel6soo1uIWWRvAIdIubZQKnbjfc",
    authDomain: "zappcart-control-panel.firebaseapp.com",
    projectId: "zappcart-control-panel",
    storageBucket: "zappcart-control-panel.firebasestorage.app",
    messagingSenderId: "553907813502",
    appId: "1:553907813502:web:a02da34d9d47af8c0cac2f",
    measurementId: "G-G1HDHNE57E",
    databaseURL: "https://zappcart-control-panel-default-rtdb.firebaseio.com" // Add your database URL here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Storage instance (for images)
const storage = getStorage(app);

// Get Realtime Database instance (for banner content data)
const database = getDatabase(app);

export { storage, database, app };