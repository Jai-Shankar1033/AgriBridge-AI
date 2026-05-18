import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import ConsentBanner from './components/ConsentBanner';
import { initAnalytics } from './analytics';
import reportWebVitals from './reportWebVitals';

// Init analytics + PWA service worker
initAnalytics();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <App />
        <ConsentBanner onAccept={(consent) => {
          if (consent.analytics && window.mixpanel) window.mixpanel.opt_in_tracking();
        }} />
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals(({ name, value }) => {
  if (window.mixpanel) window.mixpanel.track('Web Vital', { metric: name, value: Math.round(value) });
});
