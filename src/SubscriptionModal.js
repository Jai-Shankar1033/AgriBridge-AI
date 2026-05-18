import React, { useState } from 'react';
import { X, Check, Zap, Star, Users, Crown } from 'lucide-react';

const plans = [
  {
    id: 'free', name: 'Kisan Free', price: 0, period: '', color: '#6b7280', icon: <Users size={22} />,
    features: ['5 AI plant scans/month', 'Basic weather forecast', 'Mandi price view (1 crop)', 'Community forum access', 'Crop advisory (basic)'],
    notIncluded: ['Yield predictor', 'Smart irrigation', 'Pest alert AI', 'Government scheme finder', 'IoT sensor dashboard', 'PDF reports'],
    cta: 'Current Plan', ctaStyle: { background: '#f5f5f5', color: '#888', cursor: 'default' },
  },
  {
    id: 'pro', name: 'Kisan Pro', price: 99, period: '/month', color: '#22c55e', icon: <Zap size={22} />,
    badge: 'Most Popular',
    features: ['Unlimited AI plant scans', 'All 7-day forecast + alerts', 'All crops market forecast', 'AI yield predictor', 'Smart irrigation scheduler', 'Pest & weed AI detection', 'Government scheme finder', 'IoT sensor dashboard (2 devices)', 'PDF soil health reports', 'Voice commands (all languages)', 'Priority support'],
    notIncluded: ['Custom IoT integrations', 'White-label reports'],
    cta: 'Start 7-day Free Trial', ctaStyle: { background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' },
  },
  {
    id: 'fpo', name: 'FPO / Enterprise', price: 999, period: '/month', color: '#d97706', icon: <Crown size={22} />,
    badge: 'For Groups',
    features: ['Everything in Pro', 'Up to 500 farmer accounts', 'Bulk advisory broadcast', 'Custom IoT integrations', 'White-label PDF reports', 'Satellite NDVI field maps', 'Dedicated account manager', 'API access for integrations', 'Custom crop models', 'Training & onboarding'],
    notIncluded: [],
    cta: 'Contact Sales', ctaStyle: { background: 'linear-gradient(135deg, #d97706, #b45309)', color: 'white', boxShadow: '0 8px 24px rgba(217,119,6,0.35)' },
  },
];

const SubscriptionModal = ({ onClose }) => {
  const [billing, setBilling] = useState('monthly');
  const [selected, setSelected] = useState('pro');

  const getPrice = (plan) => {
    if (plan.price === 0) return 'Free';
    const p = billing === 'yearly' ? Math.round(plan.price * 0.72) : plan.price;
    return `₹${p}`;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 720 }}>
        <div style={{ background: 'linear-gradient(135deg, #0f1f13 0%, #1a3a22 100%)', padding: '28px 32px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Transparent Pricing</div>
              <h2 className="syne" style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Choose Your Plan</h2>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 10, borderRadius: 12, cursor: 'pointer', display: 'flex' }}><X size={22} /></button>
          </div>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 4, width: 'fit-content' }}>
            {[['monthly', 'Monthly'], ['yearly', 'Yearly · Save 28%']].map(([v, l]) => (
              <button key={v} onClick={() => setBilling(v)} style={{ padding: '7px 18px', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s', background: billing === v ? 'white' : 'transparent', color: billing === v ? '#0f1f13' : 'rgba(255,255,255,0.55)' }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 28px', overflowY: 'auto', maxHeight: '70vh' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {plans.map(plan => (
              <div key={plan.id} onClick={() => setSelected(plan.id)}
                style={{ border: `2px solid ${selected === plan.id ? plan.color : '#e5e7eb'}`, borderRadius: 22, padding: '20px 18px', cursor: 'pointer', transition: 'all 0.25s', position: 'relative', background: selected === plan.id ? `${plan.color}06` : 'white' }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.color, color: 'white', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>{plan.badge}</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ background: `${plan.color}15`, padding: 10, borderRadius: 14, color: plan.color }}>{plan.icon}</div>
                  {selected === plan.id && <div style={{ background: plan.color, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="white" /></div>}
                </div>
                <div className="syne" style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ marginBottom: 16 }}>
                  <span className="syne" style={{ fontSize: 28, fontWeight: 800, color: plan.color }}>{getPrice(plan)}</span>
                  <span style={{ fontSize: 12, color: '#888' }}>{plan.period}{billing === 'yearly' && plan.price > 0 ? '/mo' : ''}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.slice(0, 6).map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                      <Check size={13} color={plan.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 12, color: '#444', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                  {plan.features.length > 6 && <div style={{ fontSize: 11, color: plan.color, fontWeight: 700, marginTop: 2 }}>+{plan.features.length - 6} more features</div>}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 24 }}>
            {plans.filter(p => p.id === selected).map(plan => (
              <div key={plan.id}>
                <button style={{ width: '100%', padding: '16px', borderRadius: 18, border: 'none', fontWeight: 800, fontSize: 16, cursor: plan.price === 0 ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', ...plan.ctaStyle }}>
                  {plan.cta}
                </button>
                {plan.id === 'pro' && (
                  <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 10 }}>
                    No credit card required for trial · Cancel anytime · Powered by <strong>Razorpay</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
