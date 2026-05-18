require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5000;

// 1. INITIALIZE AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. IMAGE CONFIG
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 4. MARKET DATA (Keep your existing market feature)
const MARKET_DATA = {
  Wheat: [
    { id: 1, location: "Khanna Mandi", price: 2450, change: 50 },
    { id: 2, location: "Indore Market", price: 2380, change: -20 },
  ],
  Rice: [
    { id: 3, location: "Karnal Mandi", price: 3100, change: 150 },
    { id: 4, location: "Cuttack Market", price: 2850, change: 10 },
  ]
};

// 5. API ROUTES

// Market Route
app.get('/api/market', (req, res) => {
  const crop = req.query.crop || 'Wheat';
  res.json(MARKET_DATA[crop] || []);
});

// REAL-LIFE AI ANALYZER
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image received" });
    }

    // Initialize the model (Gemini 1.5 Flash is fast and good for images)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the image for Gemini
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // THE PROBLEM-SOLVER PROMPT
    const prompt = `
      Act as a professional agronomist. Analyze this crop image for diseases or pests.
      Return the response ONLY as a JSON object with these keys:
      {
        "diagnosis": "Name of disease",
        "severity": "Low/Medium/High",
        "immediate_action": "One critical step to take now",
        "organic_solution": "Natural treatment method",
        "chemical_solution": "Specific pesticide/fungicide name",
        "prevention": "How to avoid this next time"
      }
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, ""); // Clean the JSON string

    console.log("✅ Analysis Complete");
    res.json(JSON.parse(text));

  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({ error: "AI Analysis failed. Check your API key." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AGRIBIDGE BACKEND RUNNING ON PORT ${PORT}`);
});