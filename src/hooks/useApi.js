import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
const cache = new Map(); // Simple in-memory cache

// ─── Core fetch helper ────────────────────────────────────────
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('agri_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  // Auto-refresh token on 401
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST', credentials: 'include',
    });
    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      localStorage.setItem('agri_token', accessToken);
      // Retry original request
      return apiFetch(endpoint, options);
    } else {
      localStorage.removeItem('agri_token');
      window.dispatchEvent(new CustomEvent('agri:logout'));
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

// ─── useApi hook ──────────────────────────────────────────────
export function useApi(endpoint, { ttl = 5 * 60 * 1000, skip = false, deps = [] } = {}) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError]     = useState(null);
  const abortRef              = useRef(null);

  const fetch_ = useCallback(async (force = false) => {
    if (!endpoint || skip) return;

    // Check cache
    if (!force && ttl > 0) {
      const cached = cache.get(endpoint);
      if (cached && Date.now() < cached.expiry) {
        setData(cached.data); setLoading(false); return;
      }
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true); setError(null);

    try {
      const result = await apiFetch(endpoint, { signal: abortRef.current.signal });
      cache.set(endpoint, { data: result, expiry: Date.now() + ttl });
      setData(result);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, skip, ttl]);

  useEffect(() => {
    fetch_();
    return () => abortRef.current?.abort();
  }, [fetch_, ...deps]);

  return { data, loading, error, refetch: () => fetch_(true) };
}

// ─── Specialised hooks ────────────────────────────────────────
export function useWeather(lat, lon) {
  return useApi(lat && lon ? `/weather/current?lat=${lat}&lon=${lon}` : null, { ttl: 30 * 60 * 1000 });
}

export function useMarketPrices(crop) {
  return useApi(crop ? `/market/prices?crop=${crop}` : '/market/prices', { ttl: 5 * 60 * 1000 });
}

export function useFarmProfile() {
  return useApi('/farm/profile', { ttl: 0 }); // always fresh
}

export function useAdvisory(crop) {
  return useApi(crop ? `/farm/advisory?crop=${crop}` : '/farm/advisory', { ttl: 60 * 60 * 1000 });
}

export function useSubscriptionStatus() {
  return useApi('/payments/status', { ttl: 5 * 60 * 1000 });
}

export function useNotifications() {
  return useApi('/notifications/history', { ttl: 60 * 1000 });
}

// ─── Auth helpers ─────────────────────────────────────────────
export const authApi = {
  sendOtp:   (phone)       => apiFetch('/auth/send-otp',   { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, otp)  => apiFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  logout:    ()            => apiFetch('/auth/logout',      { method: 'POST', credentials: 'include' }),
  refresh:   ()            => apiFetch('/auth/refresh',     { method: 'POST', credentials: 'include' }),
};

export const farmApi = {
  updateProfile: (data) => apiFetch('/farm/profile',  { method: 'PUT',  body: JSON.stringify(data) }),
  addSoilReading:(data) => apiFetch('/farm/soil',     { method: 'POST', body: JSON.stringify(data) }),
  deleteAccount: ()     => apiFetch('/farm/account',  { method: 'DELETE', body: JSON.stringify({ confirm: 'DELETE_MY_ACCOUNT' }) }),
};

export const aiApi = {
  scanPlant: (formData) => {
    const token = localStorage.getItem('agri_token');
    return fetch(`${API_BASE}/ai/plant-doctor`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(r => r.json());
  },
  scanPest:     (formData) => {
    const token = localStorage.getItem('agri_token');
    return fetch(`${API_BASE}/ai/pest-scan`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(r => r.json());
  },
  predictYield: (data) => apiFetch('/ai/yield-predict',      { method: 'POST', body: JSON.stringify(data) }),
  irrigationSchedule: (data) => apiFetch('/ai/irrigation-schedule', { method: 'POST', body: JSON.stringify(data) }),
};

export const paymentApi = {
  createOrder: (planId) => apiFetch('/payments/create-order', { method: 'POST', body: JSON.stringify({ planId }) }),
  verifyPayment:(data)  => apiFetch('/payments/verify',       { method: 'POST', body: JSON.stringify(data) }),
};

export const notificationApi = {
  subscribe:   (sub, prefs) => apiFetch('/notifications/subscribe', { method: 'POST', body: JSON.stringify({ subscription: sub, preferences: prefs }) }),
  sendWhatsApp:(data)       => apiFetch('/notifications/whatsapp',  { method: 'POST', body: JSON.stringify(data) }),
};
