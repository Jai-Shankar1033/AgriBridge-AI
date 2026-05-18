import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, Package, Truck, Store, ShoppingBag, Download, Share2, Plus, RefreshCw } from 'lucide-react';

const BATCHES = [
  { id: 'B001', crop: 'Tomato', qty: '12 crates (240 kg)', harvestDate: 'Dec 26, 2025', field: 'South Patch', inputsUsed: ['Neem oil','NPK 19-19-19'], pesticidesLast: '12 days ago', grade: 'A+', status: 'In Transit', buyer: 'BigBasket Mumbai', qrId: 'QR-VNS-B001-2025' },
  { id: 'B002', crop: 'Wheat',  qty: '80 quintals',        harvestDate: 'Feb 15, 2026',  field: 'North Block', inputsUsed: ['DAP','Urea'],         pesticidesLast: '21 days ago', grade: 'A',  status: 'Pending',    buyer: 'Khanna Mandi',   qrId: 'QR-VNS-B002-2026' },
];

const TIMELINE_STEPS = (batch) => [
  { icon: '🌱', label: 'Sowing',    date: 'Oct 20, 2025', done: true,  desc: `Field: ${batch.field} · Seed: Hybrid HD-2967` },
  { icon: '💊', label: 'Inputs',    date: 'Nov–Dec 2025', done: true,  desc: batch.inputsUsed.join(' · ') },
  { icon: '🌾', label: 'Harvest',   date: batch.harvestDate, done: true,  desc: `Qty: ${batch.qty} · Grade: ${batch.grade}` },
  { icon: '🏷️', label: 'QR Tagged', date: 'Dec 27, 2025', done: true,  desc: `Batch ID: ${batch.id} · QR code attached` },
  { icon: '🚚', label: 'Transport', date: batch.status === 'In Transit' ? 'Today' : 'Pending', done: batch.status === 'In Transit', desc: batch.status === 'In Transit' ? 'Cold chain truck VH-1234 · 6°C maintained' : 'Awaiting dispatch' },
  { icon: '🏪', label: 'Delivered', date: 'Pending', done: false, desc: `Buyer: ${batch.buyer}` },
];

const SupplyChainModal = ({ onClose }) => {
  const [view, setView]         = useState('batches'); // batches | detail | create | scan
  const [activeBatch, setActiveBatch] = useState(null);
  const [newBatch, setNewBatch] = useState({ crop: 'Tomato', qty: '', field: 'South Patch', grade: 'A', buyer: '' });
  const [creating, setCreating] = useState(false);
  const [created, setCreated]   = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => { setCreating(false); setCreated(true); }, 1800);
  };

  const handleScan = () => {
    setTimeout(() => {
      setScanResult(BATCHES[0]);
      setView('scan');
    }, 1000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 600 }}>
        <div style={{ background: 'linear-gradient(135deg,#0f3460 0%,#16213e 100%)', padding: '22px 28px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 14, fontSize: 22 }}>🔗</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>Farm to Fork · QR Verified</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Supply Chain Tracker</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[['batches','📦 My Batches'],['create','➕ New Batch'],['scan','📷 Scan QR']].map(([v,l]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11, fontFamily: 'inherit', background: view === v ? 'white' : 'rgba(255,255,255,0.12)', color: view === v ? '#0f3460' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          {view === 'scan' ? (
            <div style={{ textAlign: 'center' }}>
              {!scanResult ? (
                <div style={{ padding: '40px 0' }}>
                  <div style={{ fontSize: 60, marginBottom: 16, animation: 'spinSlow 3s linear infinite', display: 'inline-block' }}>📷</div>
                  <div style={{ fontFamily: "'Syne',system-ui", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Scanning QR Code...</div>
                  <div style={{ fontSize: 13, color: '#aaa' }}>Point camera at any AgriBridge batch QR</div>
                </div>
              ) : (
                <div style={{ animation: 'fadeUp 0.5s ease' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                  <div style={{ fontFamily: "'Syne',system-ui", fontSize: 18, fontWeight: 800, color: '#0f3460', marginBottom: 16 }}>Batch Verified!</div>
                  <div style={{ background: '#f0f9ff', border: '1px solid rgba(15,52,96,0.15)', borderRadius: 18, padding: '18px 20px', textAlign: 'left', marginBottom: 16 }}>
                    {[['Batch ID',scanResult.qrId],['Crop',scanResult.crop],['Farmer','Ramesh Kumar, Varanasi'],['Harvest',scanResult.harvestDate],['Pesticide-free',scanResult.pesticidesLast],['Grade',scanResult.grade],['Status',scanResult.status]].map(([k,v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13, borderBottom: '1px solid #f0f0f0' }}>
                        <span style={{ color: '#888' }}>{k}</span><span style={{ fontWeight: 700, color: '#0f3460' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                    <CheckCircle2 size={18} color="#22c55e" />
                    <span style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>This produce is certified traceable from farm to your store.</span>
                  </div>
                  <button onClick={() => { setScanResult(null); setView('batches'); }} style={{ padding: '11px 22px', background: '#0f3460', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
                </div>
              )}
            </div>
          ) : view === 'create' ? (
            created ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>📦</div>
                <div style={{ fontFamily: "'Syne',system-ui", fontSize: 20, fontWeight: 800, color: '#0f3460', marginBottom: 8 }}>Batch Created!</div>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>QR code generated and ready to attach to your produce crates.</p>
                <div style={{ background: '#f0f9ff', border: '1px solid rgba(15,52,96,0.15)', borderRadius: 18, padding: '20px', marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>QR Code Preview</div>
                  <div style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, color: '#0f3460', letterSpacing: 2 }}>QR-VNS-B003-2025</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 3, marginTop: 14, padding: '0 20px' }}>
                    {Array.from({length:64}).map((_,i) => <div key={i} style={{ width: '100%', paddingBottom: '100%', background: Math.random() > 0.5 ? '#0f3460' : 'white', borderRadius: 1 }} />)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button style={{ padding: '11px 20px', background: '#0f3460', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}><Download size={16} /> Download QR</button>
                  <button style={{ padding: '11px 20px', background: '#25D366', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}><Share2 size={16} /> Share</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  {[{label:'Crop',key:'crop',options:['Tomato','Wheat','Onion','Rice','Corn']},{label:'Field',key:'field',options:['North Block','South Patch','East Block']}].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{f.label}</div>
                      <select value={newBatch[f.key]} onChange={e => setNewBatch(b => ({ ...b, [f.key]: e.target.value }))} style={{ width: '100%', padding: '11px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', background: 'white' }}>
                        {f.options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  {[{label:'Quantity (e.g. 12 crates, 80 quintals)',key:'qty',placeholder:'e.g. 12 crates (240 kg)'},{label:'Buyer / Mandi',key:'buyer',placeholder:'e.g. BigBasket Mumbai'}].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{f.label}</div>
                      <input placeholder={f.placeholder} value={newBatch[f.key]} onChange={e => setNewBatch(b => ({ ...b, [f.key]: e.target.value }))} style={{ width: '100%', padding: '11px 14px', borderRadius: 14, border: '1px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit' }} />
                    </div>
                  ))}
                </div>
                <button onClick={handleCreate} disabled={creating || !newBatch.qty} style={{ width: '100%', padding: '14px', background: !newBatch.qty || creating ? '#e5e7eb' : 'linear-gradient(135deg,#0f3460,#16213e)', color: !newBatch.qty || creating ? '#aaa' : 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: !newBatch.qty ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {creating ? <><RefreshCw size={16} style={{ animation: 'spinSlow 1s linear infinite' }} /> Generating QR...</> : <><QrCode size={18} /> Generate QR & Track Batch</>}
                </button>
              </>
            )
          ) : activeBatch ? (
            <>
              <button onClick={() => setActiveBatch(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', fontSize: 13, fontFamily: 'inherit', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>← All Batches</button>
              <div style={{ background: '#f0f9ff', border: '1px solid rgba(15,52,96,0.15)', borderRadius: 18, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div><div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 18 }}>{activeBatch.crop} · {activeBatch.id}</div><div style={{ fontSize: 12, color: '#888' }}>{activeBatch.qty}</div></div>
                  <span style={{ background: activeBatch.status === 'In Transit' ? '#dbeafe' : '#fef3c7', color: activeBatch.status === 'In Transit' ? '#1d4ed8' : '#92400e', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{activeBatch.status}</span>
                </div>
                <div style={{ fontSize: 11, color: '#0f3460', fontWeight: 700, letterSpacing: '1px' }}>QR: {activeBatch.qrId}</div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#0f3460,#e5e7eb)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {TIMELINE_STEPS(activeBatch).map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 18 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: step.done ? '#0f3460' : '#f0f0f0', fontSize: step.done ? 18 : 16, boxShadow: step.done ? '0 2px 12px rgba(15,52,96,0.25)' : 'none' }}>{step.icon}</div>
                      <div style={{ flex: 1, padding: '10px 16px', borderRadius: 16, background: step.done ? '#f0f9ff' : '#fafafa', border: `1px solid ${step.done ? 'rgba(15,52,96,0.1)' : '#f0f0f0'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: step.done ? '#0f3460' : '#888' }}>{step.label}</div>
                          <div style={{ fontSize: 11, color: '#aaa' }}>{step.date}</div>
                        </div>
                        <div style={{ fontSize: 12, color: '#666' }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Your Produce Batches</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BATCHES.map(b => (
                  <div key={b.id} onClick={() => setActiveBatch(b)} style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 20, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: '#0f3460', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{b.crop === 'Tomato' ? '🍅' : '🌾'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{b.crop} · Batch {b.id}</div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.qty} · {b.buyer}</div>
                      <div style={{ fontSize: 11, color: '#0f3460', fontWeight: 700, marginTop: 4 }}>{b.qrId}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ background: b.status === 'In Transit' ? '#dbeafe' : '#fef3c7', color: b.status === 'In Transit' ? '#1d4ed8' : '#92400e', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{b.status}</span>
                    </div>
                  </div>
                ))}
                <button onClick={() => setView('create')} style={{ padding: '14px', background: 'transparent', border: '1.5px dashed #d1d5db', borderRadius: 18, cursor: 'pointer', fontWeight: 700, fontSize: 14, color: '#888', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                  <Plus size={18} /> Create New Batch
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainModal;
