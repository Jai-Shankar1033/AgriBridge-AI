import React, { useState } from 'react';
import { X, Copy, Check, Gift, Users, Star, Share2, ChevronRight, Zap } from 'lucide-react';

const MILESTONES = [
  { count: 1,  reward: '1 Month Pro Free',   icon: '🎁', coins: 100,  unlocked: true  },
  { count: 3,  reward: 'IoT Sensor Discount', icon: '📡', coins: 300,  unlocked: true  },
  { count: 5,  reward: 'Priority Support',    icon: '⚡', coins: 500,  unlocked: false },
  { count: 10, reward: '3 Months Pro Free',   icon: '👑', coins: 1000, unlocked: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Suresh K.',    state: 'Punjab',        refs: 48, coins: 4800, badge: '👑' },
  { rank: 2, name: 'Anita Devi',   state: 'U.P.',          refs: 37, coins: 3700, badge: '🥈' },
  { rank: 3, name: 'Ramesh P.',    state: 'Maharashtra',   refs: 29, coins: 2900, badge: '🥉' },
  { rank: 4, name: 'You',          state: 'Your State',    refs: 2,  coins: 200,  badge: '🌱', isYou: true },
];

const ReferralModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('refer');
  const referralCode = 'AGRI-KISAN-7291';
  const referralLink = `https://agribridge.app/join?ref=${referralCode}`;
  const userRefs = 2;
  const userCoins = 200;
  const nextMilestone = MILESTONES.find(m => !m.unlocked);

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Join AgriBridge!', text: `Use my code ${referralCode} to join AgriBridge — India's smartest farming app. Get 1 month Pro free!`, url: referralLink });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 520 }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', padding: '24px 28px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 14 }}><Gift size={24} /></div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '2px', opacity: 0.65, fontWeight: 600, textTransform: 'uppercase' }}>Earn While You Grow</div>
                <h2 style={{ fontFamily: "'Syne',system-ui", fontSize: 22, fontWeight: 800, margin: 0 }}>Refer & Earn</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>

          {/* Coins counter */}
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 18px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Your Coins</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 28, fontWeight: 800 }}>🪙 {userCoins}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 18px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Referrals</div>
              <div style={{ fontFamily: "'Syne',system-ui", fontSize: 28, fontWeight: 800 }}>👥 {userRefs}</div>
            </div>
            {nextMilestone && (
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Next reward at {nextMilestone.count} refs</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#a78bfa', borderRadius: 3, width: `${(userRefs / nextMilestone.count) * 100}%`, transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{userRefs}/{nextMilestone.count} · {nextMilestone.icon} {nextMilestone.reward}</div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f5f5f5', margin: '0 28px', borderRadius: 14, padding: 4, marginTop: 20 }}>
          {[['refer', '🔗 Share & Earn'], ['milestones', '🏆 Milestones'], ['leaderboard', '📊 Top Farmers']].map(([v, l]) => (
            <button key={v} onClick={() => setActiveTab(v)} style={{ flex: 1, padding: '8px 6px', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s', background: activeTab === v ? 'white' : 'transparent', color: activeTab === v ? '#7c3aed' : '#888', boxShadow: activeTab === v ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', whiteSpace: 'nowrap' }}>{l}</button>
          ))}
        </div>

        <div style={{ padding: '20px 28px 28px', maxHeight: '55vh', overflowY: 'auto' }}>

          {/* REFER TAB */}
          {activeTab === 'refer' && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              {/* How it works */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
                {[{ step: '1', label: 'Share your code', icon: '📲' }, { step: '2', label: 'Friend signs up', icon: '👨‍🌾' }, { step: '3', label: 'Both earn coins', icon: '🪙' }].map(({ step, label, icon }) => (
                  <div key={step} style={{ flex: 1, background: '#f8f4ff', border: '1px solid rgba(124,58,237,0.1)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#7c3aed', marginBottom: 3 }}>Step {step}</div>
                    <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Referral code box */}
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 20, padding: '20px 22px', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>Your Referral Code</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontFamily: "'Syne',system-ui", fontSize: 24, fontWeight: 800, color: '#4c1d95', letterSpacing: '2px', flex: 1 }}>{referralCode}</div>
                  <button onClick={handleCopy} style={{ background: copied ? '#22c55e' : '#7c3aed', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 12, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s' }}>
                    {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, wordBreak: 'break-all' }}>{referralLink}</div>
              </div>

              {/* Share buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button onClick={handleShare} style={{ padding: '13px', background: '#25D366', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(37,211,102,0.3)' }}>
                  <Share2 size={18} /> Share on WhatsApp
                </button>
                <button onClick={handleCopy} style={{ padding: '13px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(124,58,237,0.3)' }}>
                  <Copy size={18} /> Copy Link
                </button>
              </div>

              <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#166534', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={16} color="#22c55e" />
                Your friend gets <strong>1 month Pro free</strong> · You earn <strong>100 coins</strong> per referral
              </div>
            </div>
          )}

          {/* MILESTONES TAB */}
          {activeTab === 'milestones' && (
            <div style={{ animation: 'fadeUp 0.4s ease', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MILESTONES.map((m, i) => (
                <div key={i} style={{ background: m.unlocked ? 'linear-gradient(135deg,#f5f3ff,#ede9fe)' : '#fafafa', border: `1px solid ${m.unlocked ? 'rgba(124,58,237,0.25)' : '#e5e7eb'}`, borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, opacity: m.unlocked ? 1 : 0.65 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: m.unlocked ? 'rgba(124,58,237,0.12)' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 700, fontSize: 15, color: '#1a1a1a', marginBottom: 3 }}>{m.reward}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{m.count} referral{m.count > 1 ? 's' : ''} needed · 🪙 {m.coins} coins</div>
                    {!m.unlocked && (
                      <div style={{ marginTop: 6, height: 4, background: '#e5e7eb', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#7c3aed', borderRadius: 2, width: `${Math.min((userRefs / m.count) * 100, 100)}%` }} />
                      </div>
                    )}
                  </div>
                  {m.unlocked ? (
                    <div style={{ background: '#22c55e', padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: 'white' }}>✓ Unlocked</div>
                  ) : (
                    <div style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#aaa' }}>Locked</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* LEADERBOARD TAB */}
          {activeTab === 'leaderboard' && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <div style={{ fontSize: 12, color: '#aaa', marginBottom: 14, textAlign: 'center' }}>Top referrers this month across India 🇮🇳</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEADERBOARD.map((u, i) => (
                  <div key={i} style={{ background: u.isYou ? 'linear-gradient(135deg,#f5f3ff,#ede9fe)' : '#fafafa', border: `1px solid ${u.isYou ? 'rgba(124,58,237,0.25)' : '#f0f0f0'}`, borderRadius: 18, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontFamily: "'Syne',system-ui", fontSize: 20, fontWeight: 800, width: 28, color: i < 3 ? ['#f59e0b','#9ca3af','#b45309'][i] : '#ccc' }}>{u.badge}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: u.isYou ? '#7c3aed' : '#1a1a1a' }}>{u.name} {u.isYou && <span style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>(You)</span>}</div>
                      <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{u.state}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Syne',system-ui", fontWeight: 800, fontSize: 16, color: '#7c3aed' }}>👥 {u.refs}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>🪙 {u.coins}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: '#fefce8', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 14, padding: '12px 16px', fontSize: 12, color: '#92400e', textAlign: 'center' }}>
                🏆 Top referrer every month wins a <strong>FREE IoT Soil Sensor Kit</strong> (worth ₹4,999)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
