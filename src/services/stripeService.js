/**
 * Stripe Service
 * 
 * Handles Stripe integration using the Firebase Stripe Extension
 * Uses Firestore-based checkout session creation
 */

import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Initialize Stripe - will be loaded when needed
let stripePromise = null;

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
 * Create a Stripe Checkout session using the extension
 * Creates a document in Firestore that the extension processes
 * @param {string} priceId - Stripe Price ID
 * @param {string} userId - Firebase Auth UID
 * @param {string} successUrl - URL to redirect after successful payment
 * @param {string} cancelUrl - URL to redirect after cancellation
 * @returns {Promise<string>} Checkout session URL
 */
export async function createCheckoutSession(priceId, userId, successUrl = null, cancelUrl = null) {
  return new Promise((resolve, reject) => {
    const defaultSuccessUrl = `${window.location.origin}/app?checkout=success`;
    const defaultCancelUrl = `${window.location.origin}/signup?plan=canceled`;
    
    const checkoutData = {
      price: priceId,
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,
    };

    // Create checkout session document in Firestore
    const checkoutSessionsRef = collection(db, 'customers', userId, 'checkout_sessions');
    
    addDoc(checkoutSessionsRef, checkoutData)
      .then((docRef) => {
        // Listen for the extension to update the document with the checkout URL
        const unsubscribe = onSnapshot(docRef, (snap) => {
          const data = snap.data();
          
          if (data?.error) {
            unsubscribe();
            reject(new Error(data.error.message || 'Failed to create checkout session'));
            return;
          }
          
          if (data?.url) {
            unsubscribe();
            resolve(data.url);
          }
        }, (error) => {
          unsubscribe();
          reject(new Error(`Error creating checkout session: ${error.message}`));
        });

        // Timeout after 30 seconds
        setTimeout(() => {
          unsubscribe();
          reject(new Error('Checkout session creation timed out. Please try again.'));
        }, 30000);
      })
      .catch((error) => {
        console.error('Error creating checkout session document:', error);
        
        // Provide user-friendly error messages
        if (error.code === 'permission-denied') {
          reject(new Error('Permission denied. Please check your authentication.'));
        } else if (error.code === 'unauthenticated') {
          reject(new Error('Please sign in to continue.'));
        } else {
          reject(new Error(`Failed to create checkout session: ${error.message}`));
        }
      });
  });
}

/**
 * Create a Stripe Customer Portal session using the extension
 * @param {string} userId - Firebase Auth UID
 * @param {string} returnUrl - URL to return to after portal
 * @param {string} locale - Locale for the portal (default: "auto")
 * @returns {Promise<string>} Portal session URL
 */
export async function createPortalSession(userId, returnUrl = null, locale = "auto") {
  try {
    const defaultReturnUrl = returnUrl || window.location.origin;
    const functions = getFunctions();
    
    // Use the extension's portal link function
    const createPortalLink = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink'
    );
    
    const result = await createPortalLink({
      returnUrl: defaultReturnUrl,
      locale: locale,
    });

    if (!result.data || !result.data.url) {
      throw new Error('Invalid response from portal function');
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
 * @param {string} priceId - Stripe Price ID
 * @param {string} userId - Firebase Auth UID
 * @param {string} successUrl - Optional success URL
 * @param {string} cancelUrl - Optional cancel URL
 */
export async function redirectToCheckout(priceId, userId, successUrl = null, cancelUrl = null) {
  try {
    const url = await createCheckoutSession(priceId, userId, successUrl, cancelUrl);
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Customer Portal
 * @param {string} userId - Firebase Auth UID
 * @param {string} returnUrl - Optional return URL
 */
export async function redirectToPortal(userId, returnUrl = null) {
  try {
    const url = await createPortalSession(userId, returnUrl);
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to portal:', error);
    throw error;
  }
}

/**
 * Get user's active subscription from the extension
 * @param {string} userId - Firebase Auth UID
 * @returns {Promise<Object|null>} Subscription data or null
 */
export async function getActiveSubscription(userId) {
  return new Promise((resolve, reject) => {
    const subscriptionsRef = collection(db, 'customers', userId, 'subscriptions');
    
    // Query for active or trialing subscriptions
    const unsubscribe = onSnapshot(
      subscriptionsRef,
      (snapshot) => {
        const activeSubs = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(sub => sub.status === 'active' || sub.status === 'trialing');
        
        if (activeSubs.length > 0) {
          unsubscribe();
          resolve(activeSubs[0]); // Return first active subscription
        } else {
          unsubscribe();
          resolve(null);
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
}
