import React, { useState } from 'react';
import { X, TrendingUp, Leaf, BarChart3, Users, Zap, ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

const FarmAnalyticsModal = ({ onClose }) => {
  const [season, setSeason] = useState('Rabi 2024-25');
  const seasons = ['Kharif 2024', 'Rabi 2024-25', 'Kharif 2023', 'Rabi 2023-24'];

  const metrics = [
    { label: 'Total Yield', value: '184 qtl', delta: '+18%', up: true, icon: <Leaf size={18} color="#22c55e" />, bg: '#f0fdf4' },
    { label: 'Revenue', value: '₹4.2L', delta: '+12%', up: true, icon: <IndianRupee size={18} color="#d97706" />, bg: '#fefce8' },
    { label: 'Expenses', value: '₹1.1L', delta: '-8%', up: false, icon: <BarChart3 size={18} color="#ef4444" />, bg: '#fef2f2' },
    { label: 'Net Profit', value: '₹3.1L', delta: '+22%', up: true, icon: <TrendingUp size={18} color="#3b82f6" />, bg: '#eff6ff' },
  ];

  const crops = [
    { name: 'Wheat', area: '2.0 ac', yield: '64 qtl', revenue: '₹1,53,600', costPerQ: '₹480', margin: '74%' },
    { name: 'Tomato', area: '0.5 ac', yield: '80 qtl', revenue: '₹96,000', costPerQ: '₹380', margin: '68%' },
    { name: 'Onion', area: '0.8 ac', yield: '40 qtl', revenue: '₹40,000', costPerQ: '₹290', margin: '71%' },
  ];

  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const revenueData = [12000, 18000, 24000, 42000, 68000, 96000];
  const maxR = Math.max(...revenueData);

  const expenses = [
    { label: 'Seeds', pct: 18, color: '#22c55e' },
    { label: 'Fertilizer', pct: 28, color: '#3b82f6' },
    { label: 'Labour', pct: 25, color: '#d97706' },
    { label: 'Irrigation', pct: 14, color: '#8b5cf6' },
    { label: 'Pesticides', pct: 10, color: '#ef4444' },
    { label: 'Others', pct: 5, color: '#6b7280' },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 680 }}>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '24px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 14 }}><BarChart3 size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Your Farm Intelligence</div>
                <h2 className="syne" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Farm Analytics</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 8, overflowX: 'auto' }}>
            {seasons.map(s => (
              <button key={s} onClick={() => setSeason(s)} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s', background: season === s ? 'white' : 'rgba(255,255,255,0.1)', color: season === s ? '#0f172a' : 'rgba(255,255,255,0.6)' }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 28px', maxHeight: '70vh', overflowY: 'auto' }}>

          {/* Metrics row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ background: m.bg, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 18, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ background: 'white', padding: 8, borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>{m.icon}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: m.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 2 }}>
                    {m.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{m.delta}
                  </span>
                </div>
                <div className="syne" style={{ fontSize: 20, fontWeight: 800, color: '#0f1f13' }}>{m.value}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Revenue bar chart */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>Revenue Trend — {season}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
              {revenueData.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 9, color: '#22c55e', fontWeight: 700 }}>₹{(v / 1000).toFixed(0)}K</div>
                  <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: `linear-gradient(to top, #166534, #22c55e)`, height: `${(v / maxR) * 80}px`, transition: 'height 0.5s ease', minHeight: 4 }} />
                  <div style={{ fontSize: 10, color: '#888', fontWeight: 600 }}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Crop performance table */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Crop Performance</div>
            <div style={{ background: '#fafafa', borderRadius: 16, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 0.9fr 1fr 0.8fr 0.7fr', padding: '10px 16px', background: '#f5f5f5', fontSize: 10, fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', gap: 8 }}>
                <span>Crop</span><span>Area</span><span>Yield</span><span>Revenue</span><span>Cost/Q</span><span>Margin</span>
              </div>
              {crops.map((c, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 0.9fr 1fr 0.8fr 0.7fr', padding: '12px 16px', borderTop: '1px solid #f0f0f0', fontSize: 13, alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700 }}>{c.name}</span>
                  <span style={{ color: '#666' }}>{c.area}</span>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>{c.yield}</span>
                  <span className="syne" style={{ fontWeight: 700 }}>{c.revenue}</span>
                  <span style={{ color: '#888' }}>{c.costPerQ}</span>
                  <span style={{ background: '#dcfce7', color: '#16a34a', fontWeight: 800, padding: '3px 8px', borderRadius: 10, fontSize: 11 }}>{c.margin}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense breakdown */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>Expense Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {expenses.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 70, fontSize: 12, color: '#555', fontWeight: 600, flexShrink: 0 }}>{e.label}</div>
                  <div style={{ flex: 1, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${e.pct}%`, background: e.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ width: 35, fontSize: 12, fontWeight: 700, color: e.color, textAlign: 'right' }}>{e.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmAnalyticsModal;
