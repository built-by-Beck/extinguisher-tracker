# Firebase Cloud Functions

This directory contains Firebase Cloud Functions for Stripe integration.

## Setup

1. Install dependencies:
```bash
cd functions
npm install
```

2. Set Firebase configuration:
```bash
firebase functions:config:set stripe.secret_key="sk_test_..." 
firebase functions:config:set stripe.webhook_secret="whsec_..."
```

3. Deploy functions:
```bash
firebase deploy --only functions
```

## Functions

### createCheckoutSession
Creates a Stripe Checkout session for subscription signup.

### createPortalSession
Creates a Stripe Customer Portal session for subscription management.

### stripeWebhook
Handles Stripe webhook events to keep subscriptions in sync.

## Environment Variables

Set these in Firebase Functions config:
- `stripe.secret_key` - Stripe secret key
- `stripe.webhook_secret` - Stripe webhook signing secret

