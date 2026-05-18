const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

// ─── REGISTER push subscription ──────────────────────────────
router.post('/subscribe', asyncHandler(async (req, res) => {
  const { subscription, preferences } = req.body;
  if (!subscription?.endpoint) return res.status(400).json({ error: 'Invalid push subscription' });

  // In production: await PushSubscription.upsert({ userId: req.user.id, subscription, preferences });
  console.log(`[PUSH] Subscribed user ${req.user.id}`);
  res.json({ success: true, message: 'Push notifications enabled' });
}));

// ─── SEND WhatsApp alert via WhatsApp Business API ───────────
router.post('/whatsapp', asyncHandler(async (req, res) => {
  const { phone, templateName, variables } = req.body;
  if (!phone || !templateName) return res.status(400).json({ error: 'phone and templateName required' });

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    console.log(`[DEV] Would send WhatsApp to ${phone}: template=${templateName}`, variables);
    return res.json({ success: true, dev: true, message: `WhatsApp would be sent to ${phone}` });
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: `91${phone}`,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_IN' },
          components: variables ? [{ type: 'body', parameters: variables.map(v => ({ type: 'text', text: v })) }] : [],
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    return res.status(502).json({ error: 'WhatsApp API error', details: err });
  }

  const data = await response.json();
  res.json({ success: true, messageId: data.messages?.[0]?.id });
}));

// ─── SEND SMS OTP via MSG91 ───────────────────────────────────
router.post('/sms', asyncHandler(async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ error: 'phone and message required' });

  const apiKey = process.env.MSG91_API_KEY;
  const senderId = process.env.MSG91_SENDER_ID || 'AGRIBR';

  if (!apiKey) {
    console.log(`[DEV] SMS to ${phone}: ${message}`);
    return res.json({ success: true, dev: true });
  }

  const response = await fetch('https://api.msg91.com/api/v5/flow/', {
    method: 'POST',
    headers: { authkey: apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      template_id: process.env.MSG91_TEMPLATE_ID,
      recipients: [{ mobiles: `91${phone}`, var1: message }],
    }),
  });

  const data = await response.json();
  res.json({ success: data.type === 'success', data });
}));

// ─── BROADCAST advisory alert to all subscribed users ────────
router.post('/broadcast', asyncHandler(async (req, res) => {
  const { title, body, type = 'advisory', targetState } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'title and body required' });

  // In production: get all subscriptions from DB filtered by state
  // const subscriptions = await PushSubscription.find(targetState ? { state: targetState } : {});
  // await Promise.allSettled(subscriptions.map(sub => sendWebPush(sub.subscription, { title, body, type })));

  console.log(`[BROADCAST] ${title} → ${targetState || 'All India'}`);
  res.json({ success: true, sent: 0, message: 'Broadcast queued (connect DB for real delivery)' });
}));

// ─── GET notification history ─────────────────────────────────
router.get('/history', asyncHandler(async (req, res) => {
  const notifications = [
    { id: 1, title: 'Price Alert 🌾', body: 'Wheat prices up 8% in your region', type: 'price', read: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
    { id: 2, title: 'Weather Warning ⛈️', body: 'Heavy rain expected tomorrow. Delay spraying.', type: 'weather', read: false, createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
    { id: 3, title: 'Advisory Reminder 🌱', body: 'Time to apply Urea top dressing for Wheat', type: 'advisory', read: true, createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
    { id: 4, title: 'New Scheme Available 🏛️', body: 'PM-KISAN next installment releases in 3 days', type: 'scheme', read: true, createdAt: new Date(Date.now() - 48 * 3600000).toISOString() },
  ];
  res.json({ notifications, unread: notifications.filter(n => !n.read).length });
}));

module.exports = router;
