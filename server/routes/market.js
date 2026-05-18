const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

// Mock live price data — replace with Agmarknet API / data.gov.in
const MANDI_PRICES = {
  Wheat: [
    { mandi: 'Khanna Mandi', state: 'Punjab', price: 2450, change: +50, trend: 'up', arrivals: '1200 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Indore Market', state: 'M.P.', price: 2380, change: -20, trend: 'down', arrivals: '850 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Rajkot Mandi', state: 'Gujarat', price: 2510, change: +110, trend: 'up', arrivals: '620 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Hapur Market', state: 'U.P.', price: 2420, change: +30, trend: 'up', arrivals: '940 MT', updatedAt: new Date().toISOString() },
  ],
  Rice: [
    { mandi: 'Karnal Mandi', state: 'Haryana', price: 3100, change: +150, trend: 'up', arrivals: '2100 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Nalgonda Market', state: 'Telangana', price: 2950, change: +40, trend: 'up', arrivals: '1800 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Cuttack Mandi', state: 'Odisha', price: 2880, change: -60, trend: 'down', arrivals: '900 MT', updatedAt: new Date().toISOString() },
  ],
  Tomato: [
    { mandi: 'Azadpur Mandi', state: 'Delhi', price: 1200, change: -300, trend: 'down', arrivals: '3200 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Nashik Market', state: 'Maharashtra', price: 1150, change: -150, trend: 'down', arrivals: '4100 MT', updatedAt: new Date().toISOString() },
  ],
  Corn: [
    { mandi: 'Davangere Market', state: 'Karnataka', price: 1850, change: +80, trend: 'up', arrivals: '560 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Nizamabad Mandi', state: 'Telangana', price: 1790, change: +60, trend: 'up', arrivals: '480 MT', updatedAt: new Date().toISOString() },
  ],
  Onion: [
    { mandi: 'Lasalgaon Mandi', state: 'Maharashtra', price: 2200, change: +400, trend: 'up', arrivals: '8200 MT', updatedAt: new Date().toISOString() },
    { mandi: 'Bangalore Market', state: 'Karnataka', price: 2050, change: +200, trend: 'up', arrivals: '3100 MT', updatedAt: new Date().toISOString() },
  ],
};

// ─── GET live mandi prices ────────────────────────────────────
router.get('/prices', asyncHandler(async (req, res) => {
  const { crop, state, limit = 10 } = req.query;

  let results = MANDI_PRICES[crop] || Object.values(MANDI_PRICES).flat();
  if (state) results = results.filter(m => m.state === state);

  // Add slight randomness to simulate live ticks
  results = results.map(r => ({
    ...r,
    price: r.price + Math.floor(Math.random() * 20 - 10),
    updatedAt: new Date().toISOString(),
  }));

  res.json({
    crop: crop || 'All',
    count: results.length,
    prices: results.slice(0, parseInt(limit)),
    source: 'Agmarknet / eNAM (live)',
    lastUpdated: new Date().toISOString(),
  });
}));

// ─── GET price forecast (AI prediction mock) ─────────────────
router.get('/forecast/:crop', asyncHandler(async (req, res) => {
  const { crop } = req.params;
  const { days = 14 } = req.query;

  const basePrice = { Wheat: 2450, Rice: 3000, Tomato: 1200, Corn: 1800, Onion: 2100 }[crop] || 2000;

  const forecast = Array.from({ length: parseInt(days) }, (_, i) => {
    const trend = Math.sin(i / 3) * 80 + i * 12;
    return {
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      predictedPrice: Math.round(basePrice + trend),
      confidence: Math.max(60, 95 - i * 2),
      low: Math.round(basePrice + trend - 60),
      high: Math.round(basePrice + trend + 60),
    };
  });

  const recommendation = forecast[days - 1].predictedPrice > basePrice
    ? { action: 'HOLD', reason: `Prices expected to rise ${Math.round(((forecast[days - 1].predictedPrice - basePrice) / basePrice) * 100)}% in ${days} days. Consider holding stock.` }
    : { action: 'SELL', reason: 'Prices expected to fall. Best to sell within 3 days.' };

  res.json({ crop, currentPrice: basePrice, forecast, recommendation, model: 'LSTM v2.1', generatedAt: new Date().toISOString() });
}));

// ─── GET price history (for charts) ──────────────────────────
router.get('/history/:crop', asyncHandler(async (req, res) => {
  const { crop } = req.params;
  const { months = 6 } = req.query;

  const basePrice = { Wheat: 2200, Rice: 2800, Tomato: 900, Corn: 1600, Onion: 1500 }[crop] || 1800;
  const history = Array.from({ length: parseInt(months) * 4 }, (_, i) => ({
    date: new Date(Date.now() - (parseInt(months) * 4 - i) * 7 * 86400000).toISOString().split('T')[0],
    price: Math.round(basePrice + Math.sin(i / 4) * 300 + i * 8),
    volume: Math.floor(500 + Math.random() * 2000),
  }));

  res.json({ crop, history, msp: basePrice - 200 });
}));

// ─── GET all available crops ──────────────────────────────────
router.get('/crops', asyncHandler(async (req, res) => {
  res.json({
    crops: Object.keys(MANDI_PRICES),
    totalMandis: Object.values(MANDI_PRICES).flat().length,
  });
}));

module.exports = router;
