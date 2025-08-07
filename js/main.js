// js/main.js

import { auth } from "./amplify_config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Get form elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// --- Login Logic ---
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login successful:", user.email);
      // Redirect to usernames.html after login
      window.location.href = "usernames.html";
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  });
}

// --- Signup Logic ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Signup successful:", user.email);
      // Redirect to usernames.html after signup
      window.location.href = "usernames.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
      console.error("Signup error:", error);
    }
  });
}
