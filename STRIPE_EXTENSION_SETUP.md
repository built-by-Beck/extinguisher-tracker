# Stripe Extension Setup Guide

This document outlines the steps needed to complete the Stripe Extension setup for your Firebase project.

## ✅ Completed Setup

1. **Firestore Security Rules** - Updated to include Stripe extension collections
2. **Stripe Service** - Updated to use Firestore-based checkout session creation
3. **App Integration** - Updated to read subscriptions from extension's Firestore structure
4. **Subscription Sync** - Automatic sync from extension subscriptions to users collection

## 🔧 Remaining Configuration Steps

### 1. Configure Stripe Webhook

You need to set up a webhook in your Stripe Dashboard that points to your extension's webhook handler.

**Webhook URL:**
```
https://us-central1-extinguishertracker.cloudfunctions.net/ext-firestore-stripe-payments-handleWebhookEvents
```

**Steps:**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter the webhook URL above
4. Select the following events:
   - `product.created`
   - `product.updated`
   - `product.deleted`
   - `price.created`
   - `price.updated`
   - `price.deleted`
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.processing`
   - `payment_intent.succeeded`
   - `payment_intent.canceled`
   - `payment_intent.payment_failed`
   - `tax_rate.created` (optional)
   - `tax_rate.updated` (optional)
   - `invoice.paid` (optional)
   - `invoice.payment_succeeded` (optional)
   - `invoice.payment_failed` (optional)
   - `invoice.upcoming` (optional)
   - `invoice.marked_uncollectible` (optional)
   - `invoice.payment_action_required` (optional)

5. After creating the webhook, copy the **Signing Secret** (starts with `whsec_`)

### 2. Configure Extension with Webhook Secret

1. Go to [Firebase Console → Extensions](https://console.firebase.google.com/project/extinguishertracker/extensions)
2. Find the "Firestore Stripe Payments" extension
3. Click "Configure" or "Reconfigure"
4. Find the parameter called **"Stripe webhook secret"**
5. Paste the webhook signing secret from step 1
6. Save the configuration

### 3. Create Products and Prices in Stripe Dashboard

The extension requires products and prices to be created in Stripe Dashboard. These will automatically sync to Firestore.

**Basic Plan:**
- Product Name: "Fire Extinguisher Tracker - Basic"
- Price: $29/month (recurring)
- Price ID: Note this down (e.g., `price_xxxxx`)

**Pro Plan:**
- Product Name: "Fire Extinguisher Tracker - Pro"
- Price: $79/month (recurring)
- Price ID: Note this down (e.g., `price_xxxxx`)

**Steps:**
1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Fill in product details
4. Add pricing (recurring monthly)
5. Save and note the Price ID
6. Update your `.env` file or environment variables with the Price IDs:
   ```
   VITE_STRIPE_PRICE_BASIC_MONTHLY=price_xxxxx
   VITE_STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
   ```

### 4. Configure Stripe Customer Portal (Optional but Recommended)

1. Go to [Stripe Dashboard → Settings → Billing → Customer Portal](https://dashboard.stripe.com/settings/billing/portal)
2. Click "Activate test link" or "Activate link" (for production)
3. Configure settings:
   - ✅ Allow customers to update their payment methods
   - ✅ Allow customers to update subscriptions
   - ✅ Allow customers to cancel subscriptions
4. Add the products/prices you want customers to be able to switch between
5. Set up business information and links
6. Save configuration

### 5. Assign Custom Claim Roles (Optional)

If you want to use Firebase custom claims for role-based access:

1. In Stripe Dashboard, edit your products
2. Add metadata with key `firebaseRole` and value (e.g., "basic", "pro")
3. The extension will automatically set this as a custom claim on the user's auth token

### 6. Test the Integration

1. **Test Checkout:**
   - Sign up a new user
   - Select a plan
   - Complete checkout with a test card: `4242 4242 4242 4242`
   - Verify subscription appears in Firestore at `customers/{uid}/subscriptions`

2. **Test Subscription Sync:**
   - Check that user document in `users/{uid}` is updated with subscription status
   - Verify subscription status is "active" after successful payment

3. **Test Customer Portal:**
   - As a subscribed user, access the customer portal
   - Verify you can manage subscription, update payment method, etc.

## 📝 Environment Variables

### Frontend (Vercel/Deployment)

Set these in your Vercel project settings (or `.env` for local development):

```env
# Required
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx  # or pk_live_xxxxx for production

# Optional (has fallback defaults)
VITE_STRIPE_PRICE_BASIC_MONTHLY=price_xxxxx
VITE_STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
```

**Note:** You do NOT need webhook secrets in Vercel. The webhook is handled by Firebase Cloud Functions, and the webhook secret is configured in the Firebase Extension settings (see step 2 above).

### Firebase Extension Configuration

The webhook secret is configured directly in the Firebase Extension settings, NOT in environment variables:
- Go to Firebase Console → Extensions → Firestore Stripe Payments
- Configure the "Stripe webhook secret" parameter
- This is separate from your frontend environment variables

## 🔍 Monitoring

- **Firebase Console:** Check extension logs and Firestore data
- **Stripe Dashboard:** Monitor payments, subscriptions, and webhook events
- **Webhook Logs:** Check Stripe Dashboard → Webhooks → Your endpoint → Recent events

## 🐛 Troubleshooting

### Webhook Not Working
- Verify webhook URL is correct
- Check webhook secret is configured in extension
- Check Stripe Dashboard webhook logs for errors
- Verify extension is deployed and running

### Subscriptions Not Syncing
- Check Firestore security rules allow read access to `customers/{uid}/subscriptions`
- Verify webhook events are being received
- Check extension logs in Firebase Console

### Checkout Not Redirecting
- Verify Firestore security rules allow write to `customers/{uid}/checkout_sessions`
- Check browser console for errors
- Verify user is authenticated

## 📚 Additional Resources

- [Stripe Extension Documentation](https://github.com/stripe/stripe-firebase-extensions/tree/next/firestore-stripe-payments)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Firebase Console](https://console.firebase.google.com/project/extinguishertracker)

