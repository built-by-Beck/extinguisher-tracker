# Stripe Integration Plan

## Overview
This document outlines the Stripe integration architecture for subscription billing in the Fire Extinguisher Tracker application.

## Architecture

### Frontend (React App)
- Stripe.js for payment collection
- Stripe Checkout for subscription signup
- Customer Portal for subscription management

### Backend (Firebase Cloud Functions or Express API)
- Webhook handler for Stripe events
- User/subscription synchronization
- Security: Never expose Stripe secret key in frontend

---

## Implementation Options

### Option 1: Firebase Cloud Functions (Recommended)
**Pros:**
- Integrated with Firebase ecosystem
- Automatic scaling
- No server management
- Easy deployment

**Cons:**
- Requires Firebase Blaze (pay-as-you-go) plan
- Cold start latency
- Debugging can be harder

### Option 2: Express API on VPS/Hosting
**Pros:**
- Full control
- No cold starts
- Can use existing hosting

**Cons:**
- Need to manage server
- More DevOps overhead
- Need to secure endpoints

**Decision:** Start with Option 1 (Firebase Cloud Functions)

---

## Stripe Setup Checklist

### 1. Create Stripe Account
- Sign up at https://stripe.com
- Complete account verification
- Get API keys (test and live)

### 2. Create Products in Stripe Dashboard
**Product: Fire Extinguisher Tracker - Starter**
- Name: "Starter Plan"
- Price: $29/month (recurring)
- Price ID: `price_starter_monthly`

**Product: Fire Extinguisher Tracker - Professional**
- Name: "Professional Plan"
- Monthly Price: $79/month (recurring)
  - Price ID: `price_professional_monthly`
- Yearly Price: $790/year (recurring)
  - Price ID: `price_professional_yearly`

### 3. Configure Stripe Settings
- Enable Customer Portal
- Set up tax collection (if needed)
- Configure email receipts
- Set business information

### 4. Get API Keys
```bash
# Test Mode Keys
STRIPE_PUBLISHABLE_KEY_TEST=pk_test_...
STRIPE_SECRET_KEY_TEST=sk_test_...
STRIPE_WEBHOOK_SECRET_TEST=whsec_...

# Live Mode Keys (for production)
STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_...
STRIPE_SECRET_KEY_LIVE=sk_live_...
STRIPE_WEBHOOK_SECRET_LIVE=whsec_...
```

---

## Environment Variables

### Frontend (.env)
```bash
# Stripe (safe to expose in frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs
VITE_STRIPE_PRICE_STARTER_MONTHLY=price_starter_monthly
VITE_STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_professional_monthly
VITE_STRIPE_PRICE_PROFESSIONAL_YEARLY=price_professional_yearly

# API Endpoint for webhooks
VITE_API_URL=https://us-central1-YOUR_PROJECT.cloudfunctions.net
```

### Backend (Firebase Functions .env or functions config)
```bash
# Stripe Secret (NEVER expose in frontend)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## User Flow

### 1. New User Signup
```
1. User creates account (Firebase Auth)
   ↓
2. Cloud Function creates user document in Firestore
   - subscriptionStatus: 'trialing'
   - subscriptionTier: 'professional'
   - trialEndsAt: now + 30 days
   ↓
3. User gets 30-day trial with Professional features
   ↓
4. App shows trial banner with days remaining
```

### 2. Trial to Paid Conversion
```
1. User clicks "Subscribe" button
   ↓
2. Frontend creates Stripe Checkout session
   POST /api/create-checkout-session
   - priceId: 'price_professional_monthly'
   - userId: Firebase UID
   ↓
3. User redirected to Stripe Checkout
   - Enters payment info
   - Completes purchase
   ↓
4. Stripe sends webhook: checkout.session.completed
   ↓
5. Webhook handler updates user document:
   - subscriptionStatus: 'active'
   - stripeCustomerId: cus_...
   - stripeSubscriptionId: sub_...
   - currentPeriodEnd: next billing date
   ↓
6. User redirected back to app with success message
```

### 3. Subscription Management
```
1. User clicks "Manage Subscription"
   ↓
2. Frontend creates Customer Portal session
   POST /api/create-portal-session
   - customerId: user.stripeCustomerId
   ↓
3. User redirected to Stripe Customer Portal
   - Can update payment method
   - Can change plan (upgrade/downgrade)
   - Can cancel subscription
   ↓
4. Stripe sends webhooks for changes:
   - customer.subscription.updated
   - customer.subscription.deleted
   ↓
5. Webhook handler syncs changes to Firestore
```

---

## API Endpoints (Cloud Functions)

### 1. Create Checkout Session
**Endpoint:** `POST /createCheckoutSession`

**Request Body:**
```javascript
{
  userId: string,           // Firebase UID
  priceId: string,          // Stripe Price ID
  successUrl: string,       // Redirect after success
  cancelUrl: string,        // Redirect on cancel
}
```

**Response:**
```javascript
{
  sessionId: string,        // Stripe Checkout Session ID
  url: string,              // Redirect URL
}
```

**Implementation:**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { priceId, successUrl, cancelUrl } = data;
  const userId = context.auth.uid;

  // Get or create Stripe customer
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  let customerId = userDoc.data()?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: context.auth.token.email,
      metadata: { firebaseUID: userId },
    });
    customerId = customer.id;

    // Save customer ID
    await admin.firestore().collection('users').doc(userId).update({
      stripeCustomerId: customerId,
    });
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
  });

  return { sessionId: session.id, url: session.url };
});
```

---

### 2. Create Customer Portal Session
**Endpoint:** `POST /createPortalSession`

**Request Body:**
```javascript
{
  returnUrl: string,        // URL to return to after portal
}
```

**Response:**
```javascript
{
  url: string,              // Stripe Customer Portal URL
}
```

**Implementation:**
```javascript
exports.createPortalSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const userId = context.auth.uid;
  const { returnUrl } = data;

  // Get customer ID
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const customerId = userDoc.data()?.stripeCustomerId;

  if (!customerId) {
    throw new functions.https.HttpsError('failed-precondition', 'No Stripe customer found');
  }

  // Create portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return { url: session.url };
});
```

---

### 3. Stripe Webhook Handler
**Endpoint:** `POST /stripeWebhook`

**Events to Handle:**

#### `checkout.session.completed`
```javascript
// User completed checkout
const session = event.data.object;
const subscription = await stripe.subscriptions.retrieve(session.subscription);

await admin.firestore().collection('users').doc(session.metadata.userId).update({
  subscriptionStatus: 'active',
  subscriptionTier: getTierFromPriceId(subscription.items.data[0].price.id),
  stripeSubscriptionId: subscription.id,
  currentPeriodStart: admin.firestore.Timestamp.fromMillis(subscription.current_period_start * 1000),
  currentPeriodEnd: admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000),
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
```

#### `customer.subscription.updated`
```javascript
// Subscription changed (upgrade/downgrade)
const subscription = event.data.object;
const userId = await getUserIdFromCustomerId(subscription.customer);

await admin.firestore().collection('users').doc(userId).update({
  subscriptionTier: getTierFromPriceId(subscription.items.data[0].price.id),
  subscriptionStatus: subscription.status,
  currentPeriodEnd: admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000),
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
```

#### `customer.subscription.deleted`
```javascript
// Subscription canceled
const subscription = event.data.object;
const userId = await getUserIdFromCustomerId(subscription.customer);

await admin.firestore().collection('users').doc(userId).update({
  subscriptionStatus: 'canceled',
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
```

#### `invoice.payment_succeeded`
```javascript
// Payment successful - extend subscription
const invoice = event.data.object;
// Update current period end if needed
```

#### `invoice.payment_failed`
```javascript
// Payment failed - mark past due
const invoice = event.data.object;
const userId = await getUserIdFromCustomerId(invoice.customer);

await admin.firestore().collection('users').doc(userId).update({
  subscriptionStatus: 'past_due',
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
```

**Full Implementation:**
```javascript
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook:', err);
    res.status(500).send('Webhook handler failed');
  }
});
```

---

## Frontend Components

### 1. Upgrade Button Component
```jsx
import { getFunctions, httpsCallable } from 'firebase/functions';

function UpgradeButton({ priceId, tier }) {
  const handleUpgrade = async () => {
    const functions = getFunctions();
    const createCheckout = httpsCallable(functions, 'createCheckoutSession');

    const result = await createCheckout({
      priceId,
      successUrl: `${window.location.origin}/app?upgrade=success`,
      cancelUrl: `${window.location.origin}/app?upgrade=cancel`,
    });

    // Redirect to Stripe Checkout
    window.location.href = result.data.url;
  };

  return (
    <button onClick={handleUpgrade}>
      Upgrade to {tier}
    </button>
  );
}
```

### 2. Manage Subscription Button
```jsx
function ManageSubscriptionButton() {
  const handleManage = async () => {
    const functions = getFunctions();
    const createPortal = httpsCallable(functions, 'createPortalSession');

    const result = await createPortal({
      returnUrl: `${window.location.origin}/app/settings`,
    });

    // Redirect to Customer Portal
    window.location.href = result.data.url;
  };

  return (
    <button onClick={handleManage}>
      Manage Subscription
    </button>
  );
}
```

---

## Testing Plan

### Test Mode (Stripe Test Keys)
1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC

### Test Scenarios
- ✓ New user signup → starts trial
- ✓ Trial user subscribes → becomes active
- ✓ User upgrades Starter → Professional
- ✓ User downgrades Professional → Starter
- ✓ User cancels subscription
- ✓ Payment fails → past_due status
- ✓ User updates payment method
- ✓ Trial expires without payment → canceled

---

## Security Checklist

- ✓ Never expose Stripe secret key in frontend
- ✓ Verify webhook signatures
- ✓ Validate user authentication in Cloud Functions
- ✓ Use Firestore security rules to protect user data
- ✓ Sanitize webhook data before saving to database
- ✓ Use HTTPS for all endpoints
- ✓ Store sensitive config in environment variables

---

## Deployment Steps

### 1. Install Dependencies
```bash
# Frontend
npm install @stripe/stripe-js

# Backend (in functions directory)
cd functions
npm install stripe firebase-admin firebase-functions
```

### 2. Configure Firebase Functions
```bash
firebase init functions
# Select JavaScript or TypeScript
# Install dependencies
```

### 3. Set Environment Variables
```bash
# Set Stripe keys in Firebase
firebase functions:config:set stripe.secret_key="sk_test_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."
```

### 4. Deploy Functions
```bash
firebase deploy --only functions
```

### 5. Configure Stripe Webhook
- Copy deployed webhook URL
- Add to Stripe Dashboard → Webhooks
- Select events to listen for
- Copy webhook signing secret

### 6. Test Integration
- Use Stripe test mode
- Test complete flow
- Verify webhook events

### 7. Go Live
- Switch to Stripe live keys
- Update price IDs to live versions
- Re-deploy functions
- Update webhook endpoint to live mode

---

## Monitoring & Maintenance

### Stripe Dashboard
- Monitor subscriptions
- View failed payments
- Check webhook delivery
- Generate revenue reports

### Firebase Console
- Monitor Cloud Function execution
- Check logs for errors
- Track database writes

### Error Handling
- Log all webhook events
- Alert on payment failures
- Handle edge cases gracefully

---

## Cost Estimates

### Stripe Fees
- 2.9% + $0.30 per successful card charge
- No monthly fees, no setup fees

### Firebase Cloud Functions
- 2 million invocations/month free
- $0.40 per million invocations after

### Example Monthly Cost (100 customers)
- Starter: 100 × $29 = $2,900 revenue
- Stripe fees: ~$100
- Firebase: ~$5
- Net: ~$2,795

---

## Next Steps

1. Create Stripe account
2. Set up products and prices
3. Get API keys
4. Implement Cloud Functions
5. Build frontend integration
6. Test thoroughly
7. Deploy to production
