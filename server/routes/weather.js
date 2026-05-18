const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

const WEATHER_CACHE = new Map(); // key: lat_lon → { data, expiry }
const CACHE_TTL = 30 * 60 * 1000; // 30 min

async function fetchOpenWeather(lat, lon) {
  const key = `${lat}_${lon}`;
  const cached = WEATHER_CACHE.get(key);
  if (cached && Date.now() < cached.expiry) return cached.data;

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    // Return mock data in dev
    return getMockWeather(lat, lon);
  }

  const [current, forecast] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`).then(r => r.json()),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(r => r.json()),
  ]);

  const data = transformWeatherData(current, forecast);
  WEATHER_CACHE.set(key, { data, expiry: Date.now() + CACHE_TTL });
  return data;
}

function getMockWeather(lat, lon) {
  return {
    location: { lat, lon, city: 'Varanasi', state: 'Uttar Pradesh' },
    current: {
      temp: 28, feelsLike: 31, humidity: 68, windSpeed: 12,
      windDirection: 'NE', visibility: 8, uvIndex: 6,
      rainChance: 40, description: 'Partly Cloudy',
      icon: '02d', pressure: 1012,
    },
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(new Date().getDay() + i) % 7],
      maxTemp: 28 + Math.floor(Math.random() * 6) - 2,
      minTemp: 18 + Math.floor(Math.random() * 4),
      rain: i === 1 ? 15 : i === 2 ? 40 : 0,
      description: i === 2 ? 'Heavy Rain' : i === 1 ? 'Showers' : 'Sunny',
      humidity: 50 + Math.floor(Math.random() * 30),
    })),
    agriAdvisory: generateAgriAdvisory(40, 68, 12),
    source: 'Mock (set OPENWEATHER_API_KEY for live data)',
    updatedAt: new Date().toISOString(),
  };
}

function transformWeatherData(current, forecast) {
  const daily = [];
  const seen = new Set();
  for (const item of forecast.list) {
    const date = item.dt_txt.split(' ')[0];
    if (!seen.has(date)) {
      seen.add(date);
      daily.push({
        date,
        day: new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
        maxTemp: Math.round(item.main.temp_max),
        minTemp: Math.round(item.main.temp_min),
        rain: item.rain?.['3h'] ? Math.round(item.rain['3h'] * 8) : 0,
        description: item.weather[0].description,
        humidity: item.main.humidity,
      });
    }
    if (daily.length >= 7) break;
  }

  return {
    location: { lat: current.coord.lat, lon: current.coord.lon, city: current.name },
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6),
      description: current.weather[0].description,
      icon: current.weather[0].icon,
      pressure: current.main.pressure,
      visibility: current.visibility / 1000,
    },
    forecast: daily,
    agriAdvisory: generateAgriAdvisory(daily[0]?.rain || 0, current.main.humidity, current.wind.speed * 3.6),
    updatedAt: new Date().toISOString(),
  };
}

function generateAgriAdvisory(rain, humidity, windSpeed) {
  const advisories = [];
  if (rain > 20) advisories.push({ type: 'warning', message: 'Heavy rain expected. Avoid irrigation and delay fertilizer application.' });
  if (windSpeed > 20) advisories.push({ type: 'warning', message: `Strong winds (${Math.round(windSpeed)} km/h). Do not spray pesticides today.` });
  if (humidity > 80) advisories.push({ type: 'caution', message: 'High humidity. Risk of fungal diseases — inspect crops for early blight.' });
  if (advisories.length === 0) advisories.push({ type: 'good', message: 'Good weather for field activities. Ideal for spraying and irrigation.' });
  return advisories;
}

// ─── GET current weather + 7-day forecast ────────────────────
router.get('/current', asyncHandler(async (req, res) => {
  const { lat = 25.3176, lon = 82.9739 } = req.query; // Default: Varanasi
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }
  const data = await fetchOpenWeather(parseFloat(lat), parseFloat(lon));
  res.json(data);
}));

// ─── GET agri-specific weather advisory ──────────────────────
router.get('/advisory', asyncHandler(async (req, res) => {
  const { lat = 25.3176, lon = 82.9739, crop = 'Wheat' } = req.query;
  const weather = await fetchOpenWeather(parseFloat(lat), parseFloat(lon));

  const cropAdvisory = {
    Wheat: weather.current.temp > 35 ? 'Heat stress risk. Irrigate in early morning.' : 'Temperature optimal for wheat growth.',
    Rice: weather.current.humidity < 60 ? 'Low humidity. Ensure adequate water availability.' : 'Humidity suitable for rice.',
    Tomato: weather.forecast[0]?.rain > 15 ? 'Avoid outdoor planting. Risk of root rot.' : 'Good conditions for tomato growth.',
  };

  res.json({
    ...weather,
    cropSpecific: cropAdvisory[crop] || 'Monitor weather closely for your crop.',
  });
}));

module.exports = router;
