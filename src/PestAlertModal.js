import React, { useState } from 'react';
import { X, Upload, AlertTriangle, CheckCircle2, Bug, Leaf, RefreshCw, ShieldCheck } from 'lucide-react';

const pestDatabase = [
  {
    name: 'Aphid Infestation (माहू)',
    confidence: 96.4,
    severity: 'High',
    severityColor: '#ef4444',
    affectedArea: '~35% of field',
    spread: 'Rapid — spreads within 48h in humid conditions',
    organicTreatment: ['Spray Neem oil 5ml/L water', 'Release Ladybug predators (available at KVK)', 'Yellow sticky traps near border rows'],
    chemicalTreatment: ['Imidacloprid 17.8% SL @ 0.5ml/L', 'Thiamethoxam 25% WG @ 0.2g/L'],
    preventionTips: 'Avoid excess nitrogen. Maintain field hygiene. Monitor weekly.',
    icon: '🪲',
  },
  {
    name: 'Parthenium Weed (गाजर घास)',
    confidence: 99.1,
    severity: 'Medium',
    severityColor: '#f59e0b',
    affectedArea: '~15% of border area',
    spread: 'Seeds spread via wind & water',
    organicTreatment: ['Hand-pull before flowering', 'Mulching to suppress germination', 'Introduce Zygogramma beetle (biocontrol)'],
    chemicalTreatment: ['Atrazine 50% WP @ 1kg/ha (pre-emergence)', 'Glyphosate 41% SL @ 1.6L/ha'],
    preventionTips: 'Clean farm equipment. Don\'t allow flowering. Early detection is key.',
    icon: '🌿',
  },
];

const PestAlertModal = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('organic');
  const [resultIndex, setResultIndex] = useState(0);

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (f) { setImage(URL.createObjectURL(f)); setResult(null); }
  };

  const analyze = () => {
    setAnalyzing(true); setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 3, 95)), 70);
    setTimeout(() => {
      clearInterval(iv); setProgress(100);
      setTimeout(() => { setAnalyzing(false); setResult(pestDatabase); }, 400);
    }, 3200);
  };

  const current = result?.[resultIndex];

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <div style={{ background: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)', padding: '24px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 14 }}><Bug size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.65, fontWeight: 600, textTransform: 'uppercase' }}>Vision AI · Field Scanner</div>
                <h2 className="syne" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Pest & Weed Alert</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Upload zone */}
          <div style={{ width: '100%', height: 220, borderRadius: 22, border: `2px dashed ${image ? 'transparent' : '#e5e7eb'}`, background: image ? 'transparent' : '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', marginBottom: 18 }}>
            {image ? (
              <>
                <img src={image} alt="Field" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
                {!result && !analyzing && (
                  <button onClick={() => setImage(null)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: '#fef3c7', padding: 18, borderRadius: '50%', display: 'inline-flex', marginBottom: 12 }}><Upload size={36} color="#b45309" /></div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>Upload field / leaf photo</p>
                <p style={{ fontSize: 11, color: '#ccc', margin: '6px 0 0' }}>Detects 80+ pests · 40+ weed species</p>
              </div>
            )}

            {analyzing && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(180,83,9,0.93)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: 20 }}>
                <Bug size={44} style={{ animation: 'spinSlow 1.5s linear infinite', marginBottom: 14 }} />
                <div className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>SCANNING FIELD</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 14 }}>Cross-referencing 80+ pest signatures...</div>
                <div style={{ width: 180, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'white', borderRadius: 4, width: `${progress}%`, transition: 'width 0.08s' }} />
                </div>
                <div style={{ fontSize: 12, marginTop: 8, opacity: 0.65 }}>{progress}%</div>
              </div>
            )}
          </div>

          {!image ? (
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', background: '#111', color: 'white', borderRadius: 16, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
              <Bug size={18} /> SCAN FIELD NOW
            </label>
          ) : !result && !analyzing ? (
            <button onClick={analyze} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#b45309,#92400e)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 24px rgba(180,83,9,0.3)' }}>
              RUN PEST ANALYSIS
            </button>
          ) : null}

          {result && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Pest switcher */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {result.map((r, i) => (
                  <button key={i} onClick={() => { setResultIndex(i); setActiveTab('organic'); }} style={{ flex: 1, padding: '8px', borderRadius: 14, border: `2px solid ${resultIndex === i ? current?.severityColor || '#b45309' : '#e5e7eb'}`, background: resultIndex === i ? `${current?.severityColor}10` : 'white', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                    {r.icon} {r.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Result card */}
              <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 20, padding: '18px 20px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 3 }}>Detected</div>
                    <div className="syne" style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a' }}>{current.icon} {current.name}</div>
                  </div>
                  <span style={{ background: `${current.severityColor}15`, color: current.severityColor, border: `1px solid ${current.severityColor}30`, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
                    {current.severity} Severity
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                  <span style={{ color: '#555' }}>📍 {current.affectedArea}</span>
                  <span style={{ color: '#555' }}>⚡ {current.confidence}% match</span>
                </div>
                <div style={{ marginTop: 8, padding: '8px 12px', background: '#fff8f0', borderRadius: 10, fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>
                  <AlertTriangle size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />{current.spread}
                </div>
              </div>

              {/* Treatment tabs */}
              <div style={{ display: 'flex', background: '#f5f5f5', padding: 4, borderRadius: 14, marginBottom: 14 }}>
                {[['organic', '🌿 Organic'], ['chemical', '⚗️ Chemical'], ['prevent', '🛡️ Prevent']].map(([v, l]) => (
                  <button key={v} onClick={() => setActiveTab(v)} style={{ flex: 1, padding: '7px', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s', background: activeTab === v ? 'white' : 'transparent', color: activeTab === v ? '#b45309' : '#888', boxShadow: activeTab === v ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>{l}</button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeTab === 'prevent' ? (
                  <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', padding: '14px 16px', borderRadius: 14, display: 'flex', gap: 10 }}>
                    <ShieldCheck size={20} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: '#166534', lineHeight: 1.6 }}>{current.preventionTips}</span>
                  </div>
                ) : (activeTab === 'organic' ? current.organicTreatment : current.chemicalTreatment).map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'white', border: '1px solid #f0f0f0', borderRadius: 14 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: activeTab === 'organic' ? '#dcfce7' : '#fee2e2', color: activeTab === 'organic' ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => { setImage(null); setResult(null); setProgress(0); }} style={{ width: '100%', marginTop: 14, padding: '10px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: 14, color: '#888', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <RefreshCw size={14} /> Scan Another Field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestAlertModal;
