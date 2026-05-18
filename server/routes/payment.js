const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const PLANS = {
  pro_monthly:   { name: 'Kisan Pro Monthly',  amount: 9900,  currency: 'INR', interval: 'monthly' },
  pro_yearly:    { name: 'Kisan Pro Yearly',    amount: 85800, currency: 'INR', interval: 'yearly'  },
  fpo_monthly:   { name: 'FPO Monthly',         amount: 99900, currency: 'INR', interval: 'monthly' },
};

// ─── CREATE Razorpay order ────────────────────────────────────
router.post('/create-order', authMiddleware, asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const plan = PLANS[planId];
  if (!plan) return res.status(400).json({ error: 'Invalid plan', validPlans: Object.keys(PLANS) });

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    // Dev mode — return mock order
    return res.json({
      orderId: `order_mock_${Date.now()}`,
      amount: plan.amount,
      currency: plan.currency,
      planId,
      planName: plan.name,
      keyId: 'rzp_test_mock',
      prefill: { name: req.user.name || '', contact: req.user.phone || '' },
      dev: true,
    });
  }

  const Razorpay = require('razorpay');
  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const order = await razorpay.orders.create({
    amount: plan.amount,
    currency: plan.currency,
    receipt: `receipt_${req.user.id}_${Date.now()}`,
    notes: { userId: req.user.id, planId, planName: plan.name },
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    planId,
    planName: plan.name,
    keyId,
    prefill: { name: req.user.name || '', contact: req.user.phone || '' },
  });
}));

// ─── VERIFY payment & activate subscription ──────────────────
router.post('/verify', authMiddleware, asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields' });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';
  const expectedSig = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSig !== razorpay_signature && process.env.NODE_ENV === 'production') {
    return res.status(400).json({ error: 'Payment verification failed. Signature mismatch.' });
  }

  const plan = PLANS[planId];
  const expiresAt = new Date();
  if (plan?.interval === 'yearly') expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  else expiresAt.setMonth(expiresAt.getMonth() + 1);

  // In production: await User.update(req.user.id, { plan: planId, planExpiry: expiresAt });
  // await sendPaymentConfirmationEmail(req.user.email, { planName: plan.name, amount: plan.amount / 100 });
  // await generateGSTInvoice(req.user.id, razorpay_payment_id, plan);

  console.log(`[PAYMENT] User ${req.user.id} subscribed to ${planId} — Payment: ${razorpay_payment_id}`);

  res.json({
    success: true,
    plan: planId,
    planName: plan?.name,
    expiresAt: expiresAt.toISOString(),
    paymentId: razorpay_payment_id,
    message: `Successfully activated ${plan?.name}! You now have full access.`,
  });
}));

// ─── Razorpay webhook (server-to-server) ─────────────────────
router.post('/webhook', express.raw({ type: 'application/json' }), asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (webhookSecret) {
    const expectedSig = crypto.createHmac('sha256', webhookSecret).update(req.body).digest('hex');
    if (expectedSig !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }
  }

  const event = JSON.parse(req.body);
  console.log(`[WEBHOOK] Event: ${event.event}`);

  switch (event.event) {
    case 'payment.captured':
      console.log(`Payment captured: ${event.payload.payment.entity.id}`);
      // await activateSubscription(event.payload.payment.entity);
      break;
    case 'payment.failed':
      console.log(`Payment failed: ${event.payload.payment.entity.id}`);
      // await notifyPaymentFailure(event.payload.payment.entity);
      break;
    case 'subscription.charged':
      console.log(`Subscription renewed: ${event.payload.subscription.entity.id}`);
      break;
    case 'subscription.cancelled':
      // await downgradeToFree(event.payload.subscription.entity.notes.userId);
      break;
    default:
      console.log(`Unhandled webhook event: ${event.event}`);
  }

  res.json({ received: true });
}));

// ─── GET subscription status ──────────────────────────────────
router.get('/status', authMiddleware, asyncHandler(async (req, res) => {
  // In production: const user = await User.findById(req.user.id);
  res.json({
    plan: 'free',
    planName: 'Kisan Free',
    expiresAt: null,
    features: { scansUsed: 2, scansLimit: 5, iotDevices: 0, iotLimit: 0 },
    upgradeUrl: '/pricing',
  });
}));

module.exports = router;
