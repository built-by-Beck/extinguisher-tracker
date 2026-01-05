# Vercel Environment Variables Setup

This document lists all the environment variables you need to configure in Vercel for your deployment.

## Required Environment Variables

### Stripe Configuration
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51Rl3uFAzoOtBRx5S3R0eA4nWCRLbdDnAbEneGoUR37Bc5ZxD4sBq5MPiovQAbTJJQHwPsBz9WY072fuOIPzV9kj700iCbjmkuc
VITE_STRIPE_PRICE_BASIC_MONTHLY=price_1SmEmxAzoOtBRx5SyYlwccrZ
VITE_STRIPE_PRICE_PRO_MONTHLY=price_1SmEp2AzoOtBRx5Sn7pRMVwy
```

### Google AdSense
```bash
VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
```
**Note:** Replace `ca-pub-XXXXXXXXXX` with your actual AdSense Publisher ID (starts with `ca-pub-`)

## Optional Environment Variables

### Calculator URL (if using calculator feature)
```bash
VITE_CALCULATOR_URL=https://your-calc-app.web.app
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: The variable name (e.g., `VITE_STRIPE_PUBLISHABLE_KEY`)
   - **Value**: The actual value
   - **Environment**: Select all environments (Production, Preview, Development) or just Production
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Important Notes

- All Vite environment variables **must** start with `VITE_` to be exposed to the client-side code
- Environment variables are embedded at **build time**, not runtime
- After adding/changing environment variables, you **must redeploy** for changes to take effect
- Never commit sensitive keys to git - use Vercel's environment variables instead

## Firebase Configuration

Firebase configuration is currently hardcoded in `src/firebase.js`. If you want to make it configurable via environment variables, you would need to:

1. Update `src/firebase.js` to use environment variables (see `src/firebase.js.template` for reference)
2. Add these variables to Vercel:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

## Verification

After deployment, check:
1. Stripe checkout works (try signing up)
2. AdSense ads appear on marketing pages
3. No console errors related to missing environment variables

