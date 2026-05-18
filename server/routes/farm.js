const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { roleMiddleware } = require('../middleware/auth');

// Mock DB - replace with mongoose/prisma queries
const farms = new Map();

// ─── GET farm profile ─────────────────────────────────────────
router.get('/profile', asyncHandler(async (req, res) => {
  const farm = farms.get(req.user.id) || {
    id: req.user.id, name: '', state: '', district: '',
    landArea: 0, soilType: 'Loamy', crops: [], goals: [],
    language: 'en', createdAt: new Date().toISOString(),
  };
  res.json({ farm });
}));

// ─── CREATE / UPDATE farm profile ────────────────────────────
router.put('/profile', asyncHandler(async (req, res) => {
  const { name, state, district, landArea, soilType, crops, goals, language } = req.body;
  if (!state) return res.status(400).json({ error: 'State is required' });
  if (landArea && (landArea < 0.1 || landArea > 1000)) {
    return res.status(400).json({ error: 'Land area must be between 0.1 and 1000 acres' });
  }

  const existing = farms.get(req.user.id) || {};
  const farm = {
    ...existing, id: req.user.id, name: name || existing.name,
    state, district, landArea: parseFloat(landArea) || existing.landArea,
    soilType: soilType || existing.soilType,
    crops: crops || existing.crops || [],
    goals: goals || existing.goals || [],
    language: language || existing.language || 'en',
    updatedAt: new Date().toISOString(),
  };
  farms.set(req.user.id, farm);
  res.json({ success: true, farm });
}));

// ─── GET soil readings history ────────────────────────────────
router.get('/soil', asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  // Mock soil readings
  const readings = Array.from({ length: parseInt(limit) }, (_, i) => ({
    id: `reading_${i + 1}`,
    farmerId: req.user.id,
    nitrogen: 220 + Math.floor(Math.random() * 80),
    phosphorus: 15 + Math.floor(Math.random() * 20),
    potassium: 160 + Math.floor(Math.random() * 80),
    ph: +(6.2 + Math.random() * 1.2).toFixed(1),
    moisture: 30 + Math.floor(Math.random() * 30),
    organicCarbon: +(0.4 + Math.random() * 0.6).toFixed(2),
    recordedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    source: i % 3 === 0 ? 'iot_sensor' : 'manual_entry',
  }));
  res.json({ readings, page: parseInt(page), limit: parseInt(limit), total: 50 });
}));

// ─── POST new soil reading ────────────────────────────────────
router.post('/soil', asyncHandler(async (req, res) => {
  const { nitrogen, phosphorus, potassium, ph, moisture, organicCarbon } = req.body;
  if (!nitrogen || !ph) return res.status(400).json({ error: 'Nitrogen and pH are required' });
  if (ph < 0 || ph > 14) return res.status(400).json({ error: 'pH must be between 0 and 14' });

  const reading = {
    id: `reading_${Date.now()}`,
    farmerId: req.user.id,
    nitrogen: parseFloat(nitrogen),
    phosphorus: parseFloat(phosphorus) || null,
    potassium: parseFloat(potassium) || null,
    ph: parseFloat(ph),
    moisture: parseFloat(moisture) || null,
    organicCarbon: parseFloat(organicCarbon) || null,
    recordedAt: new Date().toISOString(),
    source: 'manual_entry',
  };
  // In production: await SoilReading.create(reading);
  res.status(201).json({ success: true, reading });
}));

// ─── GET crop calendar / advisory tasks ──────────────────────
router.get('/advisory', asyncHandler(async (req, res) => {
  const { crop = 'Wheat', season = 'Rabi' } = req.query;
  const sowingDate = new Date();
  sowingDate.setDate(sowingDate.getDate() - 42);

  const tasks = [
    { stage: 'Sowing', status: 'completed', date: sowingDate.toISOString().split('T')[0], task: `Apply base NPK fertilizer (${crop})`, daysFromSow: 0 },
    { stage: 'Germination', status: 'completed', date: new Date(sowingDate.getTime() + 7 * 86400000).toISOString().split('T')[0], task: 'First irrigation + seedling health check', daysFromSow: 7 },
    { stage: 'Tillering', status: 'active', date: 'Today', task: 'Apply Urea top dressing. Check for weeds.', daysFromSow: 42, alert: 'Rain forecast — delay spraying 24h.' },
    { stage: 'Flowering', status: 'upcoming', date: new Date(sowingDate.getTime() + 65 * 86400000).toISOString().split('T')[0], task: 'Monitor aphids. Maintain soil moisture 40-55%.', daysFromSow: 65 },
    { stage: 'Harvest', status: 'upcoming', date: new Date(sowingDate.getTime() + 120 * 86400000).toISOString().split('T')[0], task: `Predicted yield: 32 q/ha based on current data.`, daysFromSow: 120 },
  ];
  res.json({ crop, season, sowingDate: sowingDate.toISOString().split('T')[0], currentDay: 42, tasks });
}));

// ─── GET yield history ────────────────────────────────────────
router.get('/yield-history', asyncHandler(async (req, res) => {
  const seasons = ['Kharif 2023', 'Rabi 2023-24', 'Kharif 2024', 'Rabi 2024-25'];
  const history = seasons.map((season, i) => ({
    season,
    crop: i % 2 === 0 ? 'Rice' : 'Wheat',
    actualYield: 28 + Math.floor(Math.random() * 12),
    predictedYield: 30 + Math.floor(Math.random() * 8),
    revenue: 80000 + Math.floor(Math.random() * 60000),
    expenses: 20000 + Math.floor(Math.random() * 15000),
    area: 2.0 + Math.random() * 0.5,
  }));
  res.json({ history });
}));

// ─── DELETE account (DPDP compliance) ────────────────────────
router.delete('/account', asyncHandler(async (req, res) => {
  const { confirm } = req.body;
  if (confirm !== 'DELETE_MY_ACCOUNT') {
    return res.status(400).json({ error: 'Send confirm: "DELETE_MY_ACCOUNT" to proceed' });
  }
  farms.delete(req.user.id);
  res.clearCookie('refreshToken');
  // In production: await User.softDelete(req.user.id); schedule GDPR erasure job
  res.json({ success: true, message: 'Account scheduled for deletion within 30 days as per DPDP Act 2023.' });
}));

module.exports = router;
