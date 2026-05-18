import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  // phase 0: initial, 1: logo animate in, 2: text reveal, 3: stats, 4: progress, 5: exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => onComplete(), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(135deg, #050f08 0%, #0a1f10 40%, #071a0d 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        opacity: phase === 5 ? 0 : 1,
        transform: phase === 5 ? 'scale(1.04)' : 'scale(1)',
        overflow: 'hidden',
        fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Animated background rings */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {[280, 420, 560, 700].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: `1px solid rgba(74,222,128,${0.06 - i * 0.01})`,
            animation: `ringPulse ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${5 + (i * 4.7) % 90}%`,
          bottom: '-10px',
          width: i % 3 === 0 ? '4px' : '2px',
          height: i % 3 === 0 ? '4px' : '2px',
          borderRadius: '50%',
          background: `rgba(74,222,128,${0.3 + (i % 4) * 0.15})`,
          animation: `floatUp ${3 + (i % 4)}s linear infinite`,
          animationDelay: `${(i * 0.3) % 3}s`,
        }} />
      ))}

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
        animation: 'glowPulse 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* 3D Hexagon Logo */}
      <div style={{
        position: 'relative', marginBottom: 32,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'scale(1) rotateY(0deg)' : 'scale(0.3) rotateY(-90deg)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        filter: 'drop-shadow(0 0 30px rgba(34,197,94,0.4))',
      }}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="100%" stopColor="#0f3a1e" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {/* Outer hex */}
          <polygon
            points="55,6 98,30.5 98,79.5 55,104 12,79.5 12,30.5"
            fill="url(#hexGrad)"
            stroke="rgba(74,222,128,0.4)"
            strokeWidth="1.5"
          />
          {/* Inner hex */}
          <polygon
            points="55,18 88,36.5 88,73.5 55,92 22,73.5 22,36.5"
            fill="none"
            stroke="rgba(74,222,128,0.15)"
            strokeWidth="1"
          />
          {/* Leaf SVG */}
          <path
            d="M55 30 C55 30 38 40 38 55 C38 64.9 45.9 73 55 73 C64.1 73 72 64.9 72 55 C72 40 55 30 55 30Z"
            fill="rgba(74,222,128,0.2)"
            stroke="url(#leafGrad)"
            strokeWidth="2"
          />
          <line x1="55" y1="73" x2="55" y2="48" stroke="url(#leafGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M55 62 C55 62 47 55 43 55" stroke="rgba(74,222,128,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M55 56 C55 56 63 49 67 49" stroke="rgba(74,222,128,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Spinning outer ring */}
          <circle cx="55" cy="55" r="50" fill="none" stroke="rgba(74,222,128,0.12)" strokeWidth="1" strokeDasharray="6 4" style={{ animation: 'spinRing 12s linear infinite', transformOrigin: '55px 55px' }} />
          {/* Verified dot */}
          <circle cx="88" cy="22" r="9" fill="#16a34a" />
          <polyline points="84,22 87,25 92,19" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Brand name */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.2, 0.64, 1)',
        textAlign: 'center', marginBottom: 8,
      }}>
        <div style={{
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: '-1px',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 40%, #86efac 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Syne', system-ui",
        }}>
          Agri<span style={{ fontWeight: 300, letterSpacing: '3px' }}>Bridge</span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s ease 0.2s',
        fontSize: 11,
        letterSpacing: '3.5px',
        textTransform: 'uppercase',
        color: 'rgba(134,239,172,0.55)',
        marginBottom: 32,
        fontWeight: 500,
      }}>
        Farm to Future · Khet se Bhavishya
      </div>

      {/* Divider */}
      <div style={{
        width: phase >= 2 ? 60 : 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)',
        transition: 'width 0.6s ease 0.3s',
        marginBottom: 28,
      }} />

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: 36, marginBottom: 36,
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s ease',
      }}>
        {[
          { num: '2M+', label: 'Farmers' },
          { num: '28', label: 'States' },
          { num: '98%', label: 'Accuracy' },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#4ade80', lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.45)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: 4, fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Feature pills */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: 320, marginBottom: 36,
        opacity: phase >= 3 ? 1 : 0,
        transition: 'opacity 0.5s ease 0.15s',
      }}>
        {['🌿 AI Disease Detection', '📡 IoT Sensors', '💹 Market Forecast', '🚜 Equipment Rental'].map(pill => (
          <span key={pill} style={{
            padding: '5px 12px',
            borderRadius: 20,
            border: '0.5px solid rgba(74,222,128,0.2)',
            color: 'rgba(134,239,172,0.7)',
            background: 'rgba(74,222,128,0.06)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}>{pill}</span>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 200,
        opacity: phase >= 4 ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          width: '100%', height: 3,
          background: 'rgba(74,222,128,0.1)',
          borderRadius: 4, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #166534, #4ade80, #86efac)',
            animation: phase >= 4 ? 'loadBar 2s cubic-bezier(0.4,0,0.2,1) forwards' : 'none',
            boxShadow: '0 0 10px rgba(74,222,128,0.5)',
          }} />
        </div>
        <div style={{
          marginTop: 10, fontSize: 11,
          color: 'rgba(134,239,172,0.35)',
          textAlign: 'center',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          Loading farm dashboard...
        </div>
      </div>

      {/* CSS keyframes via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes floatUp {
          0% { bottom: -10px; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.3; }
          100% { bottom: 110%; opacity: 0; transform: translateX(15px); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
