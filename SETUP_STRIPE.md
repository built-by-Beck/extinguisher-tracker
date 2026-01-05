# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for the Fire Extinguisher Tracker application.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Firebase project with Blaze plan (required for Cloud Functions)
3. Firebase CLI installed (`npm install -g firebase-tools`)

## Step 1: Set Up Stripe Products and Prices

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Go to **Products** → **Add Product**

### Create Basic Plan
- **Name**: Basic Plan
- **Description**: Up to 100 fire extinguishers
- **Pricing**: 
  - Type: Recurring
  - Price: $29.00 USD
  - Billing period: Monthly
- Copy the **Price ID** (starts with `price_`) - you'll need this for environment variables

### Create Pro Plan
- **Name**: Pro Plan
- **Description**: Up to 500 fire extinguishers
- **Pricing**: 
  - Type: Recurring
  - Price: $79.00 USD
  - Billing period: Monthly
- Copy the **Price ID** (starts with `price_`) - you'll need this for environment variables

3. Go to **Settings** → **Customer Portal** and enable it

## Step 2: Get Stripe API Keys

1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_` for test mode, `pk_live_` for live mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode, `sk_live_` for live mode)

⚠️ **Important**: Use test mode keys first to test the integration safely.

## Step 3: Configure Frontend Environment Variables

Create a `.env` file in the root of your project (or update existing one):

```bash
# Stripe Publishable Key (safe to expose in frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (from Step 1)
VITE_STRIPE_PRICE_BASIC_MONTHLY=price_...
VITE_STRIPE_PRICE_PRO_MONTHLY=price_...
```

## Step 4: Set Up Firebase Cloud Functions

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Log in to Firebase:
```bash
firebase login
```

3. Install function dependencies:
```bash
cd functions
npm install
cd ..
```

4. Set Firebase Functions configuration:
```bash
firebase functions:config:set stripe.secret_key="sk_test_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."
```

⚠️ **Note**: You'll get the webhook secret in Step 5.

## Step 5: Deploy Functions and Configure Webhook

1. Deploy Firebase Functions:
```bash
firebase deploy --only functions
```

2. Copy the webhook URL from the deployment output. It will look like:
```
https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook
```
(Replace `YOUR_PROJECT_ID` with your actual Firebase project ID)

3. In Stripe Dashboard, go to **Developers** → **Webhooks** → **Add endpoint**
4. Paste your webhook URL
5. Select these events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_`)
8. Update Firebase Functions config with the webhook secret:
```bash
firebase functions:config:set stripe.webhook_secret="whsec_..."
firebase deploy --only functions
```

## Step 6: Update Firestore Security Rules

Make sure your Firestore security rules include access to the `users` collection. Add this to your `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Existing rules for workspaces, extinguishers, etc.
    // ...
  }
}
```

## Step 7: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Test with Stripe test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

3. Go through the signup flow:
   - Visit `/signup`
   - Create an account
   - Complete Stripe checkout
   - Verify webhook events in Stripe Dashboard

## Step 8: Go Live

When ready for production:

1. Switch to Stripe **live mode** in Stripe Dashboard
2. Create live products and prices (same as Step 1)
3. Update environment variables with live keys and price IDs
4. Update Firebase Functions config with live keys:
```bash
firebase functions:config:set stripe.secret_key="sk_live_..."
firebase functions:config:set stripe.webhook_secret="whsec_..." # New webhook secret for live mode
firebase deploy --only functions
```
5. Update webhook endpoint in Stripe Dashboard to use live mode

## Troubleshooting

### Webhook not working
- Check webhook URL is correct in Stripe Dashboard
- Verify webhook secret matches in Firebase Functions config
- Check Firebase Functions logs: `firebase functions:log`

### Checkout session creation fails
- Verify Stripe secret key is set correctly in Firebase Functions config
- Check Firebase Functions logs for errors
- Ensure user is authenticated when calling the function

### Subscription not updating
- Check webhook events in Stripe Dashboard → Webhooks
- Verify webhook handler function is deployed
- Check Firestore `users` collection for subscription status

## Support

For issues or questions:
- Stripe Documentation: https://stripe.com/docs
- Firebase Functions Documentation: https://firebase.google.com/docs/functions

