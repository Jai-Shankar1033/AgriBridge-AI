import React, { useState } from 'react';
import { X, MapPin, Star, Clock, CheckCircle2, Phone, Calendar, Zap, Shield, Wind, ArrowRight, ChevronRight } from 'lucide-react';

const DRONES = [
  { id: 'd1', operator: 'Vikram Singh', drone: 'DJI Agras T40', rating: 4.9, reviews: 234, pricePerAcre: 750, available: true, location: 'Varanasi, U.P.', distance: '3.2 km', tank: '40L', coverage: '40 acres/day', speciality: ['Wheat', 'Rice', 'Sugarcane'], badge: '⭐ Top Rated', certExpiry: 'Dec 2026', phone: '+91-9876543210', completedJobs: 1240, responseTime: '< 30 min', img: '🚁' },
  { id: 'd2', operator: 'Priya Farmers Drone Co.', drone: 'XAG P100 Pro', rating: 4.8, reviews: 187, pricePerAcre: 820, available: true, location: 'Mirzapur, U.P.', distance: '8.1 km', tank: '25L', coverage: '35 acres/day', speciality: ['Cotton', 'Tomato', 'Onion'], badge: '🏆 Verified', certExpiry: 'Mar 2026', phone: '+91-9876543211', completedJobs: 890, responseTime: '< 1 hr', img: '🛸' },
  { id: 'd3', operator: 'AgroFly Services', drone: 'Garuda Aerospace Agri', rating: 4.7, reviews: 98, pricePerAcre: 680, available: false, location: 'Chandauli, U.P.', distance: '12.4 km', tank: '16L', coverage: '25 acres/day', speciality: ['Wheat', 'Mustard', 'Corn'], badge: '🇮🇳 Made in India', certExpiry: 'Jun 2026', phone: '+91-9876543212', completedJobs: 445, responseTime: '< 2 hr', img: '✈️' },
  { id: 'd4', operator: 'Smart Kisan Drone', drone: 'IdeaForge RYNO', rating: 4.6, reviews: 67, pricePerAcre: 600, available: true, location: 'Jaunpur, U.P.', distance: '18.7 km', tank: '10L', coverage: '20 acres/day', speciality: ['Rice', 'Wheat'], badge: '💰 Budget', certExpiry: 'Sep 2026', phone: '+91-9876543213', completedJobs: 210, responseTime: '< 3 hr', img: '🚀' },
];

const SERVICES = [
  { id: 's1', name: 'Pesticide Spraying', icon: '💊', desc: 'Precise chemical spray reducing usage by 30%', priceMultiplier: 1.0 },
  { id: 's2', name: 'Fertilizer Spraying', icon: '🌿', desc: 'Liquid fertilizer application for uniform coverage', priceMultiplier: 0.9 },
  { id: 's3', name: 'Fungicide Treatment', icon: '🔬', desc: 'Disease prevention and treatment spraying', priceMultiplier: 1.1 },
  { id: 's4', name: 'Field Mapping (NDVI)', icon: '🛰️', desc: 'Generate crop health maps from aerial imagery', priceMultiplier: 1.5 },
  { id: 's5', name: 'Seed Sowing', icon: '🌱', desc: 'Aerial seeding for large area paddy cultivation', priceMultiplier: 1.3 },
];

const DroneMarketplaceModal = ({ onClose }) => {
  const [step, setStep] = useState('list'); // list | detail | book | confirm
  const [selected, setSelected] = useState(null);
  const [service, setService] = useState('s1');
  const [acres, setAcres] = useState(2);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [booked, setBooked] = useState(false);

  const selectedService = SERVICES.find(s => s.id === service);
  const totalCost = selected ? Math.round(selected.pricePerAcre * selectedService?.priceMultiplier * acres) : 0;
  const platformFee = Math.round(totalCost * 0.12);
  const operatorEarning = totalCost - platformFee;

  const timeSlots = [
    { id: 'early', label: '5:00 AM – 7:00 AM', desc: 'Best — low wind, cool temp', recommended: true },
    { id: 'morning', label: '7:00 AM – 10:00 AM', desc: 'Good conditions', recommended: false },
    { id: 'evening', label: '4:00 PM – 7:00 PM', desc: 'After heat — acceptable', recommended: false },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 600 }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 14, fontSize: 22 }}>🚁</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>XAG model · India</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Drone Marketplace</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            {[['🚁 10,000+', 'Licensed operators'], ['💰 ₹600-900', 'Per acre'], ['⚡ 40 acres', 'Per day capacity']].map(([v, l]) => (
              <div key={l}><div style={{ fontWeight: 800, fontSize: 13 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.55 }}>{l}</div></div>
            ))}
          </div>
        </div>

        <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          {booked ? (
            <div style={{ padding: '40px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Booking Confirmed!</div>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
                <strong>{selected?.operator}</strong> will arrive on {date || 'tomorrow'} at {timeSlots.find(t => t.id === timeSlot)?.label}.<br />
                You'll get a WhatsApp confirmation with operator contact.
              </p>
              <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#555' }}>Total cost ({acres} acres)</span>
                  <span style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18, color: '#166534' }}>₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ fontSize: 11, color: '#aaa' }}>Pay operator on completion · AgriBridge fee: ₹{platformFee}</div>
              </div>
              <button onClick={() => { setBooked(false); setStep('list'); setSelected(null); }} style={{ padding: '12px 28px', background: '#0f172a', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Book Another Drone
              </button>
            </div>
          ) : step === 'list' ? (
            <div style={{ padding: '20px 28px' }}>
              {/* Service selector */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 10 }}>Select Service</div>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => setService(s.id)} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s', background: service === s.id ? '#0f172a' : '#f5f5f5', color: service === s.id ? 'white' : '#666' }}>
                      {s.icon} {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area input */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 16, padding: '14px 18px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Field size</div>
                  <div style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800 }}>{acres} acres</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 4, 8, 12].map(a => (
                    <button key={a} onClick={() => setAcres(a)} style={{ width: 36, height: 36, borderRadius: 10, border: `2px solid ${acres === a ? '#0f172a' : '#e5e7eb'}`, background: acres === a ? '#0f172a' : 'white', color: acres === a ? 'white' : '#555', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{a}</button>
                  ))}
                </div>
              </div>

              {/* Operator list */}
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Available Operators Near You</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DRONES.map(d => (
                  <div key={d.id} onClick={() => d.available && (setSelected(d), setStep('book'))}
                    style={{ background: '#fafafa', border: `1px solid ${d.available ? '#f0f0f0' : '#f0f0f0'}`, borderRadius: 20, padding: '16px 18px', cursor: d.available ? 'pointer' : 'not-allowed', opacity: d.available ? 1 : 0.5, transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{d.img}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{d.operator}</div>
                            <div style={{ fontSize: 11, color: '#888' }}>{d.drone} · {d.tank} tank</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 16, color: '#0f172a' }}>₹{Math.round(d.pricePerAcre * (selectedService?.priceMultiplier || 1))}<span style={{ fontSize: 11, fontWeight: 400 }}>/acre</span></div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>₹{Math.round(d.pricePerAcre * (selectedService?.priceMultiplier || 1) * acres).toLocaleString('en-IN')} total</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 700 }}><Star size={12} color="#f59e0b" fill="#f59e0b" />{d.rating} ({d.reviews})</span>
                          <span style={{ fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} />{d.distance}</span>
                          <span style={{ fontSize: 11, color: '#888' }}><Clock size={10} style={{ verticalAlign: 'middle' }} /> {d.responseTime}</span>
                          <span style={{ background: '#f0fdf4', color: '#166534', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{d.badge}</span>
                          {!d.available && <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>Busy Today</span>}
                        </div>
                      </div>
                      {d.available && <ChevronRight size={18} color="#ccc" style={{ flexShrink: 0, marginTop: 4 }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: '24px 28px' }}>
              <button onClick={() => setStep('list')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', fontSize: 13, fontFamily: 'inherit', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 5 }}>← Back to operators</button>

              {/* Operator summary */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 18, padding: '16px 18px', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{selected?.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{selected?.operator}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{selected?.drone} · {selected?.completedJobs} jobs completed</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700 }}><Star size={14} color="#f59e0b" fill="#f59e0b" />{selected?.rating}</div>
                </div>
              </div>

              {/* Date picker */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 8 }}>Select Date</div>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit' }} />
              </div>

              {/* Time slots */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 10 }}>Preferred Time Slot</div>
                {timeSlots.map(t => (
                  <div key={t.id} onClick={() => setTimeSlot(t.id)} style={{ padding: '12px 16px', border: `2px solid ${timeSlot === t.id ? '#0f172a' : '#e5e7eb'}`, borderRadius: 14, marginBottom: 8, cursor: 'pointer', background: timeSlot === t.id ? '#f8fafc' : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>{t.desc}</div>
                    </div>
                    {t.recommended && <span style={{ background: '#dcfce7', color: '#166534', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>Recommended</span>}
                  </div>
                ))}
              </div>

              {/* Cost summary */}
              <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', border: '1px solid #e5e7eb', borderRadius: 18, padding: '16px 20px', marginBottom: 16 }}>
                {[
                  [`${selectedService?.name} × ${acres} acres`, `₹${(selected?.pricePerAcre * (selectedService?.priceMultiplier || 1)).toFixed(0)} × ${acres}`],
                  ['AgriBridge platform fee (12%)', `₹${platformFee}`],
                  ['Operator earns', `₹${operatorEarning}`],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: '#555' }}>
                    <span>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: 10, marginTop: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Total</span>
                  <span style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 20, color: '#0f172a' }}>₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>💡 Pay after job completion · Cancel 4h before for full refund</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { if (navigator.share) navigator.share({ title: 'Share with operator', text: `Hi, I booked drone spraying for ${acres} acres via AgriBridge. Please confirm.` }); }} style={{ padding: '13px 16px', background: '#25D366', color: 'white', border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
                  <Phone size={16} /> WhatsApp
                </button>
                <button onClick={() => setBooked(true)} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(15,23,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  🚁 Confirm Booking <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DroneMarketplaceModal;
