import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Droplets,
  Leaf,
  X
} from "lucide-react";

const CropAdvisoryModal = ({ onClose }) => {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");

  const timeline = [
    {
      stage: "Sowing",
      status: "completed",
      date: "Oct 15",
      task: "Base fertilizer (NPK) applied."
    },
    {
      stage: "Germination",
      status: "completed",
      date: "Oct 25",
      task: "Initial irrigation done."
    },
    {
      stage: "Tillering",
      status: "active",
      date: "Today",
      task: "Apply first top dressing (Urea). Check for weeds.",
      alert: "Rain expected at 4 PM. Delay spraying by 24 hours."
    },
    {
      stage: "Flowering",
      status: "upcoming",
      date: "Dec 10",
      task: "Maintain soil moisture. Monitor for aphids."
    },
    {
      stage: "Harvest",
      status: "upcoming",
      date: "Mar 15",
      task: "Prepare storage and transport."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">

        {/* HEADER */}
        <div className="bg-cyan-600 p-5 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Leaf />
            <h2 className="text-xl font-bold">Personalized Crop Advisory</h2>
          </div>
          <button onClick={onClose}><X /></button>
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* CROP SELECTOR */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {["Wheat", "Rice", "Tomato"].map(crop => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedCrop === crop
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
            <p className="text-sm text-cyan-600 font-bold">
              Stage 3: Tillering
            </p>
          </div>

          {/* TIMELINE */}
          <div className="space-y-5">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex gap-4 p-4 rounded-xl border ${
                  item.status === "active"
                    ? "bg-cyan-50 border-cyan-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full ${
                    item.status === "completed"
                      ? "bg-green-500 text-white"
                      : item.status === "active"
                      ? "bg-cyan-600 text-white animate-pulse"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {item.status === "completed" ? <CheckCircle2 /> : <Clock />}
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold text-cyan-600">{item.date}</p>
                  <h4 className="font-bold">{item.stage}</h4>
                  <p className="text-sm text-gray-600">{item.task}</p>

                  {item.alert && (
                    <div className="mt-2 flex gap-2 bg-amber-50 p-2 rounded border">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <p className="text-xs text-amber-800">{item.alert}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ACTION */}
          <button className="w-full mt-6 bg-cyan-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <Droplets /> Update Irrigation Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisoryModal;
