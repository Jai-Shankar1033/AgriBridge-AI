import React, { useState } from 'react';
import { X, CheckCircle2, Clock, IndianRupee, Shield, FileText, ChevronRight, AlertTriangle } from 'lucide-react';

const LENDERS = [
  { id: 'kinara', name: 'Kinara Capital', rate: '0%', tenure: 'Pay after harvest', limit: '₹50,000', approval: '2 hours', logo: '🏦', badge: 'Zero Interest', color: '#22c55e' },
  { id: 'aye',    name: 'Aye Finance',    rate: '1.5%/mo', tenure: '6 months', limit: '₹1,00,000', approval: '4 hours', logo: '🏛️', badge: 'High limit', color: '#3b82f6' },
  { id: 'nfb',    name: 'NaviKisan',      rate: '0.8%/mo', tenure: '9 months', limit: '₹75,000', approval: '24 hours', logo: '🌾', badge: 'Flexible', color: '#8b5cf6' },
];

const PRODUCTS = [
  { id: 'p1', name: 'DAP Fertilizer 10 bags', price: 8800, category: 'Fertilizer', icon: '🌿' },
  { id: 'p2', name: 'Hybrid Wheat Seed 20kg', price: 5800, category: 'Seeds', icon: '🌾' },
  { id: 'p3', name: 'Drip Irrigation Kit', price: 12500, category: 'Equipment', icon: '💧' },
  { id: 'p4', name: 'Pesticide Bundle', price: 3200, category: 'Pesticide', icon: '🔬' },
  { id: 'p5', name: 'Urea 50kg × 5 bags', price: 1900, category: 'Fertilizer', icon: '💛' },
];

const BNPLModal = ({ onClose }) => {
  const [step, setStep] = useState('products'); // products | lender | kyc | success
  const [cart, setCart] = useState({ p1: false, p2: false });
  const [selectedLender, setSelectedLender] = useState('kinara');
  const [kyc, setKyc] = useState({ aadhaar: '', mobile: '', landArea: '2.5', crop: 'Wheat', harvestMonth: 'February 2026' });
  const [kycDone, setKycDone] = useState(false);
  const [processing, setProcessing] = useState(false);

  const cartItems = PRODUCTS.filter(p => cart[p.id]);
  const total = cartItems.reduce((s, p) => s + p.price, 0);
  const lender = LENDERS.find(l => l.id === selectedLender);

  const handleApply = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep('success'); }, 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 580 }}>
        <div style={{ background: 'linear-gradient(135deg,#1c1917 0%,#292524 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 14, fontSize: 22 }}>💳</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Harvest-linked repayment</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Buy Now · Pay After Harvest</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            {['✅ Aadhaar KYC','⚡ 2-hr approval','🌾 Pay after harvest','0% interest option'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            {[['products','1 Select items'],['lender','2 Choose credit'],['kyc','3 Quick KYC'],['success','4 Approved']].map(([s, l], i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: step === s ? 1 : 0.4 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: step === s ? '#1c1917' : '#e5e7eb', color: step === s ? 'white' : '#aaa', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i+1}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', color: step === s ? '#1c1917' : '#aaa' }}>{l.slice(2)}</span>
                </div>
                {i < 3 && <div style={{ flex: 1, height: 1, background: '#e5e7eb', minWidth: 10 }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 8 }}>Credit Approved!</div>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 20, lineHeight: 1.7 }}>
                <strong>{lender?.name}</strong> has approved your ₹{total.toLocaleString('en-IN')} input credit.<br />
                Your order will be delivered within 3 working days.
              </p>
              <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 18, padding: '16px 20px', marginBottom: 16, textAlign: 'left' }}>
                {[['Credit amount','₹'+total.toLocaleString('en-IN')],['Lender',lender?.name],['Repayment',kyc.harvestMonth],['Interest',lender?.rate],['Reference','AGRI-BNPL-'+Math.floor(Math.random()*90000+10000)]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ color: '#888' }}>{k}</span><span style={{ fontWeight: 700, color: '#1c1917' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} style={{ padding: '12px 28px', background: '#1c1917', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
            </div>
          ) : step === 'products' ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Select inputs to buy on credit</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {PRODUCTS.map(p => (
                  <div key={p.id} onClick={() => setCart(c => ({ ...c, [p.id]: !c[p.id] }))}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 16px', background: cart[p.id] ? '#fafaf9' : '#fafafa', border: `1.5px solid ${cart[p.id] ? '#1c1917' : '#f0f0f0'}`, borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 24 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{p.category}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18 }}>₹{p.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: cart[p.id] ? '#1c1917' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                      {cart[p.id] && <CheckCircle2 size={14} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
              {total > 0 && (
                <div style={{ background: 'linear-gradient(135deg,#1c1917,#292524)', borderRadius: 18, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Credit needed</div><div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 22, color: 'white' }}>₹{total.toLocaleString('en-IN')}</div></div>
                  <button onClick={() => setStep('lender')} style={{ padding: '11px 22px', background: 'white', color: '#1c1917', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : step === 'lender' ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Choose Credit Partner</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {LENDERS.map(l => (
                  <div key={l.id} onClick={() => setSelectedLender(l.id)}
                    style={{ border: `2px solid ${selectedLender === l.id ? l.color : '#e5e7eb'}`, borderRadius: 18, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s', background: selectedLender === l.id ? `${l.color}08` : 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ fontSize: 28 }}>{l.logo}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>Limit: {l.limit} · Approval: {l.approval}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ background: l.color, color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 20 }}>{l.badge}</span>
                        <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18, color: l.color, marginTop: 4 }}>{l.rate}</div>
                        <div style={{ fontSize: 11, color: '#aaa' }}>{l.tenure}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('kyc')} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#1c1917,#292524)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(28,25,23,0.3)' }}>
                Continue with {lender?.name} <ChevronRight size={18} />
              </button>
            </>
          ) : (
            <>
              <div style={{ background: '#fef3c7', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14, padding: '12px 16px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Shield size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                  <strong>Secure KYC</strong> — Your Aadhaar number is encrypted and never stored. Only used for identity verification with {lender?.name}.
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {[
                  { label: 'Aadhaar Number', key: 'aadhaar', placeholder: 'XXXX-XXXX-XXXX', type: 'text' },
                  { label: 'Mobile (linked to Aadhaar)', key: 'mobile', placeholder: '10-digit number', type: 'tel' },
                  { label: 'Land Area (acres)', key: 'landArea', placeholder: '2.5', type: 'number' },
                  { label: 'Expected Harvest Month', key: 'harvestMonth', placeholder: 'February 2026', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{f.label}</div>
                    <input type={f.type} placeholder={f.placeholder} value={kyc[f.key]}
                      onChange={e => setKyc(k => ({ ...k, [f.key]: e.target.value }))}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, cursor: 'pointer', alignItems: 'flex-start' }} onClick={() => setKycDone(!kycDone)}>
                <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${kycDone ? '#22c55e' : '#ccc'}`, background: kycDone ? '#22c55e' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {kycDone && <CheckCircle2 size={13} color="white" />}
                </div>
                <span style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>I agree to the <strong>loan terms</strong> and consent to Aadhaar-based eKYC as per RBI guidelines. My farm data may be shared with {lender?.name} for credit assessment.</span>
              </div>
              <button onClick={handleApply} disabled={!kycDone || processing} style={{ width: '100%', padding: '14px', background: !kycDone || processing ? '#e5e7eb' : 'linear-gradient(135deg,#1c1917,#292524)', color: !kycDone || processing ? '#aaa' : 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: !kycDone || processing ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: !kycDone ? 'none' : '0 6px 20px rgba(28,25,23,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                {processing ? '⏳ Verifying with lender...' : `Apply for ₹${total.toLocaleString('en-IN')} Credit`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BNPLModal;
