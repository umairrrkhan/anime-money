// Firebase Configuration for Anime Wings
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

// Export the functions we need from Firebase
export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';

export {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBs2mcKhzkuDloKxg7OdSo4sbyybF6L_ao",
    authDomain: "home-2098c.firebaseapp.com",
    projectId: "home-2098c",
    storageBucket: "home-2098c.firebasestorage.app",
    messagingSenderId: "708797124984",
    appId: "1:708797124984:web:a5c490250ab9446021b88d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };