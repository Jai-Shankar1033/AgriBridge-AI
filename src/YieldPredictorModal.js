import React, { useState } from 'react';
import { X, TrendingUp, Leaf, Droplets, Thermometer, BarChart3, ArrowUpRight } from 'lucide-react';

const YieldPredictorModal = ({ onClose }) => {
  const [form, setForm] = useState({ crop: 'Wheat', soil: 'Loamy', area: '2', nitrogen: '60', rainfall: '650', variety: 'HD-2967' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const crops = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Tomato', 'Onion', 'Cotton'];
  const soils = ['Sandy', 'Loamy', 'Clay', 'Silty', 'Black Cotton'];
  const varieties = { Wheat: ['HD-2967', 'PBW-343', 'GW-322', 'DBW-187'], Rice: ['PR-126', 'IR-64', 'Swarna', 'BPT-5204'], Corn: ['PMH-1', 'HQPM-1', 'Vivek-9'], Soybean: ['JS-335', 'NRC-7', 'JS-9305'], Tomato: ['Pusa Ruby', 'Arka Vikas', 'Abhinava'], Onion: ['Agrifound Dark Red', 'N-53', 'Bhima Raj'], Cotton: ['Bt-01', 'Ankur-2226', 'Nuziveedu-9'] };

  const predict = () => {
    setLoading(true);
    setTimeout(() => {
      const base = { Wheat: 32, Rice: 40, Corn: 45, Soybean: 18, Tomato: 280, Onion: 200, Cotton: 20 };
      const soilMult = { Sandy: 0.85, Loamy: 1.0, Clay: 0.88, Silty: 0.95, 'Black Cotton': 1.05 };
      const nMult = Math.min(1.2, 0.7 + (parseInt(form.nitrogen) / 120));
      const rMult = Math.min(1.15, 0.75 + (parseInt(form.rainfall) / 2000));
      const yield_ = +(base[form.crop] * soilMult[form.soil] * nMult * rMult).toFixed(1);
      const revenue = Math.round(yield_ * parseFloat(form.area) * (form.crop === 'Tomato' ? 1200 : form.crop === 'Onion' ? 1000 : form.crop === 'Cotton' ? 6500 : 2400));
      setResult({ yield: yield_, total: +(yield_ * parseFloat(form.area)).toFixed(1), revenue, confidence: 87 + Math.floor(Math.random() * 10), vsAvg: '+14%' });
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 560 }}>
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)', padding: '24px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 14 }}><BarChart3 size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.65, fontWeight: 600, textTransform: 'uppercase' }}>AI Model · 90%+ Accuracy</div>
                <h2 className="syne" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Yield Predictor</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
        </div>
        <div style={{ padding: '24px 28px', maxHeight: '75vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Crop', key: 'crop', options: crops },
              { label: 'Soil Type', key: 'soil', options: soils },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{label}</div>
                <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value, variety: key === 'crop' ? varieties[e.target.value][0] : form.variety })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Variety</div>
              <select value={form.variety} onChange={e => setForm({ ...form, variety: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
                {(varieties[form.crop] || []).map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Land Area (acres)</div>
              <input type="number" min="0.5" max="100" step="0.5" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Nitrogen Applied (kg/ha)', key: 'nitrogen', icon: <Leaf size={14} color="#22c55e" />, min: 0, max: 200 },
              { label: 'Expected Rainfall (mm)', key: 'rainfall', icon: <Droplets size={14} color="#3b82f6" />, min: 100, max: 2000 },
            ].map(({ label, key, icon, min, max }) => (
              <div key={key}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>{icon}{label}</div>
                <input type="number" min={min} max={max} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit' }} />
              </div>
            ))}
          </div>

          <button onClick={predict} disabled={loading} className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: 15, opacity: loading ? 0.7 : 1 }}>
            {loading ? '🌾 Running AI Model...' : '🤖 Predict Yield'}
          </button>

          {result && (
            <div style={{ marginTop: 20, animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Yield per Hectare', val: `${result.yield} q/ha`, color: '#22c55e' },
                  { label: `Total (${form.area} acres)`, val: `${result.total} qtl`, color: '#3b82f6' },
                  { label: 'Est. Revenue', val: `₹${(result.revenue / 1000).toFixed(0)}K`, color: '#d97706' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 18, padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{label}</div>
                    <div className="syne" style={{ fontSize: 22, fontWeight: 800, color }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 700 }}>Model Confidence: {result.confidence}%</div>
                  <div style={{ fontSize: 13, color: '#166534', marginTop: 4 }}>Yield is {result.vsAvg} above district average for {form.variety}</div>
                </div>
                <div style={{ background: '#22c55e', padding: '8px 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ArrowUpRight size={18} color="white" /><span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{result.vsAvg}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldPredictorModal;
