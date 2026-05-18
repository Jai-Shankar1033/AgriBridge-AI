import React, { useState, useEffect } from 'react';
import { Shield, X, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const CONSENT_KEY = 'agri_consent_v1';

const ConsentBanner = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState({
    essential: true,       // always on
    analytics: false,
    marketing: false,
    thirdParty: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch { setVisible(true); }
  }, []);

  const save = (accepted) => {
    const consent = { ...choices, essential: true, accepted, timestamp: new Date().toISOString(), version: '1.0' };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch {}
    setVisible(false);
    onAccept?.(consent);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9990,
      background: 'white', borderTop: '1px solid rgba(34,197,94,0.15)',
      boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
      fontFamily: "'DM Sans', system-ui",
      animation: 'slideUpBanner 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <style>{`
        @keyframes slideUpBanner {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <div style={{ background: 'rgba(34,197,94,0.1)', padding: 10, borderRadius: 12, flexShrink: 0 }}>
            <Shield size={22} color="#166534" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f1f13', marginBottom: 5, fontFamily: "'Syne', system-ui" }}>
              Your Privacy Matters — DPDP Act 2023
            </div>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>
              AgriBridge collects your location, crop data, and device info to provide personalised farm advisory. As required by India's Digital Personal Data Protection Act 2023, we need your consent before collecting any personal data.
              {' '}<a href="/privacy-policy" style={{ color: '#166534', fontWeight: 600, textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Read our Privacy Policy <ExternalLink size={11} style={{ verticalAlign: 'middle' }} /></a>
            </p>
          </div>
          <button onClick={() => save(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: 4, color: '#aaa', flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        {/* Expandable details */}
        <button onClick={() => setExpanded(!expanded)} style={{ background: 'transparent', border: 'none', color: '#166534', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14, fontFamily: 'inherit', padding: 0 }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide' : 'Manage'} preferences
        </button>

        {expanded && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 8, marginBottom: 16, animation: 'fadeUp 0.3s ease' }}>
            {[
              { key: 'essential', label: '✓ Essential', desc: 'Login, security, basic app function. Cannot be disabled.', locked: true },
              { key: 'analytics', label: '📊 Analytics', desc: 'Usage patterns to improve the app (Mixpanel).' },
              { key: 'marketing', label: '🔔 Marketing', desc: 'Price alerts, scheme notifications via WhatsApp/SMS.' },
              { key: 'thirdParty', label: '🌐 Third-party', desc: 'Google Translate, OpenWeather, Razorpay data sharing.' },
            ].map(({ key, label, desc, locked }) => (
              <label key={key} style={{ display: 'flex', gap: 10, background: '#f8fffe', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 14, padding: '12px 14px', cursor: locked ? 'default' : 'pointer', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  checked={choices[key]}
                  disabled={locked}
                  onChange={e => !locked && setChoices(c => ({ ...c, [key]: e.target.checked }))}
                  style={{ marginTop: 2, accentColor: '#22c55e', width: 15, height: 15, flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1f13', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: '#888', lineHeight: 1.4 }}>{desc}</div>
                </div>
              </label>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => save(true)} style={{ flex: '0 0 auto', padding: '11px 28px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>
            Accept All & Continue
          </button>
          <button onClick={() => save(true)} style={{ flex: '0 0 auto', padding: '11px 22px', background: 'white', color: '#166534', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            Save My Choices
          </button>
          <button onClick={() => save(false)} style={{ flex: '0 0 auto', padding: '11px 22px', background: 'transparent', color: '#aaa', border: 'none', fontWeight: 500, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
            Reject Non-Essential
          </button>
        </div>

        <p style={{ fontSize: 11, color: '#bbb', marginTop: 10, lineHeight: 1.5 }}>
          You can change your preferences anytime in Settings → Privacy. Per DPDP Act 2023 §6, you have the right to withdraw consent and request data deletion.
        </p>
      </div>
    </div>
  );
};

export default ConsentBanner;
