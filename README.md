# 🌾 AgriBridge — World-Class Agri-Tech Super App

India's most advanced farming platform. Benchmarked against XAG (China), John Deere (USA), Climate Corp (USA), and Pinduoduo (China).

## 🚀 Quick Start (2 minutes)

### Prerequisites
- Node.js 18+ → https://nodejs.org
- Git

### 1. Frontend (React App)
```bash
cd agri-bridge-enhanced
npm install
npm start
# Opens at http://localhost:3000
```

### 2. Backend (Express API) — Optional for full features
```bash
cd agri-bridge-enhanced/server
npm install
# .env is already pre-filled with dev defaults
npm run dev
# Runs at http://localhost:5000
```

### 3. Environment Variables
Frontend `.env` is already created. For backend, edit `server/.env`:
- Add `OPENWEATHER_API_KEY` for live weather
- Add `WHATSAPP_ACCESS_TOKEN` for WhatsApp bot
- Add `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` for payments

**Everything works without any API keys in dev mode** — mock data is returned.

---

## 📱 Features (22 Modals)

| Feature | Description | World Benchmark |
|---|---|---|
| 🌿 AI Plant Doctor | Camera-based disease detection | Custom ML |
| 📡 Smart Soil IoT | Real-time NPK/pH/moisture | IoT sensors |
| 📈 Market Forecast | Live mandi prices + AI prediction | Agmarknet |
| 🚜 Equipment Rental | Tractor/harvester booking | Uber model |
| 🌱 Crop Advisory | Growth-stage task timeline | ICAR data |
| 👥 Community | Farmer social network | — |
| 📊 Yield Predictor | ML-based harvest prediction | Climate Corp |
| 💧 Smart Irrigation | AI-scheduled watering | JD precision |
| 🐛 Pest Alert | Vision AI detection | — |
| 🏛️ Govt Schemes | PM-KISAN, PMFBY finder | — |
| 🎁 Refer & Earn | Gamified referral coins | — |
| 📄 Soil Report | PDF health card | Govt format |
| 🛒 Group Buying | Pool orders, 35% savings | **Pinduoduo** |
| 🚁 Drone Marketplace | Licensed operator booking | **XAG** |
| 🛰️ Satellite Maps | Sentinel-2 NDVI field health | **FieldView** |
| 🌍 Carbon Credits | VERRA VCS registry + income | **Climate Corp** |
| 💳 BNPL | Buy now, pay after harvest | — |
| 🔗 Supply Chain | QR farm-to-fork traceability | EU standard |
| 🤖 Agronomist AI | ICAR knowledge base chat | RAG model |
| 🚨 Pest Heatmap | Crowdsourced district alerts | Waze model |
| 👑 Subscriptions | Free/Pro/FPO tiers | Razorpay |
| 📉 Farm Analytics | Season comparison dashboard | — |

---

## 🏗️ Project Structure

```
agri-bridge-enhanced/
├── src/
│   ├── App.js                    # Main app + all feature grid
│   ├── SplashScreen.js           # 3D animated startup screen
│   ├── OnboardingFlow.js         # 6-step farm profile setup
│   ├── i18n.js                   # 5-language translations (EN/HI/OR/TE/TA)
│   ├── analytics.js              # Mixpanel + Sentry + Feature flags
│   ├── components/
│   │   ├── ErrorBoundary.js      # Global error catching
│   │   ├── Toast.js              # Snackbar notification system
│   │   ├── Skeleton.js           # Loading shimmer components
│   │   └── ConsentBanner.js      # DPDP Act 2023 consent UI
│   ├── hooks/
│   │   └── useApi.js             # Data fetching + token refresh
│   └── [22 Modal components]
├── server/
│   ├── index.js                  # Express + Socket.io server
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── errorHandler.js       # Global error handler
│   └── routes/
│       ├── auth.js               # OTP login + JWT
│       ├── farm.js               # Farm profile + soil data
│       ├── market.js             # Mandi prices + forecast
│       ├── weather.js            # OpenWeather integration
│       ├── ai.js                 # Plant doctor + yield predictor
│       ├── payment.js            # Razorpay order + webhook
│       ├── notifications.js      # Push + WhatsApp + SMS
│       └── whatsapp.js           # WhatsApp Business bot
├── public/
│   ├── manifest.json             # PWA installable
│   ├── sw.js                     # Service worker (offline)
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/ci-cd.yml   # GitHub Actions CI/CD
├── .env                          # Frontend env (pre-filled)
├── .env.example                  # All env vars documented
├── .gitignore
└── README.md
```

---

## 🌐 Language Support
Switch language in the navbar:
- 🇬🇧 **English** (en)
- 🇮🇳 **हिंदी** (hi)
- 🇮🇳 **ଓଡ଼ିଆ** (or)
- 🇮🇳 **తెలుగు** (te)
- 🇮🇳 **தமிழ்** (ta)

---

## 🔒 Security Features
- JWT + OTP authentication (mobile-first)
- DPDP Act 2023 consent banner
- Rate limiting (5 OTP attempts / 15 min)
- Helmet.js security headers (CSP, HSTS)
- Input sanitisation
- RBAC (Farmer / Agronomist / Admin / FPO roles)
- GDPR-style account deletion

---

## 💰 Revenue Streams
| Stream | Model | Potential |
|---|---|---|
| Pro subscription | ₹99/month | SaaS |
| Group buying commission | 3-5% GMV | Marketplace |
| Drone booking fee | 12-15% | Marketplace |
| Loan origination | 2% | Fintech |
| Carbon credits | Facilitation | Climate |
| B2B data API | Licensing | Enterprise |

---

## 📞 API Endpoints

```
POST /api/v1/auth/send-otp       Send OTP to mobile
POST /api/v1/auth/verify-otp     Verify + get JWT
GET  /api/v1/farm/profile        Get farm profile
PUT  /api/v1/farm/profile        Update farm profile
GET  /api/v1/market/prices       Live mandi prices
GET  /api/v1/market/forecast/:crop  14-day AI forecast
GET  /api/v1/weather/current     7-day weather + agri advisory
POST /api/v1/ai/plant-doctor     Plant disease detection
POST /api/v1/ai/yield-predict    Yield prediction
POST /api/v1/ai/irrigation-schedule  Smart watering schedule
POST /api/v1/payments/create-order   Razorpay order
POST /api/v1/payments/verify     Verify payment
POST /api/v1/whatsapp/send-otp   Send OTP via WhatsApp
POST /api/v1/whatsapp/broadcast  Broadcast alert to farmers
```

---

## 🚢 Deploy to Production

```bash
# Frontend → Vercel
npx vercel --prod

# Backend → Railway
railway up

# OR Docker
docker build -t agribridge-server ./server
docker run -p 5000:5000 --env-file server/.env agribridge-server
```

---

## 🤝 Contributing
Built to empower India's 140 million farming families.

Score vs global leaders:
- XAG (China): 91/100
- FieldView (USA): 89/100  
- John Deere (USA): 87/100
- **AgriBridge target: 95/100** 🎯

---

*AgriBridge — Harvesting Intelligence 🌾*
