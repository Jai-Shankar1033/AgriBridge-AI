// AgriBridge Analytics & Monitoring
// Plug in real keys when going to production

// ─── MIXPANEL ────────────────────────────────────────────────
const MP_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN || '';

function mpInit() {
  if (!MP_TOKEN || typeof window === 'undefined') return;
  try {
    // dynamic load to avoid blocking
    const s = document.createElement('script');
    s.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
    s.async = true;
    s.onload = () => {
      window.mixpanel?.init(MP_TOKEN, { debug: process.env.NODE_ENV !== 'production', track_pageview: true });
    };
    document.head.appendChild(s);
  } catch (e) { /* silent */ }
}

export function track(event, props = {}) {
  try {
    window.mixpanel?.track(event, { app: 'AgriBridge', ...props });
  } catch (_) {}
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, props);
  }
}

export function identify(userId, traits = {}) {
  try {
    window.mixpanel?.identify(userId);
    window.mixpanel?.people.set({ $name: traits.name, $email: traits.email, ...traits });
  } catch (_) {}
}

export function page(name) {
  track('Page View', { page: name });
}

// ─── SENTRY ──────────────────────────────────────────────────
const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN || '';

function sentryInit() {
  if (!SENTRY_DSN || typeof window === 'undefined') return;
  try {
    const s = document.createElement('script');
    s.src = 'https://browser.sentry-cdn.com/7.100.0/bundle.tracing.min.js';
    s.crossOrigin = 'anonymous';
    s.async = true;
    s.onload = () => {
      window.Sentry?.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV,
        release: process.env.REACT_APP_VERSION || '1.0.0',
        tracesSampleRate: 0.1,
        integrations: [new window.Sentry.BrowserTracing()],
      });
    };
    document.head.appendChild(s);
  } catch (e) { /* silent */ }
}

export function captureError(error, context = {}) {
  try {
    window.Sentry?.captureException(error, { extra: context });
  } catch (_) {}
  if (process.env.NODE_ENV === 'development') {
    console.error('[Sentry]', error, context);
  }
}

// ─── FEATURE FLAGS (A/B Testing) ─────────────────────────────
const FLAGS_KEY = 'agribridge_flags';

const DEFAULT_FLAGS = {
  newOnboarding: false,
  priceAlertBanner: true,
  betaYieldPredictor: false,
  promoSplash: false,
  communityTabFirst: false,
};

function loadFlags() {
  try {
    const stored = localStorage.getItem(FLAGS_KEY);
    return stored ? { ...DEFAULT_FLAGS, ...JSON.parse(stored) } : DEFAULT_FLAGS;
  } catch (_) { return DEFAULT_FLAGS; }
}

const _flags = loadFlags();

export function flag(name) {
  return _flags[name] ?? DEFAULT_FLAGS[name] ?? false;
}

export function setFlag(name, value) {
  _flags[name] = value;
  try { localStorage.setItem(FLAGS_KEY, JSON.stringify(_flags)); } catch (_) {}
}

// ─── PUSH NOTIFICATIONS ──────────────────────────────────────
export async function requestPushPermission() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return false;
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    track('Push Notifications Enabled');
    return true;
  }
  return false;
}

export async function sendLocalNotification(title, body, tag = 'agribridge') {
  if (Notification.permission !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker?.ready;
    reg?.showNotification(title, { body, icon: '/logo192.png', tag, vibrate: [200, 100, 200] });
  } catch (_) {
    new Notification(title, { body, icon: '/logo192.png' });
  }
}

// ─── PWA INSTALL ─────────────────────────────────────────────
let _deferredPrompt = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredPrompt = e;
  });
}

export function canInstall() { return !!_deferredPrompt; }

export async function installPWA() {
  if (!_deferredPrompt) return false;
  _deferredPrompt.prompt();
  const { outcome } = await _deferredPrompt.userChoice;
  track('PWA Install', { outcome });
  _deferredPrompt = null;
  return outcome === 'accepted';
}

// ─── INIT ALL ────────────────────────────────────────────────
export function initAnalytics() {
  mpInit();
  sentryInit();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}
