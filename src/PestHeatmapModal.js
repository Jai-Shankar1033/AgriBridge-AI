import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Bell, MapPin, Users, TrendingUp, CheckCircle2, Share2 } from 'lucide-react';

const DISTRICTS = [
  { name: 'Varanasi',      state: 'U.P.',     lat: 25.3, lon: 82.9, reports: 487, pest: 'Yellow Rust',         crop: 'Wheat',   severity: 'critical', trend: '+34%' },
  { name: 'Lucknow',       state: 'U.P.',     lat: 26.8, lon: 80.9, reports: 234, pest: 'Aphid',              crop: 'Mustard', severity: 'high',     trend: '+12%' },
  { name: 'Kanpur',        state: 'U.P.',     lat: 26.4, lon: 80.3, reports: 156, pest: 'Pink Bollworm',      crop: 'Cotton',  severity: 'medium',   trend: '-5%'  },
  { name: 'Nashik',        state: 'Mah.',     lat: 19.9, lon: 73.7, reports: 389, pest: 'Early Blight',       crop: 'Tomato',  severity: 'critical', trend: '+67%' },
  { name: 'Pune',          state: 'Mah.',     lat: 18.5, lon: 73.8, reports: 201, pest: 'Thrips',             crop: 'Onion',   severity: 'high',     trend: '+8%'  },
  { name: 'Coimbatore',    state: 'T.N.',     lat: 11.0, lon: 76.9, reports: 145, pest: 'Stem Borer',         crop: 'Rice',    severity: 'high',     trend: '+21%' },
  { name: 'Nalgonda',      state: 'Tel.',     lat: 17.0, lon: 79.2, reports: 98,  pest: 'White Fly',          crop: 'Cotton',  severity: 'medium',   trend: '+3%'  },
  { name: 'Davangere',     state: 'Kar.',     lat: 14.4, lon: 75.9, reports: 67,  pest: 'Fall Armyworm',      crop: 'Corn',    severity: 'low',      trend: '-8%'  },
];

const SEVERITY_CONFIG = {
  critical: { color: '#dc2626', bg: '#fee2e2', border: 'rgba(220,38,38,0.25)', dot: 20, pulse: true  },
  high:     { color: '#d97706', bg: '#fef3c7', border: 'rgba(217,119,6,0.25)', dot: 16, pulse: false },
  medium:   { color: '#2563eb', bg: '#dbeafe', border: 'rgba(37,99,235,0.25)', dot: 12, pulse: false },
  low:      { color: '#22c55e', bg: '#dcfce7', border: 'rgba(34,197,94,0.25)', dot: 8,  pulse: false },
};

const PestHeatmapModal = ({ onClose }) => {
  const [activeDistrict, setActiveDistrict]   = useState(null);
  const [reported, setReported]               = useState(false);
  const [alertsEnabled, setAlertsEnabled]     = useState({ varanasi: false });
  const [filter, setFilter]                   = useState('all');
  const [showReport, setShowReport]           = useState(false);
  const [reportForm, setReportForm]           = useState({ pest: '', crop: 'Wheat', severity: 'high', desc: '' });
  const [submitting, setSubmitting]           = useState(false);
  const [submitted, setSubmitted]             = useState(false);

  const filtered = filter === 'all' ? DISTRICTS : DISTRICTS.filter(d => d.severity === filter);
  const totalReports = DISTRICTS.reduce((s, d) => s + d.reports, 0);
  const criticalCount = DISTRICTS.filter(d => d.severity === 'critical').length;

  const handleReport = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); setShowReport(false); }, 1600);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 640 }}>
        <div style={{ background: 'linear-gradient(135deg,#450a0a 0%,#7f1d1d 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 14, fontSize: 22 }}>🚨</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Crowdsourced · Live · India</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Pest Pressure Heatmap</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            {[['🌾 '+totalReports.toLocaleString('en-IN'),'Reports today'],['🚨 '+criticalCount,'Critical districts'],['📍 28','States covered']].map(([v,l]) => (
              <div key={l}><div style={{ fontWeight: 800, fontSize: 14 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.5 }}>{l}</div></div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          {submitted && (
            <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center', animation: 'fadeUp 0.3s ease' }}>
              <CheckCircle2 size={18} color="#22c55e" />
              <span style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>Report submitted! Your data helps 2M+ farmers stay alert. Thank you! 🙏</span>
            </div>
          )}

          {/* Map pseudo-visualization */}
          <div style={{ width: '100%', height: 220, background: 'linear-gradient(135deg,#0c1445,#1a237e)', borderRadius: 18, marginBottom: 18, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* India outline suggestion */}
            <svg width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
              {/* Simple India silhouette */}
              <path d="M 200 30 L 250 20 L 320 30 L 370 60 L 400 100 L 420 140 L 400 175 L 370 195 L 320 210 L 290 215 L 280 200 L 260 210 L 240 205 L 230 195 L 200 170 L 180 130 L 160 90 L 170 55 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              {/* District dots */}
              {DISTRICTS.map((d, i) => {
                // Map lat/lon to SVG coordinates roughly
                const x = ((d.lon - 68) / 30) * 320 + 140;
                const y = ((35 - d.lat) / 25) * 180 + 20;
                const cfg = SEVERITY_CONFIG[d.severity];
                return (
                  <g key={d.name} onClick={() => setActiveDistrict(activeDistrict?.name === d.name ? null : d)} style={{ cursor: 'pointer' }}>
                    {cfg.pulse && (
                      <circle cx={x} cy={y} r={cfg.dot + 8} fill={cfg.color} opacity={0.2} style={{ animation: 'ringPulse 2s infinite' }} />
                    )}
                    <circle cx={x} cy={y} r={cfg.dot / 2} fill={cfg.color} opacity={0.9} stroke="white" strokeWidth="1.5" />
                    <text x={x} y={y + cfg.dot / 2 + 10} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)" fontWeight="600">{d.name}</text>
                  </g>
                );
              })}
            </svg>
            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', borderRadius: 10, padding: '6px 10px', display: 'flex', gap: 10 }}>
              {Object.entries(SEVERITY_CONFIG).map(([sev, cfg]) => (
                <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color }} />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>{sev}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.6)', fontSize: 9, padding: '3px 8px', borderRadius: 20 }}>
              Tap any dot for details
            </div>
          </div>

          {/* Active district popup */}
          {activeDistrict && (() => {
            const cfg = SEVERITY_CONFIG[activeDistrict.severity];
            return (
              <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 18, padding: '16px 20px', marginBottom: 18, animation: 'fadeUp 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={16} color={cfg.color} /> {activeDistrict.name}, {activeDistrict.state}
                    </div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>{activeDistrict.reports} reports · Trend: {activeDistrict.trend}</div>
                  </div>
                  <span style={{ background: cfg.color, color: 'white', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, textTransform: 'capitalize' }}>{activeDistrict.severity}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['Pest', activeDistrict.pest],['Crop at risk', activeDistrict.crop],['Reports', activeDistrict.reports+' today'],['Trend', activeDistrict.trend]].map(([k,v]) => (
                    <div key={k} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: '10px 14px' }}>
                      <div style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{k}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a', marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => setAlertsEnabled(a => ({ ...a, [activeDistrict.name.toLowerCase()]: !a[activeDistrict.name.toLowerCase()] }))}
                    style={{ flex: 1, padding: '9px', background: alertsEnabled[activeDistrict.name.toLowerCase()] ? '#22c55e' : 'white', color: alertsEnabled[activeDistrict.name.toLowerCase()] ? 'white' : '#555', border: '1px solid #e5e7eb', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, transition: 'all 0.2s' }}>
                    <Bell size={14} /> {alertsEnabled[activeDistrict.name.toLowerCase()] ? 'Alerts On ✓' : 'Get Alerts'}
                  </button>
                  <button style={{ flex: 1, padding: '9px', background: '#25D366', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Share2 size={14} /> Share Alert
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px' }}>District Reports</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['all','critical','high','medium'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: '4px 10px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: 'inherit', background: filter === f ? SEVERITY_CONFIG[f === 'all' ? 'high' : f]?.color || '#166534' : '#f5f5f5', color: filter === f ? 'white' : '#888', transition: 'all 0.2s', textTransform: 'capitalize' }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(d => {
              const cfg = SEVERITY_CONFIG[d.severity];
              return (
                <div key={d.name} onClick={() => setActiveDistrict(activeDistrict?.name === d.name ? null : d)}
                  style={{ background: activeDistrict?.name === d.name ? cfg.bg : '#fafafa', border: `1px solid ${activeDistrict?.name === d.name ? cfg.border : '#f0f0f0'}`, borderRadius: 18, padding: '14px 18px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.color, flexShrink: 0, boxShadow: `0 0 8px ${cfg.color}50` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}, {d.state} — <span style={{ color: cfg.color }}>{d.pest}</span></div>
                    <div style={{ fontSize: 11, color: '#888' }}>{d.crop} · {d.reports} reports · {d.trend}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: cfg.bg, color: cfg.color, textTransform: 'capitalize', border: `1px solid ${cfg.color}30` }}>{d.severity}</span>
                </div>
              );
            })}
          </div>

          {/* Report button */}
          <button onClick={() => setShowReport(!showReport)} style={{ width: '100%', marginTop: 16, padding: '12px', background: showReport ? '#f5f5f5' : 'linear-gradient(135deg,#450a0a,#7f1d1d)', color: showReport ? '#888' : 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
            {showReport ? '✕ Cancel' : '🚨 Report Pest In My Field'}
          </button>

          {showReport && (
            <div style={{ background: '#fff8f8', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 18, padding: '18px 20px', marginTop: 12, animation: 'fadeUp 0.3s ease' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7f1d1d', marginBottom: 14 }}>Report a new pest sighting</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
                {[{label:'Pest name',key:'pest',placeholder:'e.g. Yellow Rust, Aphid, Bollworm'},{label:'Description',key:'desc',placeholder:'Describe what you see on your crops'}].map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{f.label}</div>
                    <input placeholder={f.placeholder} value={reportForm[f.key]} onChange={e => setReportForm(r => ({ ...r, [f.key]: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[{label:'Crop',key:'crop',options:['Wheat','Rice','Cotton','Tomato','Onion','Corn','Mustard']},{label:'Severity',key:'severity',options:['low','medium','high','critical']}].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{f.label}</div>
                      <select value={reportForm[f.key]} onChange={e => setReportForm(r => ({ ...r, [f.key]: e.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13, fontFamily: 'inherit', background: 'white' }}>
                        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleReport} disabled={submitting || !reportForm.pest} style={{ width: '100%', padding: '12px', background: !reportForm.pest || submitting ? '#e5e7eb' : 'linear-gradient(135deg,#450a0a,#7f1d1d)', color: !reportForm.pest || submitting ? '#aaa' : 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: !reportForm.pest ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {submitting ? '⏳ Submitting...' : '🚨 Submit Report · Alert Nearby Farmers'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestHeatmapModal;
