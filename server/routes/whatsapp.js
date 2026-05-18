// ============================================================
// AgriBridge WhatsApp Business Bot
// Covers: OTP, daily price alerts, advisory, pest warnings
// Uses: Meta WhatsApp Business API (Cloud API)
// ============================================================

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

const WA_API_URL = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const WA_HEADERS = () => ({
  Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
});

// ─── Send text message ────────────────────────────────────────
async function sendText(phone, text) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN) {
    console.log(`[WA-DEV] → ${phone}: ${text}`);
    return { success: true, dev: true };
  }
  const res = await fetch(WA_API_URL, {
    method: 'POST', headers: WA_HEADERS(),
    body: JSON.stringify({
      messaging_product: 'whatsapp', to: `91${phone}`,
      type: 'text', text: { body: text, preview_url: false },
    }),
  });
  return res.json();
}

// ─── Send template message ────────────────────────────────────
async function sendTemplate(phone, templateName, langCode = 'en', components = []) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN) {
    console.log(`[WA-DEV] Template ${templateName} → ${phone}`);
    return { success: true, dev: true };
  }
  const res = await fetch(WA_API_URL, {
    method: 'POST', headers: WA_HEADERS(),
    body: JSON.stringify({
      messaging_product: 'whatsapp', to: `91${phone}`,
      type: 'template',
      template: { name: templateName, language: { code: langCode }, components },
    }),
  });
  return res.json();
}

// ─── Send interactive list message ───────────────────────────
async function sendList(phone, headerText, bodyText, buttonText, sections) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN) {
    console.log(`[WA-DEV] List → ${phone}: ${bodyText}`);
    return { success: true, dev: true };
  }
  const res = await fetch(WA_API_URL, {
    method: 'POST', headers: WA_HEADERS(),
    body: JSON.stringify({
      messaging_product: 'whatsapp', to: `91${phone}`,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: { type: 'text', text: headerText },
        body: { text: bodyText },
        action: { button: buttonText, sections },
      },
    }),
  });
  return res.json();
}

// ─── Message templates builder ────────────────────────────────
const TEMPLATES = {
  // OTP in user's language
  otp: (otp, lang = 'en') => {
    const msgs = {
      en: `🌱 *AgriBridge OTP*\n\nYour verification code is: *${otp}*\n\nValid for 10 minutes. Do not share with anyone.\n\n_AgriBridge - Harvesting Intelligence_`,
      hi: `🌱 *एग्री ब्रिज OTP*\n\nआपका सत्यापन कोड है: *${otp}*\n\n10 मिनट के लिए वैध। किसी के साथ साझा न करें।`,
      or: `🌱 *ଏଗ୍ରି ବ୍ରିଜ OTP*\n\nଆପଣଙ୍କ ସତ୍ୟାପନ କୋଡ: *${otp}*\n\n10 ମିନିଟ ପାଇଁ ବୈଧ।`,
      te: `🌱 *అగ్రి బ్రిడ్జ్ OTP*\n\nమీ కోడ్: *${otp}*\n\n10 నిమిషాల పాటు చెల్లుబాటు అవుతుంది।`,
    };
    return msgs[lang] || msgs.en;
  },

  // Daily price alert
  priceAlert: (crop, mandi, price, change, lang = 'en') => {
    const arrow = change > 0 ? '📈' : '📉';
    const msgs = {
      en: `${arrow} *${crop} Price Alert*\n\n📍 ${mandi}\n💰 ₹${price}/quintal\n${arrow} Change: ${change > 0 ? '+' : ''}₹${change}\n\n_Best time to sell? Check forecast → agribridge.app_`,
      hi: `${arrow} *${crop} मूल्य अलर्ट*\n\n📍 ${mandi}\n💰 ₹${price}/क्विंटल\n${arrow} बदलाव: ${change > 0 ? '+' : ''}₹${change}\n\n_बेचने का सही समय जानें → agribridge.app_`,
      te: `${arrow} *${crop} ధర అలర్ట్*\n\n📍 ${mandi}\n💰 ₹${price}/క్వింటాల్\n${arrow} మార్పు: ${change > 0 ? '+' : ''}₹${change}`,
    };
    return msgs[lang] || msgs.en;
  },

  // Crop advisory reminder
  advisory: (farmerName, crop, stage, task, lang = 'en') => {
    const msgs = {
      en: `🌾 *Farm Advisory — ${crop}*\n\nHello ${farmerName}!\n\n📊 Stage: ${stage}\n✅ Today's task: ${task}\n\n_Full calendar → agribridge.app_`,
      hi: `🌾 *फसल सलाह — ${crop}*\n\nनमस्ते ${farmerName}!\n\n📊 अवस्था: ${stage}\n✅ आज का काम: ${task}\n\n_पूरी जानकारी → agribridge.app_`,
      or: `🌾 *ଫସଲ ପରାମର୍ଶ — ${crop}*\n\nନମସ୍କାର ${farmerName}!\n\n📊 ଅବସ୍ଥା: ${stage}\n✅ ଆଜିର କାର୍ଯ୍ୟ: ${task}`,
    };
    return msgs[lang] || msgs.en;
  },

  // Weather warning
  weatherWarning: (warning, crop, action, lang = 'en') => {
    const msgs = {
      en: `⚠️ *Weather Warning*\n\n${warning}\n\n🌾 For your ${crop}:\n👉 ${action}\n\n_Weather forecast → agribridge.app_`,
      hi: `⚠️ *मौसम चेतावनी*\n\n${warning}\n\n🌾 आपके ${crop} के लिए:\n👉 ${action}`,
    };
    return msgs[lang] || msgs.en;
  },

  // Pest alert
  pestAlert: (pestName, district, crop, treatment, lang = 'en') => {
    const msgs = {
      en: `🚨 *Pest Alert — ${district}*\n\n${pestName} detected in your area!\n\n🌾 Crops at risk: ${crop}\n💊 Action: ${treatment}\n\n_Scan your field → agribridge.app_`,
      hi: `🚨 *कीट अलर्ट — ${district}*\n\n${pestName} आपके क्षेत्र में पाया गया!\n\n🌾 खतरे में फसल: ${crop}\n💊 उपाय: ${treatment}`,
    };
    return msgs[lang] || msgs.en;
  },

  // Payment confirmation
  paymentConfirm: (planName, expiry, lang = 'en') => {
    const msgs = {
      en: `✅ *Subscription Activated!*\n\n🎉 Welcome to ${planName}!\n📅 Valid till: ${expiry}\n\n🚀 Features unlocked:\n• Unlimited AI scans\n• Smart irrigation scheduler\n• Yield predictor\n• Priority support\n\n_Open app → agribridge.app_`,
      hi: `✅ *सब्सक्रिप्शन सक्रिय!*\n\n🎉 ${planName} में आपका स्वागत!\n📅 वैध: ${expiry} तक`,
    };
    return msgs[lang] || msgs.en;
  },

  // Scheme alert
  schemeAlert: (schemeName, amount, deadline, lang = 'en') => {
    const msgs = {
      en: `🏛️ *New Scheme Alert*\n\n*${schemeName}*\n💰 Benefit: ${amount}\n📅 Deadline: ${deadline}\n\n_Check eligibility → agribridge.app_`,
      hi: `🏛️ *नई योजना अलर्ट*\n\n*${schemeName}*\n💰 लाभ: ${amount}\n📅 अंतिम तिथि: ${deadline}`,
    };
    return msgs[lang] || msgs.en;
  },

  // Welcome message
  welcome: (name, lang = 'en') => {
    const msgs = {
      en: `🌱 *Welcome to AgriBridge, ${name}!*\n\nYour smart farming assistant is ready.\n\nReply with:\n1️⃣ *PRICE* — Today's mandi prices\n2️⃣ *WEATHER* — 7-day forecast\n3️⃣ *ADVISORY* — Crop advice\n4️⃣ *HELP* — All commands\n\n_AgriBridge — Harvesting Intelligence_`,
      hi: `🌱 *एग्री ब्रिज में आपका स्वागत, ${name}!*\n\nजवाब दें:\n1️⃣ *BHAV* — आज के मंडी भाव\n2️⃣ *MAUSAM* — 7 दिन का पूर्वानुमान\n3️⃣ *SALAH* — फसल सलाह\n4️⃣ *MADAD* — सभी कमांड`,
    };
    return msgs[lang] || msgs.en;
  },
};

// ─── Incoming webhook handler (user replies) ──────────────────
router.post('/webhook', asyncHandler(async (req, res) => {
  const body = req.body;
  if (body.object !== 'whatsapp_business_account') return res.sendStatus(404);

  const changes = body.entry?.[0]?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  if (!message) return res.sendStatus(200);

  const from = message.from.replace('91', ''); // strip country code
  const text = (message.text?.body || '').toUpperCase().trim();

  console.log(`[WA-IN] From: ${from} | Text: ${text}`);

  // ── Command router ──────────────────────────────────────────
  if (text === 'PRICE' || text === 'BHAV' || text === 'DAM') {
    await sendList(from,
      '🌾 Mandi Prices Today',
      'Select a crop to see live prices:',
      'Choose Crop',
      [{
        title: 'Crops',
        rows: [
          { id: 'price_wheat',  title: '🌾 Wheat',  description: 'Gehu / ਕਣਕ / गेहूँ' },
          { id: 'price_rice',   title: '🍚 Rice',   description: 'Dhan / ধান / ধান' },
          { id: 'price_tomato', title: '🍅 Tomato', description: 'Tamatar / टमाटर' },
          { id: 'price_onion',  title: '🧅 Onion',  description: 'Pyaaz / ਪਿਆਜ਼ / পেঁয়াজ' },
        ],
      }]
    );
  } else if (text === 'WEATHER' || text === 'MAUSAM' || text === 'ABAHAWA') {
    await sendText(from, TEMPLATES.weatherWarning('Clear skies next 3 days', 'Wheat', 'Good time for spraying pesticides in morning hours'));
  } else if (text === 'ADVISORY' || text === 'SALAH' || text === 'PARIMARSHA') {
    await sendText(from, TEMPLATES.advisory('Kisan', 'Wheat', 'Tillering', 'Apply 50 kg Urea/acre. Check for aphids.'));
  } else if (text === 'HELP' || text === 'MADAD' || text === 'SAHAYATA') {
    await sendText(from,
      `📱 *AgriBridge Commands*\n\n` +
      `🌾 *PRICE* / BHAV — Mandi prices\n` +
      `⛈️ *WEATHER* / MAUSAM — Forecast\n` +
      `🌱 *ADVISORY* / SALAH — Crop advice\n` +
      `🚨 *PEST* — Pest alerts\n` +
      `🏛️ *SCHEME* — Govt schemes\n` +
      `📞 *SUPPORT* — Call helpline\n\n` +
      `_Full features: agribridge.app_`
    );
  } else if (text === 'PEST' || text === 'KEET') {
    await sendText(from, '🔬 Take a photo of your affected crop and send it here. Our AI will diagnose within 30 seconds.');
  } else if (text === 'SCHEME' || text === 'YOJANA') {
    await sendText(from, TEMPLATES.schemeAlert('PM-KISAN', '₹2,000 (next installment)', 'Dec 31, 2025'));
  } else if (message.type === 'image') {
    // Image received — forward to plant doctor AI
    await sendText(from, '🌿 Analyzing your crop photo... Please wait 30 seconds.\n\n_Powered by AgriBridge AI_');
    // In production: await processImageWithAI(message.image.id, from);
  } else {
    await sendText(from, `🌱 Hello! I didn't understand that.\n\nReply *HELP* to see all commands.\n\n_AgriBridge — Harvesting Intelligence_`);
  }

  res.sendStatus(200);
}));

// ─── Webhook verification (Meta requirement) ──────────────────
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('[WA] Webhook verified');
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// ─── API endpoints (called from frontend / jobs) ──────────────
router.post('/send-otp', asyncHandler(async (req, res) => {
  const { phone, otp, lang = 'en' } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'phone and otp required' });
  const result = await sendText(phone, TEMPLATES.otp(otp, lang));
  res.json({ success: true, result });
}));

router.post('/send-price-alert', asyncHandler(async (req, res) => {
  const { phone, crop, mandi, price, change, lang = 'en' } = req.body;
  const result = await sendText(phone, TEMPLATES.priceAlert(crop, mandi, price, change, lang));
  res.json({ success: true, result });
}));

router.post('/send-advisory', asyncHandler(async (req, res) => {
  const { phone, farmerName, crop, stage, task, lang = 'en' } = req.body;
  const result = await sendText(phone, TEMPLATES.advisory(farmerName, crop, stage, task, lang));
  res.json({ success: true, result });
}));

router.post('/send-pest-alert', asyncHandler(async (req, res) => {
  const { phone, pestName, district, crop, treatment, lang = 'en' } = req.body;
  const result = await sendText(phone, TEMPLATES.pestAlert(pestName, district, crop, treatment, lang));
  res.json({ success: true, result });
}));

router.post('/send-welcome', asyncHandler(async (req, res) => {
  const { phone, name, lang = 'en' } = req.body;
  const result = await sendText(phone, TEMPLATES.welcome(name, lang));
  res.json({ success: true, result });
}));

// ─── Broadcast to all subscribed farmers ─────────────────────
router.post('/broadcast', asyncHandler(async (req, res) => {
  const { type, data, targetState, targetCrop } = req.body;
  // In production: get phones from DB filtered by targetState/targetCrop
  // const phones = await User.find({ state: targetState, crop: targetCrop }).select('phone lang');
  // await Promise.allSettled(phones.map(u => sendText(u.phone, TEMPLATES[type](data, u.lang))));
  console.log(`[WA-BROADCAST] type=${type} state=${targetState} crop=${targetCrop}`);
  res.json({ success: true, queued: 0, message: 'Connect DB for real broadcast' });
}));

module.exports = router;
module.exports.TEMPLATES = TEMPLATES;
module.exports.sendText = sendText;
module.exports.sendTemplate = sendTemplate;
