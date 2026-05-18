import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, MapPin, Leaf, Droplets, Users, Bell, X } from 'lucide-react';

const STEPS = [
  { id: 'welcome', title: 'Welcome to AgriBridge', subtitle: 'Set up your farm profile in 2 minutes' },
  { id: 'location', title: 'Where is your farm?', subtitle: 'We personalise advice by location' },
  { id: 'crops', title: 'What do you grow?', subtitle: 'Select all that apply' },
  { id: 'land', title: 'About your land', subtitle: 'Helps us predict yields accurately' },
  { id: 'goals', title: 'Your goals', subtitle: 'What matters most to you?' },
  { id: 'done', title: "You're all set! 🎉", subtitle: 'Your personalised farm dashboard is ready' },
];

const CROPS = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Tomato', 'Onion', 'Cotton', 'Sugarcane', 'Potato', 'Mustard', 'Groundnut', 'Sunflower'];
const STATES = ['Uttar Pradesh', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Odisha', 'West Bengal', 'Bihar', 'Jharkhand'];
const SOIL_TYPES = ['Sandy', 'Loamy', 'Clay', 'Black Cotton', 'Silty', 'Red'];
const GOALS = [
  { id: 'yield', icon: '🌾', label: 'Increase Yield' },
  { id: 'cost', icon: '💰', label: 'Reduce Costs' },
  { id: 'market', icon: '📈', label: 'Better Market Prices' },
  { id: 'water', icon: '💧', label: 'Save Water' },
  { id: 'disease', icon: '🔬', label: 'Prevent Crop Disease' },
  { id: 'loans', icon: '🏦', label: 'Access Credit & Loans' },
];

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '', state: '', district: '',
    crops: [], landArea: '2', soilType: 'Loamy',
    goals: [], language: 'en', notifications: true,
  });

  const progress = ((step) / (STEPS.length - 1)) * 100;
  const current = STEPS[step];

  const toggleCrop = (c) => setProfile(p => ({ ...p, crops: p.crops.includes(c) ? p.crops.filter(x => x !== c) : [...p.crops, c] }));
  const toggleGoal = (g) => setProfile(p => ({ ...p, goals: p.goals.includes(g) ? p.goals.filter(x => x !== g) : [...p.goals, g] }));

  const canNext = () => {
    if (step === 1) return profile.state;
    if (step === 2) return profile.crops.length > 0;
    if (step === 4) return profile.goals.length > 0;
    return true;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'linear-gradient(135deg, #050f08 0%, #0a1f10 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', system-ui, sans-serif", padding: 16,
    }}>
      {/* Background rings */}
      {[300, 500, 700].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: s, height: s, borderRadius: '50%', border: `1px solid rgba(74,222,128,${0.05 - i * 0.01})`, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', animation: `ringPulse ${3 + i}s ease-in-out infinite ${i * 0.5}s` }} />
      ))}

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        {/* Card */}
        <div style={{ background: '#0f2d1a', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 32, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}>

          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(74,222,128,0.1)' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #166534, #4ade80)', width: `${progress}%`, transition: 'width 0.5s ease', borderRadius: '0 2px 2px 0' }} />
          </div>

          {/* Header */}
          <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 6 }}>
                  Step {step + 1} of {STEPS.length}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0, fontFamily: "'Syne', system-ui" }}>{current.title}</h2>
                <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.55)', margin: '6px 0 0' }}>{current.subtitle}</p>
              </div>
              {step === 0 && (
                <div style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', padding: 14, borderRadius: 18, boxShadow: '0 6px 20px rgba(34,197,94,0.4)' }}>
                  <Leaf size={26} color="white" />
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 32px', minHeight: 280 }}>

            {/* Step 0: Welcome + Name */}
            {step === 0 && (
              <div style={{ animation: 'fadeUp 0.5s ease' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(134,239,172,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 8 }}>Your Name</label>
                  <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar" style={{ width: '100%', padding: '13px 18px', borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['en','hi','or','te','ta'].map(l => ({ en:'English',hi:'हिंदी',or:'ଓଡ଼ିଆ',te:'తెలుగు',ta:'தமிழ்'})[l] && (
                    <button key={l} onClick={() => setProfile({ ...profile, language: l })} style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${profile.language === l ? '#4ade80' : 'rgba(74,222,128,0.2)'}`, background: profile.language === l ? 'rgba(74,222,128,0.15)' : 'transparent', color: profile.language === l ? '#4ade80' : 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                      {({en:'English',hi:'हिंदी',or:'ଓଡ଼ିଆ',te:'తెలుగు',ta:'தமிழ்'})[l]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div style={{ animation: 'fadeUp 0.5s ease' }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(134,239,172,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 8 }}>State</label>
                  <select value={profile.state} onChange={e => setProfile({ ...profile, state: e.target.value })} style={{ width: '100%', padding: '13px 18px', borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: '#0a2010', color: 'white', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(134,239,172,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 8 }}>District (Optional)</label>
                  <input value={profile.district} onChange={e => setProfile({ ...profile, district: e.target.value })} placeholder="e.g. Varanasi" style={{ width: '100%', padding: '13px 18px', borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                </div>
              </div>
            )}

            {/* Step 2: Crops */}
            {step === 2 && (
              <div style={{ animation: 'fadeUp 0.5s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {CROPS.map(c => (
                    <button key={c} onClick={() => toggleCrop(c)} style={{ padding: '10px 8px', borderRadius: 14, border: `1.5px solid ${profile.crops.includes(c) ? '#4ade80' : 'rgba(74,222,128,0.15)'}`, background: profile.crops.includes(c) ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.03)', color: profile.crops.includes(c) ? '#4ade80' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                      {profile.crops.includes(c) && <Check size={12} />}{c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Land details */}
            {step === 3 && (
              <div style={{ animation: 'fadeUp 0.5s ease' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(134,239,172,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 8 }}>Total Land Area (acres)</label>
                  <input type="number" min="0.5" max="500" step="0.5" value={profile.landArea} onChange={e => setProfile({ ...profile, landArea: e.target.value })} style={{ width: '100%', padding: '13px 18px', borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 20, fontWeight: 700, fontFamily: 'inherit', outline: 'none', textAlign: 'center' }} />
                </div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(134,239,172,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 10 }}>Soil Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {SOIL_TYPES.map(s => (
                    <button key={s} onClick={() => setProfile({ ...profile, soilType: s })} style={{ padding: '10px', borderRadius: 14, border: `1.5px solid ${profile.soilType === s ? '#4ade80' : 'rgba(74,222,128,0.15)'}`, background: profile.soilType === s ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.03)', color: profile.soilType === s ? '#4ade80' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Goals */}
            {step === 4 && (
              <div style={{ animation: 'fadeUp 0.5s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {GOALS.map(g => (
                    <button key={g.id} onClick={() => toggleGoal(g.id)} style={{ padding: '14px 16px', borderRadius: 16, border: `1.5px solid ${profile.goals.includes(g.id) ? '#4ade80' : 'rgba(74,222,128,0.15)'}`, background: profile.goals.includes(g.id) ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.03)', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{g.icon}</span>
                      <span style={{ color: profile.goals.includes(g.id) ? '#4ade80' : 'rgba(255,255,255,0.7)' }}>{g.label}</span>
                      {profile.goals.includes(g.id) && <Check size={14} color="#4ade80" style={{ marginLeft: 'auto' }} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Done */}
            {step === 5 && (
              <div style={{ animation: 'fadeUp 0.5s ease', textAlign: 'center' }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🌾</div>
                <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 20, padding: '20px 24px', marginBottom: 20 }}>
                  {[
                    { label: 'Name', val: profile.name || 'Farmer' },
                    { label: 'State', val: profile.state },
                    { label: 'Crops', val: profile.crops.slice(0, 3).join(', ') + (profile.crops.length > 3 ? ` +${profile.crops.length - 3}` : '') },
                    { label: 'Land', val: `${profile.landArea} acres · ${profile.soilType}` },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: 13, color: '#4ade80', fontWeight: 700 }}>{val}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.5)', lineHeight: 1.7 }}>Your personalised advisory, yield predictions and market alerts are ready based on your profile.</p>
              </div>
            )}
          </div>

          {/* Footer nav */}
          <div style={{ padding: '20px 32px 28px', borderTop: '1px solid rgba(74,222,128,0.08)', display: 'flex', gap: 12 }}>
            {step > 0 && step < STEPS.length - 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{ padding: '13px 20px', borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                <ChevronLeft size={18} />
              </button>
            )}
            <button
              onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : onComplete(profile)}
              disabled={!canNext()}
              style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: canNext() ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(74,222,128,0.1)', color: canNext() ? 'white' : 'rgba(74,222,128,0.3)', fontWeight: 800, fontSize: 15, cursor: canNext() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: canNext() ? '0 8px 24px rgba(34,197,94,0.35)' : 'none' }}>
              {step === STEPS.length - 1 ? 'Open My Dashboard 🚀' : step === STEPS.length - 2 ? 'Finish Setup' : 'Continue'}
              {step < STEPS.length - 1 && <ChevronRight size={18} />}
            </button>
          </div>
        </div>

        {/* Skip */}
        {step < STEPS.length - 1 && (
          <button onClick={() => onComplete(profile)} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 'none', color: 'rgba(134,239,172,0.35)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
            Skip setup for now
          </button>
        )}
      </div>

      <style>{`
        @keyframes ringPulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5} 50%{transform:translate(-50%,-50%) scale(1.05);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
};

export default OnboardingFlow;
