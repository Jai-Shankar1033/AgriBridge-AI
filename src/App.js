import React, { useEffect, useState, useRef } from 'react';
import { Camera, CloudRain, Tractor, TrendingUp, Wifi, Users, Mic, Languages, MapPin, X, Upload, Activity, CheckCircle2, Clock, AlertTriangle, Droplets, Leaf, Wind, Sun, Thermometer, Image as ImageIcon, Settings, Zap, Shield, Star, ArrowUpRight, RefreshCw, BarChart3, Crown, Download, Bell, Bug, Gift, FileText } from 'lucide-react';
import SplashScreen from './SplashScreen';
import YieldPredictorModal from './YieldPredictorModal';
import SmartIrrigationModal from './SmartIrrigationModal';
import GovtSchemesModal from './GovtSchemesModal';
import SubscriptionModal from './SubscriptionModal';
import FarmAnalyticsModal from './FarmAnalyticsModal';
import { LANGS, useLang } from './i18n';
import { initAnalytics, track, requestPushPermission, canInstall, installPWA } from './analytics';
import PestAlertModal from './PestAlertModal';
import GroupBuyingModal from './GroupBuyingModal';
import DroneMarketplaceModal from './DroneMarketplaceModal';
import SatelliteNDVIModal from './SatelliteNDVIModal';
import CarbonCreditsModal from './CarbonCreditsModal';
import BNPLModal from './BNPLModal';
import SupplyChainModal from './SupplyChainModal';
import AgronomistChatModal from './AgronomistChatModal';
import PestHeatmapModal from './PestHeatmapModal';
import OnboardingFlow from './OnboardingFlow';
import ReferralModal from './ReferralModal';
import SoilReportModal from './SoilReportModal';

/* ─── PRICE PREDICTOR MODAL ─── */
const PricePredictorModal = ({ onClose }) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const cropData = { Wheat:[{mandi:'Khanna Mandi',price:'₹2,450',trend:'up',change:'+₹50',district:'Punjab'},{mandi:'Indore Market',price:'₹2,380',trend:'down',change:'-₹20',district:'M.P.'},{mandi:'Rajkot Mandi',price:'₹2,510',trend:'up',change:'+₹110',district:'Gujarat'}], Rice:[{mandi:'Karnal Mandi',price:'₹3,100',trend:'up',change:'+₹150',district:'Haryana'},{mandi:'Nalgonda Market',price:'₹2,950',trend:'up',change:'+₹40',district:'Telangana'}], Tomato:[{mandi:'Azadpur Mandi',price:'₹1,200',trend:'down',change:'-₹300',district:'Delhi'},{mandi:'Nashik Market',price:'₹1,150',trend:'down',change:'-₹150',district:'Maharashtra'}], Corn:[{mandi:'Davangere Market',price:'₹1,850',trend:'up',change:'+₹80',district:'Karnataka'},{mandi:'Nizamabad Mandi',price:'₹1,790',trend:'up',change:'+₹60',district:'Telangana'}] };
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div style={{background:'linear-gradient(135deg,#d97706,#ea580c)',padding:'28px 32px',color:'white'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}><div style={{background:'rgba(255,255,255,0.2)',padding:12,borderRadius:16}}><TrendingUp size={28}/></div><div><div style={{fontSize:11,letterSpacing:'2px',opacity:0.7,fontWeight:600,textTransform:'uppercase',marginBottom:4}}>AI-Powered</div><h2 className="syne" style={{fontSize:26,fontWeight:800,margin:0}}>Market Intelligence</h2></div></div>
            <button onClick={onClose} style={{background:'rgba(0,0,0,0.15)',border:'none',color:'white',padding:10,borderRadius:12,cursor:'pointer',display:'flex'}}><X size={22}/></button>
          </div>
        </div>
        <div style={{padding:'28px 32px',maxHeight:'70vh',overflowY:'auto'}}>
          <div style={{display:'flex',gap:8,marginBottom:28,overflowX:'auto'}}>
            {['Wheat','Rice','Tomato','Corn'].map(c=>(<button key={c} onClick={()=>setSelectedCrop(c)} style={{padding:'8px 20px',borderRadius:24,fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:'inherit',transition:'all 0.25s',background:selectedCrop===c?'#d97706':'#f5f5f5',color:selectedCrop===c?'white':'#666',boxShadow:selectedCrop===c?'0 6px 20px rgba(217,119,6,0.35)':'none'}}>{c}</button>))}
          </div>
          <div style={{background:'linear-gradient(135deg,#fef3c7,#fff7ed)',borderRadius:24,padding:'24px 28px',marginBottom:28,border:'1px solid rgba(217,119,6,0.15)'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(217,119,6,0.1)',color:'#92400e',border:'1px solid rgba(217,119,6,0.2)',padding:'5px 12px',borderRadius:20,fontSize:11,fontWeight:600,marginBottom:12}}>🤖 AI Forecast</span>
            <h3 className="syne" style={{fontSize:32,fontWeight:800,color:'#1c1c1c',margin:'8px 0 6px'}}>Expect +12% Rise</h3>
            <p style={{fontSize:13,color:'#6b6b6b',margin:0,fontStyle:'italic',lineHeight:1.6}}>Low arrivals detected in Northern hubs. Prices expected to peak in 14 days.</p>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:'#aaa',textTransform:'uppercase',letterSpacing:'2px',marginBottom:16}}>Live Mandi Analytics</div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {(cropData[selectedCrop]||cropData['Wheat']).map((m,i)=>(<div key={i} className="card" style={{padding:'18px 22px',border:'1px solid #f0f0f0',borderRadius:20,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}><div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:44,height:44,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',background:m.trend==='up'?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)'}}><TrendingUp size={22} color={m.trend==='up'?'#16a34a':'#dc2626'} style={{transform:m.trend==='down'?'rotate(180deg)':'none'}}/></div><div><div style={{fontWeight:700,fontSize:15,color:'#1a1a1a'}}>{m.mandi}</div><div style={{fontSize:11,color:'#aaa',fontWeight:600,textTransform:'uppercase',letterSpacing:'1px',marginTop:2}}>{m.district} · 2h ago</div></div></div><div style={{textAlign:'right'}}><div className="syne" style={{fontSize:22,fontWeight:800,color:'#1a1a1a'}}>{m.price}</div><div style={{fontSize:13,fontWeight:700,color:m.trend==='up'?'#16a34a':'#dc2626'}}>{m.change}</div></div></div>))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── WEATHER MODAL ─── */
const WeatherModal = ({ location, onClose }) => {
  const forecast=[{day:'Mon',temp:'29°C',status:'Sunny',color:'#f59e0b'},{day:'Tue',temp:'27°C',status:'Showers',color:'#3b82f6'},{day:'Wed',temp:'24°C',status:'Heavy Rain',color:'#1d4ed8'},{day:'Thu',temp:'28°C',status:'Sunny',color:'#f59e0b'},{day:'Fri',temp:'30°C',status:'Hot',color:'#ef4444'}];
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div style={{background:'linear-gradient(135deg,#1d4ed8,#0284c7)',padding:'28px 32px',color:'white',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-40,right:-40,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,0.07)'}}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:1}}>
            <div><div style={{fontSize:11,letterSpacing:'2px',opacity:0.7,fontWeight:600,textTransform:'uppercase',marginBottom:6}}>Live Forecast</div><h2 className="syne" style={{fontSize:28,fontWeight:800,margin:0}}>Weather Intelligence</h2><p style={{fontSize:12,opacity:0.7,marginTop:6,display:'flex',alignItems:'center',gap:4}}><MapPin size={12}/>{location?.lat||'28.6139'}°N, {location?.lon||'77.2090'}°E</p></div>
            <button onClick={onClose} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'white',padding:10,borderRadius:12,cursor:'pointer',display:'flex'}}><X size={22}/></button>
          </div>
        </div>
        <div style={{padding:'28px 32px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:28}}>
            {[{icon:<Wind size={22} color="#3b82f6"/>,label:'Wind',val:'12 km/h',bg:'#eff6ff'},{icon:<Droplets size={22} color="#3b82f6"/>,label:'Humidity',val:'68%',bg:'#eff6ff'},{icon:<Thermometer size={22} color="#ef4444"/>,label:'Feels Like',val:'31°C',bg:'#fef2f2'},{icon:<CloudRain size={22} color="#6366f1"/>,label:'Rain Chance',val:'40%',bg:'#f5f3ff'}].map(({icon,label,val,bg})=>(<div key={label} style={{background:bg,borderRadius:18,padding:'16px 20px',display:'flex',alignItems:'center',gap:12,border:'1px solid rgba(0,0,0,0.05)'}}><div style={{background:'white',padding:8,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>{icon}</div><div><div style={{fontSize:10,color:'#999',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px'}}>{label}</div><div className="syne" style={{fontSize:18,fontWeight:700,color:'#1a1a1a'}}>{val}</div></div></div>))}
          </div>
          {forecast.map((f,i)=>(<div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 18px',borderRadius:16,transition:'background 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background='#f8fffe'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><span style={{fontWeight:600,color:'#555',width:40,fontSize:14}}>{f.day}</span><div style={{display:'flex',alignItems:'center',gap:8,flex:1,justifyContent:'center'}}><div style={{width:8,height:8,borderRadius:'50%',background:f.color}}/><span style={{fontSize:13,color:'#666',fontWeight:500}}>{f.status}</span></div><span className="syne" style={{fontWeight:700,fontSize:18,color:'#1a1a1a'}}>{f.temp}</span></div>))}
          <div style={{marginTop:20,background:'linear-gradient(135deg,#fff7ed,#fef3c7)',border:'1px solid rgba(245,158,11,0.25)',padding:'16px 20px',borderRadius:20,display:'flex',gap:12,alignItems:'flex-start'}}><AlertTriangle color="#d97706" size={22} style={{flexShrink:0,marginTop:2}}/><div><div style={{fontWeight:800,fontSize:13,color:'#92400e',textTransform:'uppercase'}}>Spraying Advisory</div><div style={{fontSize:12,color:'#a16207',marginTop:4,lineHeight:1.6}}>Strong winds Tuesday. Complete pesticide spraying by 10 AM tomorrow for best results.</div></div></div>
        </div>
      </div>
    </div>
  );
};

/* ─── CROP ADVISORY MODAL ─── */
const CropAdvisoryModal = ({ onClose }) => {
  const [sel,setSel]=useState('Wheat');
  const timeline=[{stage:'Sowing',status:'completed',date:'Oct 15',task:'Base fertilizer (NPK) applied successfully.'},{stage:'Germination',status:'completed',date:'Oct 25',task:'Initial irrigation done. Seedling health: 94%.'},{stage:'Tillering',status:'active',date:'Today',task:'Apply First Top Dressing (Urea). Check for weeds.',alert:'Rain expected — delay spraying by 24h.'},{stage:'Flowering',status:'upcoming',date:'Dec 10',task:'Maintain soil moisture. Monitor for aphids.'},{stage:'Harvest',status:'upcoming',date:'Feb 20',task:'Predicted yield: 32 q/ha based on current growth rate.'}];
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div style={{background:'linear-gradient(135deg,#0891b2,#0e7490)',padding:'28px 32px',color:'white'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',gap:16,alignItems:'center'}}><div style={{background:'rgba(255,255,255,0.2)',padding:12,borderRadius:16}}><Leaf size={28}/></div><div><div style={{fontSize:11,letterSpacing:'2px',opacity:0.7,fontWeight:600,textTransform:'uppercase',marginBottom:4}}>Personalized AI</div><h2 className="syne" style={{fontSize:26,fontWeight:800,margin:0}}>Crop Advisory</h2></div></div><button onClick={onClose} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'white',padding:10,borderRadius:12,cursor:'pointer',display:'flex'}}><X size={22}/></button></div></div>
        <div style={{padding:'28px 32px',maxHeight:'70vh',overflowY:'auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}><div style={{display:'flex',background:'#f5f5f5',padding:4,borderRadius:16}}>{['Wheat','Rice'].map(c=>(<button key={c} onClick={()=>setSel(c)} style={{padding:'8px 20px',borderRadius:12,fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:'inherit',background:sel===c?'white':'transparent',color:sel===c?'#0891b2':'#888',boxShadow:sel===c?'0 2px 8px rgba(0,0,0,0.08)':'none',transition:'all 0.2s'}}>{c}</button>))}</div><div style={{textAlign:'right'}}><div style={{fontSize:10,color:'#aaa',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px'}}>Current Stage</div><div style={{color:'#0891b2',fontWeight:800,fontSize:16}}>Tillering · Day 42</div></div></div>
          <div style={{position:'relative'}}><div style={{position:'absolute',left:19,top:0,bottom:0,width:2,background:'linear-gradient(to bottom,#22c55e,#0891b2,#e5e7eb)'}}/>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>{timeline.map((item,i)=>(<div key={i} style={{display:'flex',gap:20}}><div style={{width:40,height:40,borderRadius:12,flexShrink:0,zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',background:item.status==='completed'?'#22c55e':item.status==='active'?'#0891b2':'#e5e7eb',color:item.status==='upcoming'?'#9ca3af':'white',boxShadow:item.status==='active'?'0 0 0 6px rgba(8,145,178,0.15)':'0 2px 8px rgba(0,0,0,0.1)'}}>{item.status==='completed'?<CheckCircle2 size={18}/>:<Clock size={18}/>}</div><div style={{flex:1,padding:'16px 20px',borderRadius:20,background:item.status==='active'?'linear-gradient(135deg,#ecfeff,#f0f9ff)':'#fafafa',border:`1px solid ${item.status==='active'?'rgba(8,145,178,0.2)':'#f0f0f0'}`}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><div className="syne" style={{fontWeight:700,fontSize:16,color:item.status==='active'?'#0891b2':'#555'}}>{item.stage}</div><span style={{fontSize:11,color:'#aaa',fontWeight:600,background:'#f0f0f0',padding:'3px 10px',borderRadius:20}}>{item.date}</span></div><p style={{fontSize:13,color:'#666',margin:0,lineHeight:1.6}}>{item.task}</p>{item.alert&&(<div style={{marginTop:10,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',padding:'10px 14px',borderRadius:14,display:'flex',gap:8,alignItems:'center'}}><AlertTriangle size={14} color="#d97706" style={{flexShrink:0}}/><span style={{fontSize:12,color:'#92400e',fontWeight:600}}>{item.alert}</span></div>)}</div></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── AI PLANT DOCTOR MODAL ─── */
const PlantDoctorModal = ({ onClose }) => {
  const [image,setImage]=useState(null);
  const [analyzing,setAnalyzing]=useState(false);
  const [result,setResult]=useState(null);
  const [progress,setProgress]=useState(0);
  const handleImageUpload=(e)=>{const f=e.target.files[0];if(f){setImage(URL.createObjectURL(f));setResult(null);}};
  const analyzeCrop=()=>{setAnalyzing(true);setProgress(0);const iv=setInterval(()=>setProgress(p=>Math.min(p+4,95)),80);setTimeout(()=>{clearInterval(iv);setProgress(100);setTimeout(()=>{setAnalyzing(false);setResult({disease:'Yellow Rust (पीला रतुआ)',confidence:98.2,treatment:['Spray Propiconazole 25% EC at 1ml/L water','Avoid excess urea in current growth stage','Re-inspect field after 7 days']});},400);},2800);};
  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{maxWidth:480}}>
        <div style={{background:'linear-gradient(135deg,#dc2626,#991b1b)',padding:'24px 28px',color:'white'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',gap:14,alignItems:'center'}}><div style={{background:'rgba(255,255,255,0.2)',padding:10,borderRadius:14}}><Camera size={24}/></div><div><div style={{fontSize:10,letterSpacing:'2px',opacity:0.65,fontWeight:600,textTransform:'uppercase'}}>98% Accuracy</div><h2 className="syne" style={{fontSize:22,fontWeight:800,margin:0}}>AI Plant Doctor</h2></div></div><button onClick={onClose} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'white',padding:8,borderRadius:10,cursor:'pointer',display:'flex'}}><X size={20}/></button></div></div>
        <div style={{padding:'24px 28px'}}>
          <div style={{width:'100%',height:260,borderRadius:24,border:`2px dashed ${image?'transparent':'#e5e7eb'}`,background:image?'transparent':'#fafafa',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative',marginBottom:20}}>
            {image?(<><img src={image} alt="Crop" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:22}}/>{!result&&!analyzing&&(<button onClick={()=>setImage(null)} style={{position:'absolute',top:12,right:12,background:'rgba(0,0,0,0.5)',color:'white',border:'none',padding:8,borderRadius:10,cursor:'pointer',display:'flex'}}><X size={16}/></button>)}</>):(<div style={{textAlign:'center'}}><div style={{background:'#fee2e2',padding:20,borderRadius:'50%',display:'inline-flex',marginBottom:14}}><Upload size={40} color="#dc2626"/></div><p style={{fontSize:12,fontWeight:600,color:'#aaa',textTransform:'uppercase',letterSpacing:'1.5px',margin:0}}>Drop a leaf photo here</p></div>)}
            {analyzing&&(<div style={{position:'absolute',inset:0,background:'rgba(220,38,38,0.92)',backdropFilter:'blur(4px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',borderRadius:22}}><Activity size={48} style={{animation:'spinSlow 2s linear infinite',marginBottom:16}}/><div className="syne" style={{fontSize:20,fontWeight:800}}>SCANNING BIOMASS</div><div style={{fontSize:11,opacity:0.65,marginTop:6,marginBottom:16}}>Connecting to Agronomy Cloud...</div><div style={{width:180,height:4,background:'rgba(255,255,255,0.2)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',background:'white',borderRadius:4,width:`${progress}%`,transition:'width 0.1s'}}/></div><div style={{fontSize:12,marginTop:8,opacity:0.7}}>{progress}%</div></div>)}
          </div>
          {!image?(<label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,padding:'16px 28px',background:'#111',color:'white',borderRadius:18,fontWeight:700,cursor:'pointer',fontSize:14,letterSpacing:'0.5px'}}><input type="file" accept="image/*" style={{display:'none'}} onChange={handleImageUpload}/><Camera size={20}/> START DIAGNOSIS</label>):!result&&!analyzing?(<button onClick={analyzeCrop} className="btn-primary" style={{width:'100%',background:'linear-gradient(135deg,#dc2626,#b91c1c)',padding:'16px',fontSize:15,boxShadow:'0 12px 30px rgba(220,38,38,0.3)'}}>RUN AI ANALYSIS</button>):null}
          {result&&(<div style={{animation:'fadeUp 0.5s ease'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:16}}><div><div style={{fontSize:11,fontWeight:700,color:'#dc2626',textTransform:'uppercase',letterSpacing:'1px',marginBottom:4}}>Disease Identified</div><div className="syne" style={{fontSize:22,fontWeight:800,color:'#1a1a1a'}}>{result.disease}</div></div><span style={{background:'rgba(34,197,94,0.1)',color:'#15803d',border:'1px solid rgba(34,197,94,0.2)',padding:'5px 12px',borderRadius:20,fontSize:11,fontWeight:600}}>{result.confidence}% Match</span></div><div style={{background:'#f8fafc',border:'1px solid #e5e7eb',borderRadius:18,padding:'16px 20px'}}><div style={{fontSize:11,fontWeight:700,color:'#aaa',textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:12}}>Treatment Plan</div>{result.treatment.map((t,i)=>(<div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10}}><div style={{width:22,height:22,borderRadius:'50%',background:'#dcfce7',color:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div><span style={{fontSize:13,color:'#444',lineHeight:1.6}}>{t}</span></div>))}</div><button onClick={()=>{setImage(null);setResult(null);}} style={{width:'100%',marginTop:12,padding:'11px',background:'transparent',border:'1px solid #e5e7eb',borderRadius:14,color:'#888',fontWeight:600,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>↺ Retake Photo</button></div>)}
        </div>
      </div>
    </div>
  );
};

/* ─── FEATURE CARD ─── */
const FeatureCard = ({ title, description, icon: Icon, color, badge, delay=0, onClick, isNew=false }) => (
  <div className="card anim-fade-up" style={{padding:'28px',cursor:'pointer',animationDelay:`${delay}ms`}} onClick={onClick}>
    <div style={{position:'absolute',top:0,right:0,width:100,height:100,opacity:0.04,color,overflow:'hidden',borderRadius:'0 24px 0 0',display:'flex',alignItems:'flex-start',justifyContent:'flex-end',padding:10}}><Icon size={80}/></div>
    {badge&&(<div style={{position:'absolute',top:20,right:20}}><span style={{background:color,color:'white',fontSize:9,fontWeight:800,padding:'3px 8px',borderRadius:20,textTransform:'uppercase',letterSpacing:'1px'}}>{badge}</span></div>)}
    {isNew&&(<div style={{position:'absolute',top:badge?40:20,right:20}}><span style={{background:'#fef3c7',color:'#92400e',fontSize:9,fontWeight:800,padding:'3px 8px',borderRadius:20,textTransform:'uppercase',letterSpacing:'1px'}}>NEW</span></div>)}
    <div className="feature-icon-wrap" style={{background:`${color}15`}}><Icon size={28} color={color}/></div>
    <h3 className="syne" style={{fontSize:19,fontWeight:800,color:'#0f1f13',margin:'0 0 8px',letterSpacing:'-0.3px'}}>{title}</h3>
    <p style={{fontSize:13.5,color:'#7a8f7e',lineHeight:1.65,margin:'0 0 20px',fontWeight:400}}>{description}</p>
    <div style={{display:'flex',alignItems:'center',gap:4,fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'1.5px',color}}>Explore <ArrowUpRight size={14}/></div>
  </div>
);

/* ─── MAIN APP ─── */
const App = () => {
  const [showSplash,setShowSplash]=useState(true);
  const [location,setLocation]=useState(null);
  const [lang,setLang]=useState('en');
  const [darkMode,setDarkMode]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [isListening,setIsListening]=useState(false);
  const [showLangMenu,setShowLangMenu]=useState(false);
  const [notifGranted,setNotifGranted]=useState(false);
  const [canInstallPWA,setCanInstallPWA]=useState(false);

  // Modals
  const [showPlantDoctor,setShowPlantDoctor]=useState(false);
  const [showAdvisory,setShowAdvisory]=useState(false);
  const [showWeather,setShowWeather]=useState(false);
  const [showPricePredictor,setShowPricePredictor]=useState(false);
  const [showYield,setShowYield]=useState(false);
  const [showIrrigation,setShowIrrigation]=useState(false);
  const [showSchemes,setShowSchemes]=useState(false);
  const [showSubs,setShowSubs]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [showPest,setShowPest]=useState(false);
  const [showOnboarding,setShowOnboarding]=useState(() => !localStorage.getItem('agri_onboarded'));
  const [showReferral,setShowReferral]=useState(false);
  const [showSoilReport,setShowSoilReport]=useState(false);
  const [showGroupBuying,setShowGroupBuying]=useState(false);
  const [showDrone,setShowDrone]=useState(false);
  const [showSatellite,setShowSatellite]=useState(false);
  const [showCarbon,setShowCarbon]=useState(false);
  const [showBNPL,setShowBNPL]=useState(false);
  const [showSupplyChain,setShowSupplyChain]=useState(false);
  const [showAgronomist,setShowAgronomist]=useState(false);
  const [showPestHeatmap,setShowPestHeatmap]=useState(false);
  const [farmerProfile,setFarmerProfile]=useState(null);

  const defaultBg='https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000';
  const [bgImage,setBgImage]=useState(defaultBg);
  const fileInputRef=useRef(null);
  const t=useLang(lang);

  useEffect(()=>{ initAnalytics(); },[]);
  useEffect(()=>{ navigator.geolocation.getCurrentPosition((p)=>setLocation({lat:p.coords.latitude.toFixed(4),lon:p.coords.longitude.toFixed(4)}),()=>{}); },[]);
  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>60); window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h); },[]);
  useEffect(()=>{ document.documentElement.style.filter=darkMode?'invert(1) hue-rotate(180deg)':'none'; return()=>{ document.documentElement.style.filter='none'; }; },[darkMode]);
  useEffect(()=>{ const iv=setInterval(()=>setCanInstallPWA(canInstall()),2000); return()=>clearInterval(iv); },[]);

  const handleBgUpload=(e)=>{ const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onloadend=()=>setBgImage(r.result); r.readAsDataURL(f); } };
  const handleNotify=async()=>{ const ok=await requestPushPermission(); setNotifGranted(ok); };

  const features = [
    {title:t.featurePlantDoctor,description:t.descPlantDoctor,icon:Camera,color:'#dc2626',badge:'AI',delay:0,onClick:()=>{setShowPlantDoctor(true);track('Feature Open',{feature:'PlantDoctor'});}},
    {title:t.featureSoil,description:t.descSoil,icon:Wifi,color:'#2563eb',badge:'IoT',delay:80,onClick:()=>alert('Connect your IoT device via Bluetooth')},
    {title:t.featureMarket,description:t.descMarket,icon:TrendingUp,color:'#d97706',badge:'Live',delay:160,onClick:()=>{setShowPricePredictor(true);track('Feature Open',{feature:'MarketForecast'});}},
    {title:t.featureRent,description:t.descRent,icon:Tractor,color:'#ea580c',delay:240,onClick:()=>alert('Checking nearby rentals…')},
    {title:t.featureAdvisory,description:t.descAdvisory,icon:Leaf,color:'#0891b2',delay:320,onClick:()=>{setShowAdvisory(true);track('Feature Open',{feature:'CropAdvisory'});}},
    {title:t.featureCommunity,description:t.descCommunity,icon:Users,color:'#7c3aed',delay:400,onClick:()=>alert('Loading community posts…')},
    {title:t.featureYield,description:t.descYield,icon:BarChart3,color:'#166534',badge:'AI',delay:60,isNew:true,onClick:()=>{setShowYield(true);track('Feature Open',{feature:'YieldPredictor'});}},
    {title:t.featureIrrigation,description:t.descIrrigation,icon:Droplets,color:'#0284c7',badge:'AI',delay:140,isNew:true,onClick:()=>{setShowIrrigation(true);track('Feature Open',{feature:'SmartIrrigation'});}},
    {title:t.featurePest,description:t.descPest,icon:Bug,color:'#b45309',badge:'AI',delay:200,isNew:true,onClick:()=>{setShowPest(true);track('Feature Open',{feature:'PestAlert'});}},
    {title:t.featureSchemes,description:t.descSchemes,icon:Shield,color:'#7c3aed',delay:220,isNew:true,onClick:()=>{setShowSchemes(true);track('Feature Open',{feature:'GovtSchemes'});}},
    {title:'Refer & Earn',description:'Invite farmers and earn coins. Unlock Pro features, IoT discounts, and monthly prizes.',icon:Gift,color:'#7c3aed',delay:260,isNew:true,onClick:()=>{setShowReferral(true);track('Feature Open',{feature:'Referral'});}},
    {title:'Soil Health Report',description:'Full nutrient analysis — N, P, K, pH, Organic Carbon. Download branded PDF for bank or KVK.',icon:FileText,color:'#78350f',delay:280,isNew:true,onClick:()=>{setShowSoilReport(true);track('Feature Open',{feature:'SoilReport'});}},
    {title:'Group Buying',description:'Pool orders with 10 farmers — save 35% on seeds, fertilizers and pesticides. Pinduoduo model for India.',icon:Users,color:'#166534',delay:100,isNew:true,onClick:()=>{setShowGroupBuying(true);track('Feature Open',{feature:'GroupBuying'});}},
    {title:'Drone Marketplace',description:'Book licensed drone operators for spraying and field mapping. ₹600–900/acre. XAG model for India.',icon:Zap,color:'#0f172a',delay:120,isNew:true,onClick:()=>{setShowDrone(true);track('Feature Open',{feature:'DroneMarketplace'});}},
    {title:'Satellite Field Maps',description:'Weekly Sentinel-2 NDVI crop health maps showing stress zones before visible damage — FieldView level.',icon:Star,color:'#1a237e',delay:140,isNew:true,onClick:()=>{setShowSatellite(true);track('Feature Open',{feature:'SatelliteNDVI'});}},
    {title:'Carbon Credits',description:'Earn ₹1,650–2,200 per tonne CO₂ sequestered. VERRA VCS registry. Climate Corp model for India.',icon:Leaf,color:'#052e16',delay:160,isNew:true,onClick:()=>{setShowCarbon(true);track('Feature Open',{feature:'CarbonCredits'});}},
    {title:'Buy Now Pay Harvest',description:'Get seeds, fertilizer and equipment on credit — repay after harvest. Zero-interest options available.',icon:Crown,color:'#1c1917',delay:180,isNew:true,onClick:()=>{setShowBNPL(true);track('Feature Open',{feature:'BNPL'});}},
    {title:'Supply Chain Tracker',description:'QR-traceable produce batches from farm to buyer. EU-standard traceability for premium market access.',icon:BarChart3,color:'#0f3460',delay:200,isNew:true,onClick:()=>{setShowSupplyChain(true);track('Feature Open',{feature:'SupplyChain'});}},
    {title:'Agronomist AI Chat',description:'Ask any crop question — ICAR + KVK knowledge base. GPT-quality answers in Hindi, Telugu, English.',icon:Wifi,color:'#052e16',delay:220,isNew:true,onClick:()=>{setShowAgronomist(true);track('Feature Open',{feature:'AgronomistChat'});}},
    {title:'Pest Heatmap',description:'Live crowdsourced pest pressure across India. Like Waze for crop disease — 487 reports today.',icon:AlertTriangle,color:'#450a0a',delay:240,isNew:true,onClick:()=>{setShowPestHeatmap(true);track('Feature Open',{feature:'PestHeatmap'}); }},
    {title:t.featureSubs,description:t.descSubs,icon:Crown,color:'#d97706',delay:300,onClick:()=>{setShowSubs(true);track('Feature Open',{feature:'Subscription'});}},
    {title:t.featureAdmin,description:t.descAdmin,icon:BarChart3,color:'#1e293b',delay:380,onClick:()=>{setShowAdmin(true);track('Feature Open',{feature:'FarmAnalytics'});}},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        :root{--green:#22c55e;--green-light:#4ade80;--green-dark:#166534;--green-glow:rgba(34,197,94,0.25);}
        *{box-sizing:border-box;}
        body{background:#f0faf4;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;margin:0;overflow-x:hidden;}
        .syne{font-family:'Syne',system-ui,sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulseRing{0%{box-shadow:0 0 0 0 var(--green-glow)}70%{box-shadow:0 0 0 16px transparent}100%{box-shadow:0 0 0 0 transparent}}
        @keyframes dashIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
        .anim-dash{animation:dashIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;}
        .anim-fade-up{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;}
        .anim-slide-down{animation:slideDown 0.5s cubic-bezier(0.16,1,0.3,1) both;}
        .spin-slow{animation:spinSlow 18s linear infinite;}
        .card{background:#fff;border-radius:24px;border:1px solid rgba(34,197,94,0.12);transition:all 0.4s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden;}
        .card:hover{transform:translateY(-6px);box-shadow:0 24px 60px -12px rgba(22,101,52,0.18),0 0 0 1px rgba(34,197,94,0.22);}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#4ade80,transparent);opacity:0;transition:opacity 0.35s;}
        .card:hover::before{opacity:1;}
        .btn-primary{background:linear-gradient(135deg,#166534 0%,#15803d 100%);color:white;border:none;border-radius:16px;padding:14px 28px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s ease;font-family:inherit;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(22,101,52,0.35);}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:120;padding:16px;animation:fadeIn 0.25s ease;}
        .modal-box{background:white;border-radius:32px;width:100%;max-width:640px;overflow:hidden;box-shadow:0 40px 120px -20px rgba(0,0,0,0.4);animation:fadeUp 0.4s cubic-bezier(0.34,1.2,0.64,1);}
        .feature-icon-wrap{width:56px;height:56px;border-radius:18px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);}
        .card:hover .feature-icon-wrap{transform:scale(1.12) rotate(6deg);}
        ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(34,197,94,0.3);border-radius:3px;}
      `}</style>

      {showSplash&&<SplashScreen onComplete={()=>setShowSplash(false)}/>}
      {showPlantDoctor&&<PlantDoctorModal onClose={()=>setShowPlantDoctor(false)}/>}
      {showAdvisory&&<CropAdvisoryModal onClose={()=>setShowAdvisory(false)}/>}
      {showWeather&&<WeatherModal location={location} onClose={()=>setShowWeather(false)}/>}
      {showPricePredictor&&<PricePredictorModal onClose={()=>setShowPricePredictor(false)}/>}
      {showYield&&<YieldPredictorModal onClose={()=>setShowYield(false)}/>}
      {showIrrigation&&<SmartIrrigationModal onClose={()=>setShowIrrigation(false)}/>}
      {showSchemes&&<GovtSchemesModal onClose={()=>setShowSchemes(false)}/>}
      {showSubs&&<SubscriptionModal onClose={()=>setShowSubs(false)}/>}
      {showAdmin&&<FarmAnalyticsModal onClose={()=>setShowAdmin(false)}/>}
      {showPest&&<PestAlertModal onClose={()=>setShowPest(false)}/>}
      {showReferral&&<ReferralModal onClose={()=>setShowReferral(false)}/>}
      {showSoilReport&&<SoilReportModal onClose={()=>setShowSoilReport(false)}/>}
      {showGroupBuying&&<GroupBuyingModal onClose={()=>setShowGroupBuying(false)}/>}
      {showDrone&&<DroneMarketplaceModal onClose={()=>setShowDrone(false)}/>}
      {showSatellite&&<SatelliteNDVIModal onClose={()=>setShowSatellite(false)}/>}
      {showCarbon&&<CarbonCreditsModal onClose={()=>setShowCarbon(false)}/>}
      {showBNPL&&<BNPLModal onClose={()=>setShowBNPL(false)}/>}
      {showSupplyChain&&<SupplyChainModal onClose={()=>setShowSupplyChain(false)}/>}
      {showAgronomist&&<AgronomistChatModal onClose={()=>setShowAgronomist(false)}/>}
      {showPestHeatmap&&<PestHeatmapModal onClose={()=>setShowPestHeatmap(false)}/>}
      {showOnboarding&&<OnboardingFlow onComplete={(profile)=>{setFarmerProfile(profile);setShowOnboarding(false);try{localStorage.setItem('agri_onboarded','1');}catch(_){}}}/>}

      <div className={showSplash?'':'anim-dash'} style={{minHeight:'100vh',background:'#f0faf4'}}>
        {/* NAV */}
        <nav className="anim-slide-down" style={{position:'fixed',top:0,width:'100%',zIndex:50,padding:'0 16px',height:64,display:'flex',justifyContent:'space-between',alignItems:'center',background:scrolled?'rgba(255,255,255,0.94)':'rgba(0,0,0,0.35)',backdropFilter:'blur(20px)',borderBottom:scrolled?'1px solid rgba(34,197,94,0.15)':'1px solid rgba(255,255,255,0.1)',transition:'all 0.4s ease',boxShadow:scrolled?'0 4px 24px rgba(0,0,0,0.08)':'none'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',padding:'8px 10px',borderRadius:14,boxShadow:'0 4px 14px rgba(34,197,94,0.4)',display:'flex'}}><Leaf size={20} color="white"/></div>
            <span className="syne" style={{fontSize:22,fontWeight:800,color:scrolled?'#0f1f13':'white',letterSpacing:'-0.5px'}}>{t.appName}<span style={{color:'#22c55e'}}>.</span></span>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {/* PWA Install */}
            {canInstallPWA&&(<button onClick={()=>installPWA()} style={{display:'flex',alignItems:'center',gap:6,background:scrolled?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.1)',color:scrolled?'#166534':'white',border:`1px solid ${scrolled?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.15)'}`,padding:'7px 14px',borderRadius:12,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}><Download size={14}/>{t.install}</button>)}

            {/* Notifications */}
            <button onClick={handleNotify} style={{background:notifGranted?'rgba(34,197,94,0.15)':scrolled?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.1)',border:'none',color:notifGranted?'#16a34a':scrolled?'#166534':'white',padding:'9px',borderRadius:12,cursor:'pointer',display:'flex'}} title={t.notifyMe}><Bell size={18}/></button>

            {/* Dark mode */}
            <button onClick={()=>setDarkMode(!darkMode)} style={{background:scrolled?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.1)',border:'none',color:scrolled?'#166534':'white',padding:'9px',borderRadius:12,cursor:'pointer',display:'flex'}} title={darkMode?t.lightMode:t.darkMode}><Sun size={18}/></button>

            {/* My Farm bg */}
            <button onClick={()=>fileInputRef.current.click()} style={{display:'flex',alignItems:'center',gap:7,background:scrolled?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.12)',color:scrolled?'#166534':'white',border:`1px solid ${scrolled?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.15)'}`,padding:'8px 16px',borderRadius:12,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}><ImageIcon size={15}/>{t.myFarm}</button>
            <input type="file" ref={fileInputRef} style={{display:'none'}} accept="image/*" onChange={handleBgUpload}/>

            {/* Language switcher */}
            <div style={{position:'relative'}}>
              <button onClick={()=>setShowLangMenu(!showLangMenu)} style={{background:scrolled?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.12)',border:'none',color:scrolled?'#166534':'white',padding:'8px 12px',borderRadius:12,cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontSize:12,fontWeight:700,fontFamily:'inherit'}}><Languages size={16}/>{lang.toUpperCase()}</button>
              {showLangMenu&&(<div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'white',borderRadius:16,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',border:'1px solid rgba(34,197,94,0.15)',overflow:'hidden',zIndex:200,minWidth:140}}>
                {Object.entries(LANGS).map(([code,name])=>(<button key={code} onClick={()=>{setLang(code);setShowLangMenu(false);track('Language Change',{lang:code});}} style={{display:'block',width:'100%',padding:'11px 18px',border:'none',background:lang===code?'rgba(34,197,94,0.08)':'white',cursor:'pointer',textAlign:'left',fontWeight:lang===code?700:400,fontSize:13,color:lang===code?'#166534':'#333',fontFamily:'inherit',transition:'background 0.15s'}}>{name}</button>))}
              </div>)}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header style={{height:580,display:'flex',alignItems:'center',paddingTop:68,paddingLeft:'clamp(16px,4vw,40px)',paddingRight:'clamp(16px,4vw,40px)',borderRadius:'0 0 56px 56px',overflow:'hidden',backgroundImage:`linear-gradient(to bottom,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.75) 100%),url('${bgImage}')`,backgroundSize:'cover',backgroundPosition:'center',backgroundAttachment:'fixed',position:'relative'}}>
          <div style={{maxWidth:1100,margin:'0 auto',width:'100%',position:'relative',zIndex:2}}>
            <div style={{animation:'fadeUp 0.8s ease 0.2s both'}}><span style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.2)',border:'1px solid rgba(34,197,94,0.35)',color:'#4ade80',fontSize:11,fontWeight:700,padding:'5px 14px',borderRadius:20,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:20,backdropFilter:'blur(8px)'}}><div style={{width:7,height:7,background:'#22c55e',borderRadius:'50%',animation:'pulseRing 1.5s infinite'}}/>{t.liveBadge}</span></div>
            <h1 className="syne" style={{fontSize:'clamp(34px, 6vw, 66px)',fontWeight:800,color:'white',margin:'0 0 20px',lineHeight:1.05,letterSpacing:'-1px',animation:'fadeUp 0.8s ease 0.35s both'}}>{t.heroHeading.split(' ')[0]}<br/><span style={{color:'#4ade80'}}>{t.heroHeading.split(' ').slice(1).join(' ')}</span></h1>
            <p style={{fontSize:'clamp(14px,2vw,17px)',color:'rgba(255,255,255,0.65)',margin:'0 0 32px',maxWidth:520,lineHeight:1.7,fontWeight:400,animation:'fadeUp 0.8s ease 0.45s both'}}>{t.heroSub}</p>
            <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',animation:'fadeUp 0.8s ease 0.55s both'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.1)',backdropFilter:'blur(16px)',color:'white',padding:'10px 20px',borderRadius:24,border:'1px solid rgba(255,255,255,0.18)',fontSize:13,fontWeight:600}}><MapPin size={15} color="#4ade80"/>{location?`${location.lat}°N, ${location.lon}°E`:'Locating field...'}</div>
              <button onClick={()=>setBgImage(defaultBg)} style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.45)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px 14px',borderRadius:14,cursor:'pointer',display:'flex',alignItems:'center'}}><Settings size={14}/></button>
            </div>
            <div onClick={()=>setShowWeather(true)} style={{display:'inline-flex',alignItems:'center',gap:22,background:'rgba(255,255,255,0.1)',backdropFilter:'blur(24px)',padding:'18px 28px',borderRadius:28,border:'1px solid rgba(255,255,255,0.18)',marginTop:28,cursor:'pointer',transition:'all 0.3s ease',animation:'fadeUp 0.8s ease 0.65s both',boxShadow:'0 8px 32px rgba(0,0,0,0.2)'}} onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.18)';e.currentTarget.style.transform='scale(1.03)';}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.1)';e.currentTarget.style.transform='scale(1)';}}>
              <div style={{position:'relative'}}><Sun size={52} color="#fbbf24" className="spin-slow"/><CloudRain size={22} color="#93c5fd" style={{position:'absolute',bottom:-4,right:-6}}/></div>
              <div style={{color:'white'}}><div style={{display:'flex',alignItems:'center',gap:10}}><span className="syne" style={{fontSize:46,fontWeight:800,letterSpacing:'-2px'}}>28°C</span><span style={{background:'rgba(34,197,94,0.25)',border:'1px solid rgba(34,197,94,0.4)',color:'#4ade80',fontSize:10,fontWeight:700,padding:'4px 10px',borderRadius:20,letterSpacing:'1px'}}>● Live</span></div><p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.6)',fontWeight:500,textTransform:'uppercase',letterSpacing:'1.5px'}}>Delhi · Clear Sky · {t.weatherTap}</p></div>
            </div>
          </div>
        </header>

        {/* STATS BAR */}
        <div style={{maxWidth:1100,margin:'-28px auto 0',padding:'0 clamp(16px,4vw,40px)',position:'relative',zIndex:10}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,background:'white',borderRadius:24,padding:'20px 24px',boxShadow:'0 20px 60px rgba(0,0,0,0.12)',border:'1px solid rgba(34,197,94,0.1)'}}>
            {[{icon:<Users size={20} color="#22c55e"/>,num:'2M+',label:t.activeFarmers},{icon:<Shield size={20} color="#3b82f6"/>,num:'98%',label:t.aiAccuracy},{icon:<Zap size={20} color="#f59e0b"/>,num:'<3s',label:t.diagnosisTime},{icon:<Star size={20} color="#8b5cf6"/>,num:'4.9★',label:t.appRating}].map(({icon,num,label})=>(<div key={label} style={{display:'flex',alignItems:'center',gap:14,padding:'4px 0'}}><div style={{background:'#f8fffe',padding:10,borderRadius:12,border:'1px solid rgba(34,197,94,0.1)',flexShrink:0}}>{icon}</div><div><div className="syne" style={{fontSize:22,fontWeight:800,color:'#0f1f13',lineHeight:1}}>{num}</div><div style={{fontSize:11,color:'#7a8f7e',fontWeight:500,marginTop:3}}>{label}</div></div></div>))}
          </div>
        </div>

        {/* FEATURE GRID */}
        <main style={{maxWidth:1100,margin:'48px auto 0',padding:'0 clamp(16px,4vw,40px) 120px'}}>
          <div style={{marginBottom:36}}>
            <span style={{fontSize:11,fontWeight:700,color:'#22c55e',textTransform:'uppercase',letterSpacing:'2.5px'}}>{t.smartToolkit}</span>
            <h2 className="syne" style={{fontSize:36,fontWeight:800,color:'#0f1f13',margin:'8px 0 0',letterSpacing:'-1px'}}>{t.everythingYouNeed}</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:20}}>
            {features.map(f=><FeatureCard key={f.title} {...f}/>)}
          </div>
        </main>

        {/* VOICE FAB */}
        <div style={{position:'fixed',bottom:32,right:32,zIndex:100}}>
          {isListening&&(<div style={{position:'absolute',bottom:'120%',right:0,background:'rgba(15,31,19,0.9)',color:'white',fontSize:12,fontWeight:700,padding:'8px 16px',borderRadius:12,whiteSpace:'nowrap',backdropFilter:'blur(8px)',animation:'fadeUp 0.3s ease'}}>{t.listening}</div>)}
          <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'#22c55e',opacity:isListening?0.4:0.25,animation:isListening?'pulseRing 1s infinite':'pulseRing 2.5s infinite'}}/>
          <button onMouseDown={()=>setIsListening(true)} onMouseUp={()=>setIsListening(false)} onTouchStart={()=>setIsListening(true)} onTouchEnd={()=>setIsListening(false)} style={{position:'relative',background:isListening?'linear-gradient(135deg,#dc2626,#b91c1c)':'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',border:'3px solid white',width:64,height:64,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:isListening?'0 8px 30px rgba(220,38,38,0.5)':'0 8px 30px rgba(34,197,94,0.45)',transform:isListening?'scale(1.18)':'scale(1)',transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)'}}>
            {isListening?<Activity size={28}/>:<Mic size={28}/>}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
