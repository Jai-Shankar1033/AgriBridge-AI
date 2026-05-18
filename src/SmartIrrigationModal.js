import React, { useState, useEffect } from 'react';
import { X, Droplets, Sun, Wind, Clock, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

const SmartIrrigationModal = ({ onClose }) => {
  const [moisture, setMoisture] = useState(38);
  const [schedule, setSchedule] = useState(null);
  const [generating, setGenerating] = useState(false);

  const forecast = [
    { day: 'Today', rain: 0, temp: 32, humid: 42 }, { day: 'Tue', rain: 15, temp: 27, humid: 72 },
    { day: 'Wed', rain: 40, temp: 24, humid: 85 }, { day: 'Thu', rain: 0, temp: 30, humid: 55 },
    { day: 'Fri', rain: 0, temp: 33, humid: 40 }, { day: 'Sat', rain: 10, temp: 28, humid: 65 },
    { day: 'Sun', rain: 0, temp: 31, humid: 50 },
  ];

  const zones = [
    { name: 'North Field', crop: 'Wheat', area: '1.2 ac', moisture: moisture - 5 },
    { name: 'South Patch', crop: 'Tomato', area: '0.5 ac', moisture: moisture + 8 },
    { name: 'East Block', crop: 'Onion', area: '0.8 ac', moisture: moisture - 2 },
  ];

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setSchedule([
        { zone: 'North Field', time: '05:30 AM', duration: 45, liters: 3200, reason: 'Soil moisture at 33% — below optimal 42%', priority: 'high' },
        { zone: 'East Block', time: '06:20 AM', duration: 30, liters: 2100, reason: 'Wheat tillering stage needs consistent moisture', priority: 'medium' },
        { zone: 'South Patch', time: 'Skip Wed', duration: 0, liters: 0, reason: 'Rain forecast 40mm on Wednesday', priority: 'skip' },
      ]);
      setGenerating(false);
    }, 1600);
  };

  const moistureColor = moisture < 35 ? '#ef4444' : moisture < 50 ? '#f59e0b' : '#22c55e';
  const moistureLabel = moisture < 35 ? 'Critical — irrigate now' : moisture < 50 ? 'Low — schedule soon' : 'Optimal';

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 580 }}>
        <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', padding: '24px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 14 }}><Droplets size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.65, fontWeight: 600, textTransform: 'uppercase' }}>Water-saving AI</div>
                <h2 className="syne" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Smart Irrigation</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
        </div>
        <div style={{ padding: '24px 28px', maxHeight: '75vh', overflowY: 'auto' }}>

          {/* Soil moisture dial */}
          <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 22, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#dbeafe" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke={moistureColor} strokeWidth="8"
                  strokeDasharray={`${moisture * 1.884} ${188.4}`} strokeLinecap="round"
                  transform="rotate(-90 40 40)" style={{ transition: 'all 0.5s ease' }} />
                <text x="40" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill={moistureColor}>{moisture}%</text>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Avg. Soil Moisture</div>
              <div className="syne" style={{ fontSize: 20, fontWeight: 800, color: moistureColor }}>{moistureLabel}</div>
              <input type="range" min="10" max="90" value={moisture} onChange={e => setMoisture(+e.target.value)}
                style={{ width: '100%', marginTop: 10, accentColor: moistureColor }} />
              <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>Drag to simulate live sensor</div>
            </div>
          </div>

          {/* Zone cards */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>Field Zones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {zones.map((z, i) => (
              <div key={i} style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 16, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{z.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{z.crop} · {z.area}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="syne" style={{ fontSize: 20, fontWeight: 800, color: z.moisture < 35 ? '#ef4444' : z.moisture < 50 ? '#f59e0b' : '#22c55e' }}>{z.moisture}%</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>moisture</div>
                </div>
              </div>
            ))}
          </div>

          {/* 7-day rain forecast mini */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>7-Day Rain Forecast</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
            {forecast.map((f, i) => (
              <div key={i} style={{ textAlign: 'center', minWidth: 52, background: f.rain > 10 ? 'rgba(59,130,246,0.08)' : '#fafafa', border: `1px solid ${f.rain > 10 ? 'rgba(59,130,246,0.2)' : '#f0f0f0'}`, borderRadius: 14, padding: '10px 6px' }}>
                <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600 }}>{f.day}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: f.rain > 0 ? '#3b82f6' : '#f59e0b', margin: '4px 0' }}>{f.rain > 0 ? `${f.rain}mm` : '☀️'}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{f.temp}°</div>
              </div>
            ))}
          </div>

          <button onClick={generate} disabled={generating} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 8px 24px rgba(2,132,199,0.3)', opacity: generating ? 0.75 : 1 }}>
            {generating ? '💧 Calculating optimal schedule...' : '⚡ Generate AI Irrigation Schedule'}
          </button>

          {schedule && (
            <div style={{ marginTop: 20, animation: 'fadeUp 0.5s ease' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 14 }}>Tomorrow's Schedule</div>
              {schedule.map((s, i) => (
                <div key={i} style={{ background: s.priority === 'skip' ? '#fef3c7' : s.priority === 'high' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${s.priority === 'skip' ? 'rgba(245,158,11,0.25)' : s.priority === 'high' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`, borderRadius: 18, padding: '16px 20px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div className="syne" style={{ fontWeight: 700, fontSize: 16 }}>{s.zone}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.priority !== 'skip' && (<span style={{ background: '#3b82f6', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}><Clock size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />{s.time}</span>)}
                      {s.priority === 'skip' && <span style={{ background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>SKIP</span>}
                    </div>
                  </div>
                  {s.duration > 0 && (
                    <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#555' }}><Clock size={12} style={{ verticalAlign: 'middle' }} /> {s.duration} min</span>
                      <span style={{ fontSize: 12, color: '#3b82f6' }}><Droplets size={12} style={{ verticalAlign: 'middle' }} /> {s.liters.toLocaleString()}L</span>
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    {s.priority === 'high' ? <AlertTriangle size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} /> : s.priority === 'skip' ? <CheckCircle2 size={13} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} /> : <CheckCircle2 size={13} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />}
                    {s.reason}
                  </div>
                </div>
              ))}
              <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 14, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                <Zap size={18} color="#22c55e" />
                <span style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>Estimated water saving vs manual: <strong>32%</strong> this week</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartIrrigationModal;
