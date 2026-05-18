import React, { useState } from 'react';
import { X, Search, ExternalLink, CheckCircle2, ChevronRight, Shield } from 'lucide-react';

const schemes = [
  { name: 'PM Kisan Samman Nidhi', short: 'PM-KISAN', amount: '₹6,000/yr', ministry: 'Agriculture', type: 'Direct Benefit', states: ['All India'], eligibility: 'Small & marginal farmers with <2 hectares', tag: 'central', hotness: 'popular', deadline: 'Rolling', link: 'https://pmkisan.gov.in' },
  { name: 'PM Fasal Bima Yojana', short: 'PMFBY', amount: 'Up to full crop value', ministry: 'Agriculture', type: 'Crop Insurance', states: ['All India'], eligibility: 'All farmers with crop loans', tag: 'central', hotness: 'popular', deadline: 'Seasonal', link: 'https://pmfby.gov.in' },
  { name: 'Kisan Credit Card', short: 'KCC', amount: 'Up to ₹3 lakh @ 4%', ministry: 'Finance', type: 'Credit', states: ['All India'], eligibility: 'All farmers, sharecroppers, oral lessees', tag: 'central', hotness: 'popular', deadline: 'Rolling', link: '#' },
  { name: 'Soil Health Card Scheme', short: 'SHC', amount: 'Free soil testing', ministry: 'Agriculture', type: 'Free Service', states: ['All India'], eligibility: 'All farmers', tag: 'central', hotness: 'new', deadline: 'Rolling', link: 'https://soilhealth.dac.gov.in' },
  { name: 'PM Krishi Sinchayee Yojana', short: 'PMKSY', amount: '55-90% subsidy on drip/sprinkler', ministry: 'Jal Shakti', type: 'Subsidy', states: ['All India'], eligibility: 'Farmers with own land + water source', tag: 'central', hotness: 'popular', deadline: 'Application open', link: '#' },
  { name: 'E-NAM Platform', short: 'eNAM', amount: 'Better prices via online mandi', ministry: 'Agriculture', type: 'Market Access', states: ['All India'], eligibility: 'Registered farmers', tag: 'central', hotness: '', deadline: 'Rolling', link: 'https://enam.gov.in' },
  { name: 'UP Kisan Uday Yojana', short: 'KUPY', amount: 'Free solar pump (7.5 HP)', ministry: 'UP Govt', type: 'Equipment', states: ['Uttar Pradesh'], eligibility: 'Small farmers in UP', tag: 'state', hotness: 'new', deadline: 'Dec 31, 2025', link: '#' },
  { name: 'Maharashtra Agri Drone Subsidy', short: 'Drone Aid', amount: '50% subsidy on drones', ministry: 'Maharashtra Govt', type: 'Technology', states: ['Maharashtra'], eligibility: 'FPO members & progressive farmers', tag: 'state', hotness: 'new', deadline: 'Mar 2026', link: '#' },
  { name: 'Punjab Zero-Interest Crop Loan', short: 'PZCL', amount: 'Up to ₹1.5L @ 0%', ministry: 'Punjab Govt', type: 'Credit', states: ['Punjab'], eligibility: 'Punjab farmers, max 5 acres', tag: 'state', hotness: '', deadline: 'Rolling', link: '#' },
  { name: 'Rajasthan Solar Pump Scheme', short: 'RRSS', amount: '60-90% subsidy', ministry: 'Rajasthan Govt', type: 'Equipment', states: ['Rajasthan'], eligibility: 'SC/ST/Small farmer priority', tag: 'state', hotness: 'popular', deadline: 'Limited seats', link: '#' },
];

const GovtSchemesModal = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = schemes.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q) || s.ministry.toLowerCase().includes(q) || s.type.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || s.tag === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', padding: '24px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 14 }}><Shield size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.65, fontWeight: 600, textTransform: 'uppercase' }}>10+ Schemes</div>
                <h2 className="syne" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Govt Scheme Finder</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ marginTop: 16, position: 'relative' }}>
            <Search size={16} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: 14, top: 12 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schemes by name, type, ministry..."
              style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          </div>
        </div>
        <div style={{ padding: '16px 28px 28px', maxHeight: '65vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {[['all', 'All Schemes'], ['central', '🇮🇳 Central'], ['state', '🏛️ State']].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{ padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', background: filter === v ? '#7c3aed' : '#f5f5f5', color: filter === v ? 'white' : '#666', boxShadow: filter === v ? '0 4px 14px rgba(124,58,237,0.3)' : 'none' }}>{l}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#aaa', alignSelf: 'center' }}>{filtered.length} found</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((s, i) => (
              <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ background: '#fafafa', border: `1px solid ${expanded === i ? 'rgba(124,58,237,0.3)' : '#f0f0f0'}`, borderRadius: 18, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.25s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="syne" style={{ fontWeight: 800, fontSize: 15 }}>{s.name}</span>
                      {s.hotness === 'popular' && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>POPULAR</span>}
                      {s.hotness === 'new' && <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>NEW</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: s.tag === 'central' ? '#7c3aed' : '#0891b2', fontWeight: 600 }}>{s.ministry}</span>
                      <span style={{ fontSize: 12, color: '#888' }}>·</span>
                      <span style={{ fontSize: 12, color: '#888' }}>{s.type}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                    <div className="syne" style={{ fontSize: 14, fontWeight: 800, color: '#22c55e' }}>{s.amount}</div>
                    <ChevronRight size={16} color="#aaa" style={{ transform: expanded === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', marginTop: 4 }} />
                  </div>
                </div>
                {expanded === i && (
                  <div style={{ marginTop: 14, borderTop: '1px solid #f0f0f0', paddingTop: 14, animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ fontSize: 13, color: '#555', marginBottom: 10 }}><strong>Eligibility:</strong> {s.eligibility}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, color: '#666' }}>📅 Deadline: <strong>{s.deadline}</strong></span>
                      <span style={{ fontSize: 12, color: '#666' }}>📍 {s.states.join(', ')}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button style={{ flex: 1, padding: '10px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                        <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Check Eligibility
                      </button>
                      {s.link !== '#' && (
                        <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 14px', background: '#f5f5f5', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#555', fontWeight: 600, textDecoration: 'none' }}>
                          <ExternalLink size={14} /> Official Site
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtSchemesModal;
