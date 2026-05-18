// --- SUB-COMPONENT: PRICE PREDICTOR MODAL ---
const PricePredictorModal = ({ onClose }) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  
  const marketData = [
    { mandi: "Khanna Mandi", price: "₹2,450", trend: "up", change: "+₹50" },
    { mandi: "Indore Market", price: "₹2,380", trend: "down", change: "-₹20" },
    { mandi: "Rajkot Mandi", price: "₹2,510", trend: "up", change: "+₹110" },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[120] p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-yellow-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} />
            <h2 className="text-2xl font-bold">Market Price Predictor</h2>
          </div>
          <button onClick={onClose} className="hover:bg-yellow-700 p-2 rounded-full transition"><X size={24} /></button>
        </div>

        <div className="p-6">
          {/* AI Prediction Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl p-5 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-black text-yellow-700 uppercase tracking-widest">AI Forecast (Next 15 Days)</p>
                <h3 className="text-2xl font-black text-gray-800">Expected Rise: 8-12%</h3>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <TrendingUp className="text-green-500" size={32} />
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our AI models suggest a price hike due to lower arrivals in neighboring states. 
              <span className="font-bold text-gray-800"> Recommendation: Hold stock for 10 more days.</span>
            </p>
          </div>

          {/* Simple Visual Trend Graph (SVG) */}
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4 tracking-widest">Price History (6 Months)</h3>
          <div className="h-32 w-full bg-gray-50 rounded-xl mb-8 relative flex items-end px-2 gap-1">
            {[40, 55, 45, 70, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 bg-yellow-400 rounded-t-lg transition-all hover:bg-yellow-500 cursor-pointer relative group" style={{ height: `${height}%` }}>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">₹{2000 + height*5}</span>
              </div>
            ))}
          </div>

          {/* Nearby Mandi Prices */}
          <div className="space-y-3">
            {marketData.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div>
                  <p className="font-bold text-gray-800">{m.mandi}</p>
                  <p className="text-xs text-gray-500">Last updated: 2h ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">{m.price}</p>
                  <p className={`text-xs font-bold ${m.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {m.change} {m.trend === 'up' ? '▲' : '▼'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};