# Database Schema - Fire Extinguisher Tracker

## Overview
This document defines the Firestore database schema for user authentication, subscription management, and feature gating.

## Collections

### 1. `users` Collection
Stores user profile and subscription information.

**Document ID:** Firebase Auth UID

**Fields:**
```javascript
{
  // User Info
  userId: string,              // Firebase Auth UID (matches document ID)
  email: string,               // User's email address
  displayName: string,         // User's name (optional)
  createdAt: timestamp,        // Account creation date

  // Subscription Info
  subscriptionTier: string,    // 'starter' | 'professional'
  subscriptionStatus: string,  // 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete'
  trialStartedAt: timestamp,   // When trial began
  trialEndsAt: timestamp,      // When trial expires (30 days from start)
  currentPeriodStart: timestamp, // Current billing period start
  currentPeriodEnd: timestamp,   // Current billing period end

  // Stripe Integration
  stripeCustomerId: string,    // Stripe customer ID
  stripeSubscriptionId: string, // Stripe subscription ID

  // Feature Limits (computed from tier)
  limits: {
    maxExtinguishers: number,  // 100 for starter, 500 for professional
    photosEnabled: boolean,    // false for starter, true for professional
    maxPhotosPerUnit: number,  // 0 for starter, 5 for professional
    gpsEnabled: boolean,       // false for starter, true for professional
    advancedExportEnabled: boolean, // false for starter, true for professional
    inspectionHistoryEnabled: boolean, // false for starter, true for professional
  },

  // Usage Tracking (for enforcing limits)
  usage: {
    extinguisherCount: number, // Current number of extinguishers across all workspaces
    lastUpdated: timestamp,    // When usage was last calculated
  },

  // Metadata
  lastLoginAt: timestamp,      // Last login timestamp
  updatedAt: timestamp,        // Last profile update
}
```

**Indexes:**
- `email` (for lookups)
- `stripeCustomerId` (for Stripe webhook processing)
- `subscriptionStatus` (for admin queries)

---

### 2. `workspaces` Collection (EXISTING - Updated)
Monthly inspection cycles. Update to enforce user limits.

**Document ID:** Auto-generated

**Fields:**
```javascript
{
  userId: string,              // Owner's Firebase Auth UID
  label: string,               // Workspace name (e.g., "December 2024")
  monthYear: string,           // Month identifier
  status: string,              // 'active' | 'archived'
  createdAt: timestamp,
  archivedAt: timestamp,       // When archived (if applicable)
}
```

**Changes Needed:**
- None - schema is already good

---

### 3. `extinguishers` Collection (EXISTING - Updated)
Fire extinguisher records. Validate against user limits on creation.

**Document ID:** Auto-generated

**Fields:**
```javascript
{
  userId: string,              // Owner's Firebase Auth UID
  workspaceId: string,         // Parent workspace

  // Asset Info
  assetId: string,
  serial: string,
  vicinity: string,
  parentLocation: string,
  section: string,

  // Status
  status: string,              // 'pending' | 'pass' | 'fail'
  checkedDate: timestamp,

  // Photos (validate count against user.limits.maxPhotosPerUnit)
  photos: array,               // Array of storage URLs

  // GPS (only allow if user.limits.gpsEnabled)
  location: {
    latitude: number,
    longitude: number,
    accuracy: number,
    timestamp: timestamp,
  },

  // Inspection Data
  checklistData: object,       // 13-point checklist results
  inspectionHistory: array,    // Historical inspection records

  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

**Changes Needed:**
- Add validation logic in app to check user limits before creating/uploading

---

### 4. `subscriptions` Collection (NEW - Optional)
Alternative: Store detailed subscription history separately from users collection.

**Document ID:** Auto-generated

**Fields:**
```javascript
{
  userId: string,              // Foreign key to users
  stripeSubscriptionId: string,
  stripePriceId: string,       // Which price/plan
  status: string,              // Stripe subscription status
  tier: string,                // 'starter' | 'professional'

  // Billing
  currentPeriodStart: timestamp,
  currentPeriodEnd: timestamp,
  cancelAtPeriodEnd: boolean,
  canceledAt: timestamp,

  // Pricing
  amount: number,              // Amount in cents
  currency: string,            // 'usd'
  interval: string,            // 'month' | 'year'

  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

**Note:** This is optional. We can embed subscription info in the `users` collection instead.

---

### 5. `payment_methods` Collection (NEW - Optional)
Store user payment methods from Stripe.

**Document ID:** Auto-generated

**Fields:**
```javascript
{
  userId: string,
  stripePaymentMethodId: string,
  type: string,                // 'card'
  card: {
    brand: string,             // 'visa', 'mastercard', etc.
    last4: string,             // Last 4 digits
    expMonth: number,
    expYear: number,
  },
  isDefault: boolean,
  createdAt: timestamp,
}
```

**Note:** Consider whether to store this or query Stripe API on-demand.

---

## Subscription Tier Configuration

### Tier Definitions

**Starter - $29/month**
```javascript
{
  tier: 'starter',
  name: 'Starter',
  price: 2900,  // cents
  interval: 'month',
  stripePriceId: 'price_starter_monthly', // To be created in Stripe
  limits: {
    maxExtinguishers: 100,
    photosEnabled: false,
    maxPhotosPerUnit: 0,
    gpsEnabled: false,
    advancedExportEnabled: false,
    inspectionHistoryEnabled: false,
  }
}
```

**Professional - $79/month**
```javascript
{
  tier: 'professional',
  name: 'Professional',
  price: 7900,  // cents
  interval: 'month',
  stripePriceId: 'price_professional_monthly', // To be created in Stripe
  limits: {
    maxExtinguishers: 500,
    photosEnabled: true,
    maxPhotosPerUnit: 5,
    gpsEnabled: true,
    advancedExportEnabled: true,
    inspectionHistoryEnabled: true,
  }
}
```

**Professional - $790/year (annual)**
```javascript
{
  tier: 'professional',
  name: 'Professional (Annual)',
  price: 79000,  // cents
  interval: 'year',
  stripePriceId: 'price_professional_yearly', // To be created in Stripe
  limits: {
    maxExtinguishers: 500,
    photosEnabled: true,
    maxPhotosPerUnit: 5,
    gpsEnabled: true,
    advancedExportEnabled: true,
    inspectionHistoryEnabled: true,
  }
}
```

---

## Feature Gating Logic

### On App Load
1. Fetch user document from Firestore
2. Check `subscriptionStatus`:
   - `trialing`: Check if `trialEndsAt` > now, else expire trial
   - `active`: Allow full access to tier features
   - `past_due`: Show warning banner, allow read-only access
   - `canceled`: Downgrade to free/starter tier or block access

### Before Creating Extinguisher
```javascript
async function canCreateExtinguisher(userId) {
  const userDoc = await db.collection('users').doc(userId).get();
  const user = userDoc.data();

  // Count current extinguishers
  const count = await db.collection('extinguishers')
    .where('userId', '==', userId)
    .count()
    .get();

  return count.data().count < user.limits.maxExtinguishers;
}
```

### Before Uploading Photo
```javascript
async function canUploadPhoto(userId) {
  const userDoc = await db.collection('users').doc(userId).get();
  const user = userDoc.data();

  return user.limits.photosEnabled;
}
```

### Before Capturing GPS
```javascript
async function canCaptureGPS(userId) {
  const userDoc = await db.collection('users').doc(userId).get();
  const user = userDoc.data();

  return user.limits.gpsEnabled;
}
```

---

## Stripe Webhook Events to Handle

### `checkout.session.completed`
- User completes signup
- Create/update user document with subscription info
- Set `subscriptionStatus` to 'active'

### `customer.subscription.updated`
- Subscription tier changed (upgrade/downgrade)
- Update user limits
- Update subscription dates

### `customer.subscription.deleted`
- Subscription canceled
- Set `subscriptionStatus` to 'canceled'
- Optionally downgrade to free tier

### `invoice.payment_succeeded`
- Payment successful
- Extend `currentPeriodEnd`

### `invoice.payment_failed`
- Payment failed
- Set `subscriptionStatus` to 'past_due'
- Send email notification

---

## Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own user document
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Users can only access their own workspaces
    match /workspaces/{workspaceId} {
      allow read, write: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }

    // Users can only access their own extinguishers
    match /extinguishers/{extinguisherId} {
      allow read, write: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }

    // Other collections follow similar pattern
  }
}
```

---

## Migration Plan

### Step 1: Add User Documents
- Create `users` collection
- On first login, create user document with trial status
- Default to Professional tier during trial

### Step 2: Implement Feature Gating
- Add checks before creating extinguishers
- Add checks before uploading photos
- Add checks before GPS capture
- Hide disabled features in UI

### Step 3: Stripe Integration
- Create products and prices in Stripe
- Implement checkout flow
- Implement webhook handler
- Test subscription lifecycle

### Step 4: Account Management UI
- Build subscription management page
- Show current plan and limits
- Add upgrade/downgrade buttons
- Show billing history

---

## Implementation Files Needed

1. `/src/config/subscriptionTiers.js` - Tier definitions and limits
2. `/src/services/subscriptionService.js` - Subscription logic
3. `/src/hooks/useSubscription.js` - React hook for accessing user subscription
4. `/src/services/stripeService.js` - Stripe API integration
5. `/src/components/UpgradePrompt.jsx` - Component to prompt upgrades
6. `/functions/stripeWebhook.js` - Firebase Cloud Function for webhooks (or Express endpoint)

---

## Notes

- Firebase API keys in client code are OK (security is via Firestore rules)
- Stripe publishable key is OK in client code
- Stripe secret key and webhook secret MUST be server-side only
- Consider using Firebase Cloud Functions for webhook handling
- Trial period: 30 days from account creation
- No credit card required for trial
