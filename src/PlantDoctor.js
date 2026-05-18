import React, { useState } from "react";
import { Camera, X, Upload, Activity } from "lucide-react";

const PlantDoctor = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // Fake AI analysis (for demo)
  const analyzeCrop = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        disease: "Yellow Rust (पीला रतुआ)",
        confidence: "94%",
        treatment: "Spray Propiconazole 25% EC (1ml per liter of water)."
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">

        {/* HEADER */}
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Camera /> AI Plant Doctor
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* IMAGE PREVIEW */}
          <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center mb-4 relative">
            {image ? (
              <img src={image} alt="Leaf" className="h-full w-full object-cover rounded-xl" />
            ) : (
              <div className="text-center text-gray-400">
                <Upload size={48} className="mx-auto mb-2" />
                <p>Upload leaf image</p>
              </div>
            )}

            {analyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <Activity className="animate-spin mb-2" />
                <p>AI Analyzing...</p>
              </div>
            )}
          </div>

          {/* ACTION BUTTON */}
          {!image ? (
            <label className="block bg-gray-800 text-white text-center py-3 rounded-xl cursor-pointer">
              Upload Photo
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </label>
          ) : (
            !result && (
              <button
                onClick={analyzeCrop}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
              >
                Analyze Disease
              </button>
            )
          )}

          {/* RESULT */}
          {result && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-bold text-red-700 text-lg">{result.disease}</p>
              <p className="text-sm text-gray-600">Confidence: {result.confidence}</p>
              <p className="mt-2 text-sm"><b>Treatment:</b> {result.treatment}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PlantDoctor;
