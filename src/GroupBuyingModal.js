import React, { useState } from 'react';
import { X, Users, ShoppingCart, Clock, TrendingDown, Share2, CheckCircle2, Plus, Minus, Package, ArrowUpRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'p1', name: 'DAP Fertilizer 50kg', category: 'Fertilizer',
    retailPrice: 1350, groupPrice: 880, minGroup: 10, joined: 7, maxStock: 500,
    image: '🌿', savings: 35, unit: 'bag', brand: 'IFFCO',
    specs: 'N:18% P:46% | Best for Wheat, Rice, Corn',
    timeLeft: '18h 24m', totalOrders: 847, rating: 4.8,
  },
  {
    id: 'p2', name: 'Hybrid Wheat Seed HD-3086', category: 'Seeds',
    retailPrice: 420, groupPrice: 290, minGroup: 5, joined: 4, maxStock: 200,
    image: '🌾', savings: 31, unit: 'kg', brand: 'ICAR',
    specs: 'Yield: 58-62 q/ha | Rust resistant | 120 days',
    timeLeft: '6h 12m', totalOrders: 312, rating: 4.9,
  },
  {
    id: 'p3', name: 'Neem-coated Urea 45kg', category: 'Fertilizer',
    retailPrice: 380, groupPrice: 245, minGroup: 8, joined: 8, maxStock: 1000,
    image: '💧', savings: 35, unit: 'bag', brand: 'NFL',
    specs: 'N:46% neem coated | Slow release | Less leaching',
    timeLeft: '2d 4h', totalOrders: 2340, rating: 4.7,
    completed: true,
  },
  {
    id: 'p4', name: 'Chlorpyrifos 20% EC 1L', category: 'Pesticide',
    retailPrice: 340, groupPrice: 195, minGroup: 6, joined: 2, maxStock: 150,
    image: '🔬', savings: 43, unit: 'litre', brand: 'Bayer',
    specs: 'For stem borers, armyworms | Wheat/Rice/Cotton',
    timeLeft: '3d 8h', totalOrders: 89, rating: 4.6,
  },
  {
    id: 'p5', name: 'Drip Irrigation Kit 1 acre', category: 'Equipment',
    retailPrice: 12500, groupPrice: 7800, minGroup: 3, joined: 2, maxStock: 50,
    image: '💦', savings: 38, unit: 'set', brand: 'Jain Irrigation',
    specs: '16mm lateral pipes, 20L/hr drippers | 1 acre coverage',
    timeLeft: '5d 12h', totalOrders: 34, rating: 4.9,
  },
  {
    id: 'p6', name: 'Potash MOP 50kg', category: 'Fertilizer',
    retailPrice: 1150, groupPrice: 720, minGroup: 10, joined: 6, maxStock: 800,
    image: '🟤', savings: 37, unit: 'bag', brand: 'IPL',
    specs: 'K₂O: 60% | Improves fruit quality & drought resistance',
    timeLeft: '1d 6h', totalOrders: 523, rating: 4.7,
  },
];

const GroupBuyingModal = ({ onClose }) => {
  const [cart, setCart] = useState({});
  const [joined, setJoined] = useState({});
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('browse'); // browse | cart | success
  const [shareProduct, setShareProduct] = useState(null);

  const categories = ['All', 'Fertilizer', 'Seeds', 'Pesticide', 'Equipment'];
  const filtered = PRODUCTS.filter(p => filter === 'All' || p.category === filter);

  const totalSaved = Object.entries(cart).reduce((acc, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return p ? acc + (p.retailPrice - p.groupPrice) * qty : acc;
  }, 0);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleJoin = (product) => {
    if (joined[product.id]) return;
    setJoined(j => ({ ...j, [product.id]: true }));
    setCart(c => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
  };

  const handleShare = (product) => {
    const text = `🛒 Join my group order on AgriBridge!\n\n${product.name}\n💰 Group price: ₹${product.groupPrice}/${product.unit} (Save ${product.savings}%)\nNeed ${product.minGroup - product.joined - 1} more farmers\n\nJoin here: agribridge.app/group/${product.id}`;
    if (navigator.share) navigator.share({ title: 'Join Group Buy', text });
    else { navigator.clipboard?.writeText(text); setShareProduct(product.id); setTimeout(() => setShareProduct(null), 2000); }
  };

  const progressPct = (p) => Math.min(100, ((p.joined + (joined[p.id] ? 1 : 0)) / p.minGroup) * 100);
  const isComplete = (p) => progressPct(p) >= 100 || p.completed;

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 680 }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #14532d 100%)', padding: '22px 28px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 14 }}><Users size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.6, fontWeight: 600, textTransform: 'uppercase' }}>Pinduoduo model · India</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Group Buying</h2>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {totalItems > 0 && (
                <button onClick={() => setView('cart')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 14px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
                  <ShoppingCart size={16} /> {totalItems}
                </button>
              )}
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
            {[['👥 4,200+', 'Farmers buying today'], ['💰 35% avg', 'savings vs retail'], ['🚚 Free', 'delivery ₹2,000+']].map(([v, l]) => (
              <div key={l}><div style={{ fontWeight: 800, fontSize: 14 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.6 }}>{l}</div></div>
            ))}
          </div>
        </div>

        {view === 'success' ? (
          <div style={{ padding: '40px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <div style={{ fontFamily: "'Syne',system-ui", fontSize: 24, fontWeight: 800, color: '#166534', marginBottom: 8 }}>Order Placed!</div>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>You saved <strong style={{ color: '#22c55e' }}>₹{totalSaved.toLocaleString('en-IN')}</strong> vs retail price.<br />You'll get a WhatsApp confirmation when your group is complete.</p>
            <button onClick={() => { setView('browse'); setCart({}); setJoined({}); }} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>
              Browse More Products
            </button>
          </div>
        ) : view === 'cart' ? (
          <div style={{ padding: '24px 28px', maxHeight: '65vh', overflowY: 'auto' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 16, fontFamily: "'Syne',system-ui" }}>Your Group Cart</div>
            {Object.entries(cart).filter(([, qty]) => qty > 0).map(([id, qty]) => {
              const p = PRODUCTS.find(x => x.id === id);
              if (!p) return null;
              return (
                <div key={id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ fontSize: 28 }}>{p.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>₹{p.groupPrice}/{p.unit} × {qty} = ₹{(p.groupPrice * qty).toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: 11, color: '#aaa', textDecoration: 'line-through' }}>Retail: ₹{(p.retailPrice * qty).toLocaleString('en-IN')}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => setCart(c => ({ ...c, [id]: Math.max(0, c[id] - 1) }))} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <span style={{ fontWeight: 700, width: 20, textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => setCart(c => ({ ...c, [id]: c[id] + 1 }))} style={{ width: 28, height: 28, borderRadius: '50%', background: '#22c55e', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} color="white" /></button>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 20, background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#666' }}>Retail total</span>
                <span style={{ fontSize: 13, color: '#aaa', textDecoration: 'line-through' }}>₹{Object.entries(cart).reduce((acc, [id, qty]) => acc + (PRODUCTS.find(p => p.id === id)?.retailPrice || 0) * qty, 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#666' }}>Group price total</span>
                <span style={{ fontFamily: "'Syne',system-ui", fontSize: 20, fontWeight: 800, color: '#166534' }}>₹{Object.entries(cart).reduce((acc, [id, qty]) => acc + (PRODUCTS.find(p => p.id === id)?.groupPrice || 0) * qty, 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>You save</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#22c55e' }}>₹{totalSaved.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setView('browse')} style={{ flex: 0, padding: '12px 18px', background: '#f5f5f5', border: 'none', borderRadius: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>← Back</button>
              <button onClick={() => setView('success')} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg,#166534,#15803d)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(22,101,52,0.3)' }}>
                Place Group Order 🛒
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '16px 28px 28px', maxHeight: '65vh', overflowY: 'auto' }}>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s', background: filter === c ? '#166534' : '#f5f5f5', color: filter === c ? 'white' : '#666', boxShadow: filter === c ? '0 4px 14px rgba(22,101,52,0.3)' : 'none' }}>{c}</button>
              ))}
            </div>

            {/* Product grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(p => {
                const pct = progressPct(p);
                const complete = isComplete(p);
                const hasJoined = joined[p.id];
                return (
                  <div key={p.id} style={{ background: '#fafafa', border: `1px solid ${complete ? 'rgba(34,197,94,0.3)' : '#f0f0f0'}`, borderRadius: 22, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                    {complete && <div style={{ position: 'absolute', top: 14, right: 14, background: '#22c55e', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase' }}>Group Complete!</div>}
                    <div style={{ display: 'flex', gap: 14 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>{p.image}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: '#aaa', marginTop: 1 }}>{p.brand} · {p.specs.split('|')[0].trim()}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          <span style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, color: '#166534' }}>₹{p.groupPrice}<span style={{ fontSize: 12, fontWeight: 500 }}>/{p.unit}</span></span>
                          <span style={{ fontSize: 13, color: '#aaa', textDecoration: 'line-through' }}>₹{p.retailPrice}</span>
                          <span style={{ background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 20 }}>-{p.savings}%</span>
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 5 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} />{p.joined + (hasJoined ? 1 : 0)}/{p.minGroup} farmers joined</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{p.timeLeft} left</span>
                          </div>
                          <div style={{ height: 6, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: complete ? '#22c55e' : 'linear-gradient(90deg,#4ade80,#22c55e)', borderRadius: 4, width: `${pct}%`, transition: 'width 0.5s ease' }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                          {!hasJoined && !complete ? (
                            <button onClick={() => handleJoin(p)} style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg,#166534,#15803d)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(22,101,52,0.25)' }}>
                              Join Group — Save ₹{(p.retailPrice - p.groupPrice).toLocaleString('en-IN')}
                            </button>
                          ) : (
                            <div style={{ flex: 1, padding: '10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, fontSize: 13, fontWeight: 700, color: '#166534', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                              <CheckCircle2 size={15} /> Joined!
                            </div>
                          )}
                          <button onClick={() => handleShare(p)} style={{ padding: '10px 14px', background: shareProduct === p.id ? '#22c55e' : 'white', border: '1px solid #e5e7eb', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: shareProduct === p.id ? 'white' : '#555', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                            <Share2 size={14} /> {shareProduct === p.id ? 'Copied!' : 'Invite'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupBuyingModal;
