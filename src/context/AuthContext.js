// src/context/AuthContext.js
//
// Shared auth state for the app. Wrap your app root (e.g. in App.js) with
// <AuthProvider> so any component can call useAuth() to read the current
// user or trigger sign-in/sign-out.

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // --- Email / password -----------------------------------------------

  function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // --- Phone / OTP -------------------------------------------------------
  // Firebase phone auth requires an invisible (or visible) reCAPTCHA bound
  // to a DOM node before sending the OTP. `containerId` should match an
  // element that exists on the page (see LoginPage.jsx).

  function setupRecaptcha(containerId) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
      });
    }
    return window.recaptchaVerifier;
  }

  function sendOtp(phoneNumber, containerId) {
    const verifier = setupRecaptcha(containerId);
    return signInWithPhoneNumber(auth, phoneNumber, verifier);
  }

  // confirmationResult comes from the resolved promise of sendOtp()
  function confirmOtp(confirmationResult, code) {
    return confirmationResult.confirm(code);
  }

  function logout() {
    return firebaseSignOut(auth);
  }

  const value = {
    currentUser,
    authLoading,
    loginWithEmail,
    registerWithEmail,
    sendOtp,
    confirmOtp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
