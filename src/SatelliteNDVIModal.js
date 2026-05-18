import React, { useState, useEffect } from 'react';
import { X, Satellite, RefreshCw, Download, MapPin, AlertTriangle, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

const NDVI_ZONES = [
  { id: 1, label: 'North Block', ndvi: 0.72, status: 'healthy', area: '0.8 ac', crop: 'Wheat', change: '+0.04', advice: 'Optimal growth. Continue current regime.' },
  { id: 2, label: 'South Patch', ndvi: 0.41, status: 'stressed', area: '0.5 ac', crop: 'Tomato', change: '-0.12', advice: 'Water stress detected. Irrigate within 24h.' },
  { id: 3, label: 'East Block', ndvi: 0.63, status: 'good', area: '0.7 ac', crop: 'Onion', change: '+0.01', advice: 'Healthy. Minor nutrient deficiency suspected.' },
  { id: 4, label: 'West Corner', ndvi: 0.29, status: 'critical', area: '0.3 ac', crop: 'Wheat', change: '-0.21', advice: 'Critical stress. Disease/pest damage likely.' },
];

const STATUS = {
  healthy:  { color: '#16a34a', bg: '#dcfce7', label: 'Healthy',  icon: <CheckCircle2 size={14} /> },
  good:     { color: '#0891b2', bg: '#e0f2fe', label: 'Good',     icon: <TrendingUp size={14} /> },
  stressed: { color: '#d97706', bg: '#fef3c7', label: 'Stressed', icon: <AlertTriangle size={14} /> },
  critical: { color: '#dc2626', bg: '#fee2e2', label: 'Critical', icon: <AlertTriangle size={14} /> },
};

const HISTORY = [
  { date: 'Nov 25', ndvi: 0.68, rain: 0  },
  { date: 'Dec 02', ndvi: 0.71, rain: 12 },
  { date: 'Dec 09', ndvi: 0.74, rain: 0  },
  { date: 'Dec 16', ndvi: 0.70, rain: 8  },
  { date: 'Dec 23', ndvi: 0.65, rain: 0  },
  { date: 'Today',  ndvi: 0.58, rain: 0  },
];

const SatelliteNDVIModal = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [activeZone, setActiveZone] = useState(null);
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const maxH = Math.max(...HISTORY.map(h => h.ndvi));

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 620 }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#0c1445 0%,#1a237e 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 14, fontSize: 22 }}>🛰️</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Sentinel-2 · Weekly update</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Satellite Field Health</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 20 }}>
            {[['📍 Varanasi, U.P.','Location'],['📅 Dec 28, 2025','Last scan'],['🛰️ Sentinel-2A','Satellite']].map(([v,l]) => (
              <div key={l}><div style={{ fontWeight: 700, fontSize: 13 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.5 }}>{l}</div></div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f5f5f5', padding: 4, borderRadius: 14, marginBottom: 20 }}>
            {[['map','🗺️ NDVI Map'],['history','📈 History'],['zones','🌾 Zone Analysis']].map(([v,l]) => (
              <button key={v} onClick={() => setActiveTab(v)} style={{ flex: 1, padding: '8px', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s', background: activeTab === v ? 'white' : 'transparent', color: activeTab === v ? '#1a237e' : '#888', boxShadow: activeTab === v ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>{l}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16, animation: 'spinSlow 2s linear infinite', display: 'inline-block' }}>🛰️</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 16, fontWeight: 700, color: '#1a237e', marginBottom: 6 }}>Fetching satellite imagery...</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>Processing Sentinel-2 bands 4, 8 for NDVI calculation</div>
              <div style={{ width: 200, height: 4, background: '#e5e7eb', borderRadius: 4, margin: '16px auto 0', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,#1a237e,#3949ab)', borderRadius: 4, animation: 'loadBar 1.8s ease forwards' }} />
              </div>
            </div>
          ) : activeTab === 'map' ? (
            <>
              {/* NDVI pseudo-map */}
              <div style={{ width: '100%', height: 220, borderRadius: 18, overflow: 'hidden', position: 'relative', marginBottom: 18, background: '#0c1445', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Grid of colored zones simulating NDVI map */}
                <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, padding: 3 }}>
                  {NDVI_ZONES.map(z => {
                    const ndviColor = z.ndvi > 0.65 ? '#16a34a' : z.ndvi > 0.5 ? '#65a30d' : z.ndvi > 0.35 ? '#ca8a04' : '#dc2626';
                    const opacity = 0.4 + z.ndvi * 0.6;
                    return (
                      <div key={z.id} onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
                        style={{ background: ndviColor, opacity: activeZone === z.id ? 1 : opacity, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', border: activeZone === z.id ? '2px solid white' : '2px solid transparent' }}>
                        <div style={{ textAlign: 'center', color: 'white' }}>
                          <div style={{ fontSize: 11, fontWeight: 800, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{z.label}</div>
                          <div style={{ fontSize: 16, fontWeight: 800, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{z.ndvi}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* NDVI legend */}
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.7)', borderRadius: 10, padding: '6px 10px' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>NDVI</div>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    {[['#dc2626','Low'],['#ca8a04','Mid'],['#65a30d','Good'],['#16a34a','High']].map(([c,l]) => (
                      <div key={l} style={{ textAlign: 'center' }}>
                        <div style={{ width: 16, height: 8, background: c, borderRadius: 2 }} />
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '4px 10px', borderRadius: 20, fontWeight: 700 }}>
                  Tap zone for details
                </div>
              </div>

              {/* Zone detail popup */}
              {activeZone && (() => {
                const z = NDVI_ZONES.find(x => x.id === activeZone);
                const s = STATUS[z.status];
                return (
                  <div style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 18, padding: '16px 20px', marginBottom: 18, animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 16 }}>{z.label} · {z.crop}</div>
                        <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{z.area} · NDVI: {z.ndvi}</div>
                      </div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: s.color, color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{s.icon}{s.label}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>{z.advice}</div>
                    <div style={{ fontSize: 12, color: z.change.startsWith('+') ? '#16a34a' : '#dc2626', fontWeight: 700, marginTop: 6 }}>
                      Weekly change: {z.change}
                    </div>
                  </div>
                );
              })()}

              {/* Overall field score */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                {NDVI_ZONES.map(z => {
                  const s = STATUS[z.status];
                  return (
                    <div key={z.id} onClick={() => setActiveZone(z.id)} style={{ background: s.bg, borderRadius: 16, padding: '12px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${s.color}25` }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'Syne',system-ui" }}>{z.ndvi}</div>
                      <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{z.label}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : activeTab === 'history' ? (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Average Field NDVI — Last 6 Weeks</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, marginBottom: 20 }}>
                {HISTORY.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 10, color: '#1a237e', fontWeight: 700 }}>{h.ndvi}</div>
                    <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: `linear-gradient(to top,#1a237e,#3949ab)`, height: `${(h.ndvi / maxH) * 90}px`, minHeight: 4, transition: 'height 0.5s ease', position: 'relative' }}>
                      {h.rain > 0 && <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontSize: 10 }}>🌧️</div>}
                    </div>
                    <div style={{ fontSize: 9, color: '#aaa', textAlign: 'center' }}>{h.date}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#f0f4ff', border: '1px solid rgba(26,35,126,0.15)', borderRadius: 16, padding: '14px 18px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a237e', marginBottom: 4 }}>AI Insight</div>
                <div style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>NDVI declined 12% over 2 weeks despite rainfall. Possible causes: nitrogen depletion at tillering stage or early powdery mildew. Recommend soil test and field scouting this week.</div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NDVI_ZONES.map(z => {
                const s = STATUS[z.status];
                return (
                  <div key={z.id} style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 18, padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{z.label} · {z.crop}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>{z.area}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 22, color: s.color }}>{z.ndvi}</div>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: s.color, color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{s.icon}{s.label}</span>
                      </div>
                    </div>
                    <div style={{ height: 6, background: '#e5e7eb', borderRadius: 4, marginBottom: 8, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: s.color, borderRadius: 4, width: `${z.ndvi * 100}%` }} />
                    </div>
                    <div style={{ fontSize: 12, color: '#555' }}>{z.advice}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: z.change.startsWith('+') ? '#16a34a' : '#dc2626', marginTop: 4 }}>
                      7-day trend: {z.change}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && (
            <button style={{ width: '100%', marginTop: 16, padding: '12px', background: 'linear-gradient(135deg,#1a237e,#3949ab)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(26,35,126,0.3)' }}>
              <Download size={16} /> Download Field Report PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SatelliteNDVIModal;
