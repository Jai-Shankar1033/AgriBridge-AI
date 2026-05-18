require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');


const authRoutes = require('./routes/auth');
const farmRoutes = require('./routes/farm');
const marketRoutes = require('./routes/market');
const weatherRoutes = require('./routes/weather');
const aiRoutes = require('./routes/ai');
const paymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notifications');
const whatsappRoutes = require('./routes/whatsapp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const { errorHandler } = require('./middleware/errorHandler');
const { authMiddleware } = require('./middleware/auth');

const app = express();
const httpServer = createServer(app);

// ─── WebSocket for live market prices ────────────────────────
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // Push live price tick every 30s
  const priceInterval = setInterval(() => {
    socket.emit('price_tick', {
      crop: 'Wheat',
      mandi: 'Khanna',
      price: 2400 + Math.floor(Math.random() * 200),
      timestamp: new Date().toISOString(),
    });
  }, 30000);
  socket.on('disconnect', () => clearInterval(priceInterval));
});

app.set('io', io);

// ─── Security headers ─────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'blob:', '*.unsplash.com'],
      connectSrc: ["'self'", 'api.openweathermap.org', 'api.agmarknet.gov.in'],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// ─── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// ─── Rate limiting ────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
});

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: { error: 'Too many OTP requests. Please wait 10 minutes.' },
});

app.use(globalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(compression());

// ─── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: process.env.APP_VERSION || '1.0.0' });
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/otp', otpLimiter, authRoutes);
app.use('/api/v1/farm', authMiddleware, farmRoutes);
app.use('/api/v1/market', marketRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/ai', authMiddleware, aiRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/notifications', authMiddleware, notificationRoutes);
app.use('/api/v1/whatsapp', whatsappRoutes);

// ─── 404 handler ──────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// ─── Global error handler ─────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`AgriBridge server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };
