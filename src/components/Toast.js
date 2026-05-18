import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 size={18} color="#22c55e" />,
  error:   <XCircle     size={18} color="#ef4444" />,
  warning: <AlertTriangle size={18} color="#f59e0b" />,
  info:    <Info        size={18} color="#3b82f6" />,
};

const COLORS = {
  success: { bg: '#f0fdf4', border: 'rgba(34,197,94,0.25)',  text: '#166534' },
  error:   { bg: '#fef2f2', border: 'rgba(239,68,68,0.25)',  text: '#b91c1c' },
  warning: { bg: '#fffbeb', border: 'rgba(245,158,11,0.25)', text: '#92400e' },
  info:    { bg: '#eff6ff', border: 'rgba(59,130,246,0.25)', text: '#1d4ed8' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 3500, action }) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev.slice(-4), { id, message, type, duration, action }]);
    if (duration > 0) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, opts = {}) => addToast({ message: msg, type: 'success', ...opts }),
    error:   (msg, opts = {}) => addToast({ message: msg, type: 'error',   ...opts }),
    warning: (msg, opts = {}) => addToast({ message: msg, type: 'warning', ...opts }),
    info:    (msg, opts = {}) => addToast({ message: msg, type: 'info',    ...opts }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div style={{
        position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8,
        alignItems: 'center', pointerEvents: 'none', width: '100%', maxWidth: 420, padding: '0 16px',
      }}>
        {toasts.map(t => {
          const c = COLORS[t.type] || COLORS.info;
          return (
            <div key={t.id} style={{
              background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 16, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              animation: 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              pointerEvents: 'all', width: '100%',
              fontFamily: "'DM Sans', system-ui",
            }}>
              <span style={{ flexShrink: 0 }}>{ICONS[t.type]}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: c.text, lineHeight: 1.4 }}>{t.message}</span>
              {t.action && (
                <button onClick={t.action.onClick} style={{ background: 'transparent', border: 'none', color: c.text, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, padding: '2px 6px' }}>
                  {t.action.label}
                </button>
              )}
              <button onClick={() => removeToast(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexShrink: 0, opacity: 0.5, padding: 2 }}>
                <X size={14} color={c.text} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export default ToastProvider;
