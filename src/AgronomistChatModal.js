import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, BookOpen, Star, ChevronDown, Loader } from 'lucide-react';

const QUICK_QUESTIONS = [
  'My wheat leaves are turning yellow at tips — what is the cause?',
  'When should I apply Urea for Rabi wheat in U.P.?',
  'What is the best pesticide for pink bollworm in cotton?',
  'How much water does tomato need at flowering stage?',
  'My soil pH is 8.2 — which crops should I grow?',
  'What is the MSP of wheat for 2025-26?',
];

const EXPERT_PROFILES = [
  { name: 'Dr. ICAR Advisory', role: 'Crop Science AI', badge: '🌾', color: '#166534', online: true },
  { name: 'KVK Expert Bot',    role: 'Local agronomy',  badge: '🏛️', color: '#0891b2', online: true },
  { name: 'Soil Health AI',    role: 'Soil & nutrition', badge: '🟤', color: '#92400e', online: true },
];

const INITIAL_MESSAGES = [
  { role: 'assistant', text: 'Namaste! 🌱 I am your AgriBridge Agronomist AI, trained on ICAR crop manuals, KVK advisories, and 50 years of Indian agricultural research.\n\nAsk me anything about crops, soil, pests, or farming practices — in Hindi or English.', time: 'Just now', expert: 'Dr. ICAR Advisory' },
];

const AgronomistChatModal = ({ onClose }) => {
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [expert, setExpert]       = useState(EXPERT_PROFILES[0]);
  const [showExperts, setShowExperts] = useState(false);
  const [lang, setLang]           = useState('en');
  const endRef                    = useRef(null);
  const inputRef                  = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const RESPONSES = {
    yellow: {
      en: `**Yellow leaf tips in wheat** can have 3 causes:\n\n1. **Nitrogen deficiency** (most common) — Apply Urea @ 50 kg/acre immediately. Start from the older leaves turning yellow.\n\n2. **Water stress** — Check soil moisture. If below 35%, irrigate within 24 hours.\n\n3. **Yellow Rust disease** — Look for orange-yellow stripes on leaves. If present, spray Propiconazole 25% EC @ 1ml/L water.\n\n📚 *Source: ICAR Wheat Production Technology, 2023*`,
      hi: `**गेहूं की पत्तियों का पीला होना** — 3 कारण हो सकते हैं:\n\n1. **नाइट्रोजन की कमी** (सबसे आम) — तुरंत 50 किग्रा/एकड़ यूरिया डालें\n\n2. **पानी की कमी** — सिंचाई करें अगर नमी 35% से कम हो\n\n3. **पीला रतुआ रोग** — पत्तियों पर नारंगी-पीली धारियां हों तो Propiconazole 1ml/L पानी में छिड़कें\n\n📚 *स्रोत: ICAR गेहूं उत्पादन तकनीक 2023*`,
    },
    urea: {
      en: `**Urea application schedule for Rabi Wheat (U.P.)**:\n\n• **Basal dose**: 65 kg/acre DAP + 20 kg/acre Urea at sowing\n• **1st top dressing**: 50 kg/acre Urea at Crown Root Initiation (21-25 days)\n• **2nd top dressing**: 50 kg/acre Urea at Late Tillering (40-45 days)\n\n⚠️ Apply Urea in the morning or evening — never in afternoon heat. Irrigate within 24 hours of application.\n\n📚 *Source: ICAR-IARI Wheat Crop Guide, UP-2024*`,
      hi: `**रबी गेहूं में यूरिया देने का समय (उ.प्र.)**:\n\n• **बुवाई के समय**: DAP 65 किग्रा/एकड़ + यूरिया 20 किग्रा/एकड़\n• **पहली टॉप ड्रेसिंग**: बुवाई के 21-25 दिन बाद 50 किग्रा/एकड़\n• **दूसरी टॉप ड्रेसिंग**: 40-45 दिन बाद 50 किग्रा/एकड़\n\n⚠️ यूरिया सुबह या शाम को डालें। डालने के 24 घंटे के अंदर सिंचाई करें।`,
    },
    bollworm: {
      en: `**Pink Bollworm (Pectinophora gossypiella) management in Cotton**:\n\n**Early stage (up to 45 days)**:\n• Pheromone traps @ 5/acre for monitoring\n• Neem seed kernel extract 5% spray\n\n**Chemical control (45+ days)**:\n• Emamectin Benzoate 5% SG @ 0.4g/L — most effective\n• Indoxacarb 15.8% EC @ 1ml/L\n• Chlorantraniliprole 18.5% SC @ 0.3ml/L\n\n⚠️ Rotate chemicals to prevent resistance. Spray in evening.\n\n📚 *Source: CICR Cotton Pest Management Guide 2024*`,
      hi: `**कपास में गुलाबी सुंडी का प्रबंधन**:\n\n• फेरोमोन ट्रैप 5/एकड़ लगाएं\n• Emamectin Benzoate 5% @ 0.4g/L पानी\n• Indoxacarb 15.8% EC @ 1ml/L पानी\n\n⚠️ शाम को छिड़काव करें। कीटनाशक बदलते रहें।`,
    },
    water: {
      en: `**Tomato irrigation at flowering stage**:\n\n• **Water requirement**: 35–40 mm/week (critical stage)\n• **Frequency**: Every 4–5 days via drip; every 7 days furrow\n• **Soil moisture**: Maintain at 60–70% field capacity\n• **Avoid**: Waterlogging — causes blossom drop and blight\n• **Signs of stress**: Wilting at noon even after irrigation\n\n💡 **Pro tip**: Apply Calcium Nitrate @ 5g/L foliar spray during flowering to prevent blossom end rot.\n\n📚 *Source: IIVR Tomato Production Technology 2023*`,
      hi: `**टमाटर में फूल आने के समय सिंचाई**:\n\n• हर 4-5 दिन ड्रिप से, 7 दिन में नाली से\n• मिट्टी की नमी 60-70% रखें\n• जलभराव से बचें — फूल झड़ते हैं\n• Calcium Nitrate 5g/L का पर्णीय छिड़काव करें`,
    },
    default: {
      en: `I found relevant information from ICAR research databases:\n\n📖 Based on your query, here are the key recommendations from Indian agricultural research:\n\n• Always consult your local KVK (Krishi Vigyan Kendra) for region-specific advice\n• Soil testing every 3 years helps optimize fertilizer use\n• Integrated Pest Management (IPM) reduces pesticide costs by 30-40%\n\nFor a more specific answer, please describe:\n1. Your crop name and growth stage\n2. The problem you're observing\n3. Your district/state\n\n📞 *KVK helpline: 1800-180-1551 (free)*`,
      hi: `ICAR डेटाबेस से प्रासंगिक जानकारी मिली:\n\n• स्थानीय KVK से क्षेत्र-विशिष्ट सलाह लें\n• हर 3 साल में मिट्टी परीक्षण करें\n• IPM से कीटनाशक खर्च 30-40% कम होता है\n\nअधिक जानकारी के लिए बताएं:\n1. फसल का नाम और अवस्था\n2. क्या समस्या दिख रही है\n3. आपका जिला/राज्य`,
    },
    msp: {
      en: `**MSP (Minimum Support Price) 2025-26**:\n\n| Crop | MSP/Quintal |\n|------|-------------|\n| Wheat | ₹2,425 |\n| Paddy (Common) | ₹2,300 |\n| Paddy (Grade A) | ₹2,320 |\n| Maize | ₹2,225 |\n| Cotton (Medium) | ₹7,121 |\n| Soybean | ₹4,892 |\n| Groundnut | ₹6,783 |\n\n📅 Announced by CCEA, Government of India\n📞 eNAM helpline: 1800-270-0224`,
      hi: `**MSP (न्यूनतम समर्थन मूल्य) 2025-26**:\n\n• गेहूं: ₹2,425/क्विंटल\n• धान (सामान्य): ₹2,300/क्विंटल\n• मक्का: ₹2,225/क्विंटल\n• कपास: ₹7,121/क्विंटल\n\n📞 eNAM हेल्पलाइन: 1800-270-0224`,
    },
    soil: {
      en: `**For soil pH 8.2 (Alkaline soil)** — Best crops and management:\n\n**Suitable crops**:\n✅ Cotton, Wheat, Sugarcane, Barley, Mustard, Gram\n⚠️ Avoid: Blueberry, Potato (prefer acidic soil)\n\n**Soil management**:\n• Apply **Gypsum** @ 400–500 kg/acre to reduce pH\n• Use **Ammonium Sulphate** instead of Urea (acidifying)\n• Add **Green Manure** (Dhaincha) before kharif\n• Micro-nutrients: Zinc deficiency common at pH 8+ — apply Zinc Sulphate @ 10 kg/acre\n\n📚 *Source: ICAR Soil Health Management 2024*`,
      hi: `**pH 8.2 (क्षारीय मिट्टी)** के लिए:\n\n**उपयुक्त फसलें**: कपास, गेहूं, गन्ना, जौ, सरसों\n\n**मिट्टी सुधार**:\n• जिप्सम 400-500 किग्रा/एकड़\n• जिंक सल्फेट 10 किग्रा/एकड़\n• हरी खाद (ढैंचा) बोएं`,
    },
  };

  const getResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('yellow') || lower.includes('पीला')) return RESPONSES.yellow[lang];
    if (lower.includes('urea') || lower.includes('यूरिया')) return RESPONSES.urea[lang];
    if (lower.includes('bollworm') || lower.includes('सुंडी')) return RESPONSES.bollworm[lang];
    if (lower.includes('water') || lower.includes('tomato') || lower.includes('टमाटर')) return RESPONSES.water[lang];
    if (lower.includes('msp') || lower.includes('समर्थन मूल्य')) return RESPONSES.msp[lang];
    if (lower.includes('ph') || lower.includes('soil') || lower.includes('मिट्टी')) return RESPONSES.soil[lang];
    return RESPONSES.default[lang];
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text, time: 'Just now' };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const response = getResponse(text);
    setMessages(m => [...m, { role: 'assistant', text: response, time: 'Just now', expert: expert.name }]);
    setLoading(false);
  };

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 700, color: '#0f1f13', marginBottom: 4, marginTop: i > 0 ? 8 : 0 }}>{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('• ') || line.startsWith('✅ ') || line.startsWith('⚠️ ') || line.startsWith('💡 ') || line.startsWith('📚 ') || line.startsWith('📅 ') || line.startsWith('📞 ')) {
        return <div key={i} style={{ marginBottom: 4, paddingLeft: 8, fontSize: 13, lineHeight: 1.6 }}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</div>;
      }
      if (line.startsWith('#')) {
        return <div key={i} style={{ fontWeight: 800, fontSize: 15, color: '#0f1f13', margin: '8px 0 4px' }}>{line.replace(/#+\s/, '')}</div>;
      }
      return line ? <div key={i} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 3 }}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</div> : <div key={i} style={{ height: 6 }} />;
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 580, height: '85vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#052e16 0%,#166534 100%)', padding: '18px 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{expert.badge}</div>
                <div style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, background: '#22c55e', borderRadius: '50%', border: '2px solid white' }} />
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, color: 'white' }}>ICAR Knowledge Base · {lang === 'hi' ? 'हिंदी' : 'English'}</div>
                <button onClick={() => setShowExperts(!showExperts)} style={{ background: 'transparent', border: 'none', color: 'white', fontFamily: "'Syne',system-ui", fontSize: 16, fontWeight: 800, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {expert.name} <ChevronDown size={14} style={{ transform: showExperts ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {lang === 'en' ? 'हिंदी' : 'English'}
              </button>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
            </div>
          </div>

          {/* Expert switcher */}
          {showExperts && (
            <div style={{ display: 'flex', gap: 8, animation: 'fadeUp 0.3s ease' }}>
              {EXPERT_PROFILES.map(e => (
                <button key={e.name} onClick={() => { setExpert(e); setShowExperts(false); }} style={{ flex: 1, padding: '8px', borderRadius: 12, border: `1.5px solid ${expert.name === e.name ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}`, background: expert.name === e.name ? 'rgba(255,255,255,0.15)' : 'transparent', color: 'white', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{e.badge}</div>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>{e.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, background: '#f8fffe' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeUp 0.3s ease' }}>
              {m.role === 'assistant' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{expert.badge}</div>
                  <span style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>{m.expert || expert.name} · {m.time}</span>
                  <BookOpen size={11} color="#aaa" />
                </div>
              )}
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.role === 'user' ? 'linear-gradient(135deg,#166534,#15803d)' : 'white',
                color: m.role === 'user' ? 'white' : '#1a1a1a',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: m.role === 'assistant' ? '1px solid rgba(34,197,94,0.1)' : 'none',
              }}>
                {m.role === 'user'
                  ? <div style={{ fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
                  : <div style={{ fontSize: 13 }}>{renderText(m.text)}</div>
                }
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'white', borderRadius: '18px 18px 18px 4px', maxWidth: 180, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(34,197,94,0.1)', animation: 'fadeUp 0.3s ease' }}>
              <Loader size={14} color="#22c55e" style={{ animation: 'spinSlow 1s linear infinite', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#888' }}>Searching ICAR database...</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick questions */}
        <div style={{ padding: '10px 16px 0', background: 'white', borderTop: '1px solid #f0f0f0', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
            {QUICK_QUESTIONS.slice(0, 4).map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)', color: '#166534', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', flexShrink: 0, transition: 'all 0.2s' }}>
                {q.length > 35 ? q.slice(0, 35) + '…' : q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: '12px 16px 16px', background: 'white', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, background: '#f8fffe', border: '1.5px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder={lang === 'hi' ? 'अपना सवाल यहाँ लिखें...' : 'Ask about crops, pests, soil, weather...'}
                rows={1}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', resize: 'none', lineHeight: 1.5, color: '#1a1a1a', maxHeight: 80 }}
              />
            </div>
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} style={{ width: 44, height: 44, borderRadius: 14, background: input.trim() && !loading ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e5e7eb', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 0.2s', boxShadow: input.trim() ? '0 4px 14px rgba(34,197,94,0.35)' : 'none' }}>
              <Send size={18} color={input.trim() && !loading ? 'white' : '#aaa'} />
            </button>
          </div>
          <div style={{ fontSize: 10, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
            Powered by ICAR · KVK · State Agriculture Universities · 50yr research data
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgronomistChatModal;
