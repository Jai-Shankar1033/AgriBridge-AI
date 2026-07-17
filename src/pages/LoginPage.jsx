// src/pages/LoginPage.jsx
//
// AgriBridge AI — Login page.
// Supports two sign-in methods via Firebase Authentication:
//   1. Email + password
//   2. Phone number + OTP
//
// Requires: `firebase` package (npm install firebase), AuthProvider
// mounted above this route (see src/context/AuthContext.js), and
// Firebase env vars set (see .env.example).

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

export default function LoginPage() {
  const { loginWithEmail, sendOtp, confirmOtp } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState("email"); // "email" | "phone"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email/password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone/OTP state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  async function handleEmailLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await sendOtp(phone, RECAPTCHA_CONTAINER_ID);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await confirmOtp(confirmationResult, otp);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  function switchMethod(next) {
    setMethod(next);
    setError("");
    setOtpSent(false);
    setOtp("");
    setConfirmationResult(null);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">🌾</span>
          <h1>AgriBridge AI</h1>
          <p className="login-subtitle">Sign in to your farm dashboard</p>
        </div>

        <div className="login-tabs" role="tablist" aria-label="Sign-in method">
          <button
            type="button"
            role="tab"
            aria-selected={method === "email"}
            className={method === "email" ? "login-tab active" : "login-tab"}
            onClick={() => switchMethod("email")}
          >
            Email
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === "phone"}
            className={method === "phone" ? "login-tab active" : "login-tab"}
            onClick={() => switchMethod("phone")}
          >
            Phone
          </button>
        </div>

        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        {method === "email" && (
          <form onSubmit={handleEmailLogin} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}

        {method === "phone" && !otpSent && (
          <form onSubmit={handleSendOtp} className="login-form">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <p className="login-hint">
              Include your country code, e.g. +91 for India.
            </p>

            {/* Firebase binds its invisible reCAPTCHA to this element */}
            <div id={RECAPTCHA_CONTAINER_ID} />

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Sending code…" : "Send OTP"}
            </button>
          </form>
        )}

        {method === "phone" && otpSent && (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <label htmlFor="otp">Enter the 6-digit code</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="login-hint">
              Sent to {phone}.{" "}
              <button
                type="button"
                className="login-link-button"
                onClick={() => setOtpSent(false)}
              >
                Change number
              </button>
            </p>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Verifying…" : "Verify and sign in"}
            </button>
          </form>
        )}

        <p className="login-footer">
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

// Maps common Firebase auth error codes to farmer-friendly messages.
function friendlyError(err) {
  const code = err?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/invalid-phone-number":
      return "That phone number doesn't look right. Include your country code.";
    case "auth/invalid-verification-code":
      return "That code doesn't match. Please check and try again.";
    case "auth/code-expired":
      return "That code has expired. Request a new one.";
    default:
      return err?.message || "Something went wrong. Please try again.";
  }
}
