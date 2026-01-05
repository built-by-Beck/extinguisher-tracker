/**
 * Subscription Tier Configuration
 *
 * Defines the available subscription tiers, pricing, and feature limits
 * for the Fire Extinguisher Tracker application.
 */

export const SUBSCRIPTION_TIERS = {
  BASIC: 'basic',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

export const SUBSCRIPTION_STATUS = {
  TRIALING: 'trialing',
  ACTIVE: 'active',
  PAST_DUE: 'past_due',
  CANCELED: 'canceled',
  INCOMPLETE: 'incomplete',
};

/**
 * Tier configurations with pricing and feature limits
 */
export const TIER_CONFIG = {
  [SUBSCRIPTION_TIERS.BASIC]: {
    tier: SUBSCRIPTION_TIERS.BASIC,
    name: 'Basic',
    description: 'Perfect for small facilities',

    pricing: {
      monthly: {
        amount: 2900, // cents ($29/month)
        interval: 'month',
        stripePriceId: import.meta.env.VITE_STRIPE_PRICE_BASIC_MONTHLY || 'price_basic_monthly',
      },
    },

    limits: {
      maxExtinguishers: 100,
      photosEnabled: false,
      maxPhotosPerUnit: 0,
      gpsEnabled: false,
      advancedExportEnabled: false,
      inspectionHistoryEnabled: false,
      prioritySupport: false,
    },

    features: [
      'Up to 100 fire extinguishers',
      'Pass/Fail inspection tracking',
      '13-point inspection checklist',
      'Basic Excel export',
      'Time tracking per section',
      'Mobile access',
    ],
  },

  [SUBSCRIPTION_TIERS.PRO]: {
    tier: SUBSCRIPTION_TIERS.PRO,
    name: 'Pro',
    description: 'For growing organizations',
    popular: true,

    pricing: {
      monthly: {
        amount: 7900, // cents ($79/month)
        interval: 'month',
        stripePriceId: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
      },
    },

    limits: {
      maxExtinguishers: 500,
      photosEnabled: true,
      maxPhotosPerUnit: 5,
      gpsEnabled: true,
      advancedExportEnabled: true,
      inspectionHistoryEnabled: true,
      prioritySupport: true,
    },

    features: [
      'Up to 500 fire extinguishers',
      'Everything in Basic, plus:',
      'Up to 5 photos per unit',
      'GPS location tracking',
      'Advanced export options',
      'Inspection history tracking',
      'Monthly cycle automation',
      'Priority email support',
    ],
  },

  [SUBSCRIPTION_TIERS.ENTERPRISE]: {
    tier: SUBSCRIPTION_TIERS.ENTERPRISE,
    name: 'Enterprise',
    description: 'For large organizations',
    customPricing: true,

    pricing: {
      custom: true, // Custom pricing - call for details
    },

    limits: {
      maxExtinguishers: Infinity,
      photosEnabled: true,
      maxPhotosPerUnit: 10,
      gpsEnabled: true,
      advancedExportEnabled: true,
      inspectionHistoryEnabled: true,
      prioritySupport: true,
    },

    features: [
      'Unlimited fire extinguishers',
      'Everything in Pro, plus:',
      'Custom integrations',
      'Dedicated account manager',
      'Priority 24/7 support',
      'Custom training',
      'API access',
      'SLA guarantee',
    ],
  },
};

/**
 * Trial period configuration
 */
export const TRIAL_CONFIG = {
  durationDays: 30,
  defaultTier: SUBSCRIPTION_TIERS.PRO, // Give users Pro features during trial
  requiresPaymentMethod: false, // No credit card required for trial
};

/**
 * Get tier configuration by tier name
 */
export function getTierConfig(tier) {
  return TIER_CONFIG[tier] || TIER_CONFIG[SUBSCRIPTION_TIERS.BASIC];
}

/**
 * Get feature limits for a specific tier
 */
export function getTierLimits(tier) {
  const config = getTierConfig(tier);
  return config.limits;
}

/**
 * Format price for display
 */
export function formatPrice(amountInCents, interval = 'month') {
  const dollars = amountInCents / 100;
  return {
    amount: dollars,
    display: `$${dollars}/${interval}`,
  };
}

/**
 * Check if user has access to a feature
 */
export function hasFeatureAccess(userLimits, featureName) {
  if (!userLimits) return false;
  return userLimits[featureName] === true || userLimits[featureName] > 0;
}

/**
 * Get user-friendly status message
 */
export function getSubscriptionStatusMessage(status, trialEndsAt) {
  switch (status) {
    case SUBSCRIPTION_STATUS.TRIALING:
      const daysLeft = Math.ceil((trialEndsAt - Date.now()) / (1000 * 60 * 60 * 24));
      return `Trial: ${daysLeft} days remaining`;

    case SUBSCRIPTION_STATUS.ACTIVE:
      return 'Active';

    case SUBSCRIPTION_STATUS.PAST_DUE:
      return 'Payment Required';

    case SUBSCRIPTION_STATUS.CANCELED:
      return 'Canceled';

    case SUBSCRIPTION_STATUS.INCOMPLETE:
      return 'Setup Incomplete';

    default:
      return 'Unknown';
  }
}

/**
 * Check if subscription is active (includes trial)
 */
export function isSubscriptionActive(status, trialEndsAt = null) {
  if (status === SUBSCRIPTION_STATUS.ACTIVE) return true;

  if (status === SUBSCRIPTION_STATUS.TRIALING && trialEndsAt) {
    return Date.now() < trialEndsAt;
  }

  return false;
}

export default TIER_CONFIG;
