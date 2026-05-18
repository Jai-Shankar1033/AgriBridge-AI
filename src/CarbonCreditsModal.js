import React, { useState } from 'react';
import { X, Leaf, TrendingUp, Award, ArrowUpRight, CheckCircle2, Clock, ExternalLink, RefreshCw } from 'lucide-react';

const PRACTICES = [
  { id: 'noTill',    label: 'Zero/Reduced Tillage',    icon: '🌱', credits: 1.8, adopted: true,  desc: 'Reduces soil carbon release by 40%' },
  { id: 'coverCrop', label: 'Cover Cropping',          icon: '🌿', credits: 1.2, adopted: false, desc: 'Legume cover crops fix N + add organic matter' },
  { id: 'drip',      label: 'Drip Irrigation',         icon: '💧', credits: 0.9, adopted: true,  desc: 'Reduces N₂O emissions from waterlogging' },
  { id: 'compost',   label: 'Compost Application',     icon: '🟤', credits: 1.5, adopted: false, desc: '4 t/acre compost sequesters ~0.3 t CO₂/yr' },
  { id: 'agroforest', label: 'Agroforestry (trees)',   icon: '🌳', credits: 3.2, adopted: false, desc: 'Intercropping trees sequesters most carbon' },
  { id: 'biochar',   label: 'Biochar Amendment',       icon: '⚫', credits: 2.1, adopted: false, desc: 'Biochar locks carbon for 1,000+ years' },
];

const BUYERS = [
  { name: 'Microsoft Climate Pledge', logo: '🔵', pricePerCredit: 1850, currency: 'INR', type: 'Corporate offsetting', volume: '50,000 credits/yr' },
  { name: 'Gold Standard Registry',   logo: '🥇', pricePerCredit: 2200, currency: 'INR', type: 'Premium verified',    volume: 'Unlimited' },
  { name: 'VERRA VCS Program',        logo: '🌍', pricePerCredit: 1650, currency: 'INR', type: 'International std',  volume: 'Unlimited' },
  { name: 'Indian Carbon Market',     logo: '🇮🇳', pricePerCredit: 1200, currency: 'INR', type: 'BEE / MoEFCC',       volume: '10,000 credits/yr' },
];

const CarbonCreditsModal = ({ onClose }) => {
  const [adopted, setAdopted]   = useState({ noTill: true, drip: true });
  const [step, setStep]         = useState('dashboard'); // dashboard | enroll | marketplace | success
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  const landArea    = 2.5; // acres
  const totalCredits = Object.entries(adopted)
    .filter(([, v]) => v)
    .reduce((acc, [id]) => acc + (PRACTICES.find(p => p.id === id)?.credits || 0), 0);
  const annualCredits = +(totalCredits * landArea).toFixed(1);
  const annualRevenue = Math.round(annualCredits * 1650);

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => { setEnrolling(false); setStep('success'); }, 2200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 600 }}>
        <div style={{ background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 14, fontSize: 22 }}>🌍</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Climate Corp model · VERRA</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Carbon Credits</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            {[['🌱 '+annualCredits,'Credits/yr'],['₹'+annualRevenue.toLocaleString('en-IN'),'Annual income'],['2.5 ac','Your farm']].map(([v,l]) => (
              <div key={l}><div style={{ fontWeight: 800, fontSize: 14 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.5 }}>{l}</div></div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Nav tabs */}
          <div style={{ display: 'flex', background: '#f5f5f5', padding: 4, borderRadius: 14, marginBottom: 20 }}>
            {[['dashboard','📊 Dashboard'],['enroll','📝 Register'],['marketplace','💰 Sell Credits']].map(([v,l]) => (
              <button key={v} onClick={() => setStep(v)} style={{ flex: 1, padding: '8px', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s', background: step === v ? 'white' : 'transparent', color: step === v ? '#052e16' : '#888', boxShadow: step === v ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>{l}</button>
            ))}
          </div>

          {step === 'success' ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>🌍</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, color: '#052e16', marginBottom: 8 }}>Enrolled in Carbon Programme!</div>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>Your farm is now registered on the <strong>VERRA VCS Registry</strong>. A field verifier will visit within 30 days. First credit payment expected in 90 days.</p>
              <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '16px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Your registry ID</div>
                <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 20, color: '#052e16' }}>VERRA-IN-{Math.floor(Math.random()*90000+10000)}</div>
              </div>
              <button onClick={() => setStep('dashboard')} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>View Dashboard</button>
            </div>
          ) : step === 'dashboard' ? (
            <>
              {/* Credit gauge */}
              <div style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 22, padding: '20px 24px', marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
                  {[['🌱 '+annualCredits,'Credits/yr','tCO₂e sequestered'],['💰 ₹'+annualRevenue.toLocaleString('en-IN'),'Annual income','at ₹1,650/credit'],['📈 +32%','vs baseline','emission reduction']].map(([v,l,s]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Syne',system-ui", fontSize: 20, fontWeight: 800, color: '#052e16' }}>{v}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#166534', marginTop: 2 }}>{l}</div>
                      <div style={{ fontSize: 10, color: '#aaa', marginTop: 1 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practices */}
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Regenerative Practices</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PRACTICES.map(p => (
                  <div key={p.id} onClick={() => setAdopted(a => ({ ...a, [p.id]: !a[p.id] }))}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 16px', background: adopted[p.id] ? '#f0fdf4' : '#fafafa', border: `1px solid ${adopted[p.id] ? 'rgba(34,197,94,0.25)' : '#f0f0f0'}`, borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{p.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 16, color: '#16a34a' }}>+{p.credits}</div>
                      <div style={{ fontSize: 10, color: '#aaa' }}>credits/acre</div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: adopted[p.id] ? '#22c55e' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                      {adopted[p.id] && <CheckCircle2 size={14} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : step === 'enroll' ? (
            <>
              <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#052e16', marginBottom: 6 }}>Registration Process</div>
                {[['Field GPS verification','Automatic via your location'],['MRV baseline survey','AI + satellite — no site visit'],['VERRA registry entry','Digital + Aadhaar linked'],['First credit payment','Within 90 days of verification']].map(([title, desc], i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div><div style={{ fontSize: 11, color: '#888' }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 18, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#555' }}>Estimated annual credits</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>{annualCredits} tCO₂e</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#555' }}>Estimated annual income</span>
                  <span style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18, color: '#052e16' }}>₹{annualRevenue.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button onClick={handleEnroll} disabled={enrolling} style={{ width: '100%', padding: '14px', background: enrolling ? '#e5e7eb' : 'linear-gradient(135deg,#052e16,#166534)', color: enrolling ? '#aaa' : 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: enrolling ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: enrolling ? 'none' : '0 6px 20px rgba(5,46,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {enrolling ? <><RefreshCw size={16} style={{ animation: 'spinSlow 1s linear infinite' }} /> Registering on VERRA...</> : '🌍 Register for Carbon Credits'}
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 14 }}>Available Buyers · Your {annualCredits} credits</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BUYERS.map((b, i) => (
                  <div key={i} onClick={() => setSelectedBuyer(selectedBuyer === i ? null : i)}
                    style={{ background: selectedBuyer === i ? '#f0fdf4' : '#fafafa', border: `1px solid ${selectedBuyer === i ? 'rgba(34,197,94,0.3)' : '#f0f0f0'}`, borderRadius: 18, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ fontSize: 28 }}>{b.logo}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>{b.type} · {b.volume}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 20, color: '#052e16' }}>₹{b.pricePerCredit}</div>
                        <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>₹{(b.pricePerCredit * annualCredits).toLocaleString('en-IN')}/yr</div>
                      </div>
                    </div>
                    {selectedBuyer === i && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(34,197,94,0.15)', display: 'flex', gap: 8 }}>
                        <button style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg,#052e16,#166534)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Sell My Credits
                        </button>
                        <button style={{ padding: '10px 14px', background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#555', fontFamily: 'inherit' }}>
                          <ExternalLink size={14} /> Learn More
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsModal;
