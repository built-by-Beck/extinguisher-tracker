/**
 * Stripe Service
 * 
 * Handles Stripe integration for subscription management
 */

import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Initialize Stripe - will be loaded when needed
let stripePromise = null;

// Initialize Firebase Functions (will use default Firebase app)
let functions = null;
function getFunctionsInstance() {
  if (!functions) {
    functions = getFunctions();
  }
  return functions;
}

/**
 * Get Stripe instance
 * Note: This is now also initialized in main.jsx via StripeProvider
 * but kept here for backward compatibility
 */
export function getStripe() {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('Stripe publishable key not configured');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

/**
 * Create a Stripe Checkout session
 * @param {string} priceId - Stripe Price ID
 * @param {string} userId - Firebase Auth UID
 * @returns {Promise<string>} Checkout session URL
 */
export async function createCheckoutSession(priceId, userId) {
  try {
    const functionsInstance = getFunctionsInstance();
    const createCheckout = httpsCallable(functionsInstance, 'createCheckoutSession');
    
    const result = await createCheckout({
      priceId,
      successUrl: `${window.location.origin}/app?checkout=success`,
      cancelUrl: `${window.location.origin}/signup?plan=canceled`,
    });

    if (!result.data || !result.data.url) {
      throw new Error('Invalid response from server');
    }

    return result.data.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'functions/unauthenticated') {
      throw new Error('Please sign in to continue.');
    } else if (error.code === 'functions/permission-denied') {
      throw new Error('You do not have permission to perform this action.');
    } else if (error.code === 'functions/unavailable') {
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
    
    throw error;
  }
}

/**
 * Create a Stripe Customer Portal session
 * @param {string} returnUrl - URL to return to after portal
 * @returns {Promise<string>} Portal session URL
 */
export async function createPortalSession(returnUrl) {
  try {
    const functionsInstance = getFunctionsInstance();
    const createPortal = httpsCallable(functionsInstance, 'createPortalSession');
    
    const result = await createPortal({
      returnUrl,
    });

    if (!result.data || !result.data.url) {
      throw new Error('Invalid response from server');
    }

    return result.data.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'functions/unauthenticated') {
      throw new Error('Please sign in to continue.');
    } else if (error.code === 'functions/permission-denied') {
      throw new Error('You do not have permission to perform this action.');
    } else if (error.code === 'functions/unavailable') {
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
    
    throw error;
  }
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(priceId, userId) {
  try {
    const url = await createCheckoutSession(priceId, userId);
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Customer Portal
 */
export async function redirectToPortal(returnUrl) {
  try {
    const url = await createPortalSession(returnUrl);
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to portal:', error);
    throw error;
  }
}

