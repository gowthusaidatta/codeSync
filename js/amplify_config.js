// Firebase v9 Modular SDK

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ✅ Your Firebase project config (DO NOT expose in production)
const firebaseConfig = {
  apiKey: "AIzaSyCDGxsS1CNVRF3wpg1eqkHfb6YVMibXOzk",
  authDomain: "codesync-open.firebaseapp.com",
  projectId: "codesync-open",
  storageBucket: "codesync-open.appspot.com",
  messagingSenderId: "664480055141",
  appId: "1:664480055141:web:xxxxxxxxxxxxxxxx"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Login handler (call from button click)
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ✅ Observe user state
export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}

// ✅ Logout function
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
