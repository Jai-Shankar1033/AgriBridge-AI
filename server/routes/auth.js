const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../middleware/errorHandler');

// In production replace with real DB + Twilio/MSG91
const otpStore = new Map(); // phone → { otp, expiry, attempts }

// ─── Send OTP ────────────────────────────────────────────────
router.post('/send-otp', asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid Indian mobile number' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000; // 10 min

  otpStore.set(phone, { otp, expiry, attempts: 0 });

  // In production: await sendSMS(phone, `Your AgriBridge OTP is ${otp}. Valid for 10 min.`);
  console.log(`[DEV] OTP for ${phone}: ${otp}`);

  res.json({ success: true, message: 'OTP sent successfully', ...(process.env.NODE_ENV !== 'production' && { otp }) });
}));

// ─── Verify OTP & issue JWT ───────────────────────────────────
router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP required' });

  const record = otpStore.get(phone);
  if (!record) return res.status(400).json({ error: 'OTP not requested or expired' });
  if (Date.now() > record.expiry) { otpStore.delete(phone); return res.status(400).json({ error: 'OTP expired' }); }

  record.attempts++;
  if (record.attempts > 5) { otpStore.delete(phone); return res.status(429).json({ error: 'Too many attempts. Request a new OTP.' }); }
  if (record.otp !== otp) return res.status(400).json({ error: `Invalid OTP. ${5 - record.attempts} attempts left.` });

  otpStore.delete(phone);

  // Mock user lookup — replace with DB query
  const user = { id: `user_${phone}`, phone, role: 'farmer', name: '', state: '', onboarded: false };

  const accessToken = jwt.sign({ id: user.id, phone, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, accessToken, user: { id: user.id, phone, role: user.role, onboarded: user.onboarded } });
}));

// ─── Refresh access token ─────────────────────────────────────
router.post('/refresh', asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}));

// ─── Logout ───────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true });
});

module.exports = router;
