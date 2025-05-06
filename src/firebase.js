// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config copied from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyDN0MB6BTO5wuv8I_TtUlCw80w66rybsOg",
    authDomain: "food-order-via-qr.firebaseapp.com",
    projectId: "food-order-via-qr",
    storageBucket: "food-order-via-qr.firebasestorage.app",
    messagingSenderId: "379962427721",
    appId: "1:379962427721:web:c833705199f39e0a1e7298",
    measurementId: "G-MXT0HDWZT0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
