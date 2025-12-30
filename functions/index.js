/**
 * Firebase Cloud Functions for Stripe Integration
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

/**
 * Create Stripe Checkout Session
 * 
 * This function creates a Stripe Checkout session for subscription signup.
 * Called from the frontend when a user wants to subscribe.
 */
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be logged in to create a checkout session'
    );
  }

  const { priceId, successUrl, cancelUrl } = data;
  const userId = context.auth.uid;
  const userEmail = context.auth.token.email;

  if (!priceId || !successUrl || !cancelUrl) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required parameters: priceId, successUrl, cancelUrl'
    );
  }

  try {
    // Get user document to check for existing Stripe customer
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    let customerId = userDoc.data()?.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          firebaseUID: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to user document
      await admin.firestore().collection('users').doc(userId).update({
        stripeCustomerId: customerId,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
      },
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create checkout session',
      error.message
    );
  }
});

/**
 * Create Stripe Customer Portal Session
 * 
 * This function creates a Stripe Customer Portal session for subscription management.
 * Called from the frontend when a user wants to manage their subscription.
 */
exports.createPortalSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be logged in to access customer portal'
    );
  }

  const { returnUrl } = data;
  const userId = context.auth.uid;

  if (!returnUrl) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required parameter: returnUrl'
    );
  }

  try {
    // Get user document to find Stripe customer ID
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const customerId = userDoc.data()?.stripeCustomerId;

    if (!customerId) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'No Stripe customer found. Please subscribe first.'
      );
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create portal session',
      error.message
    );
  }
});

/**
 * Stripe Webhook Handler
 * 
 * This function handles Stripe webhook events to keep user subscriptions in sync.
 * Must be configured in Stripe Dashboard → Webhooks.
 */
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

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
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Webhook handler failed');
  }
});

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutCompleted(event) {
  const session = event.data.object;
  const userId = session.metadata.userId;

  if (!userId) {
    console.error('No userId in checkout session metadata');
    return;
  }

  // Retrieve the subscription
  const subscription = await stripe.subscriptions.retrieve(session.subscription);
  const priceId = subscription.items.data[0].price.id;

  // Determine tier from price ID
  const tier = getTierFromPriceId(priceId);

  // Update user document
  await admin.firestore().collection('users').doc(userId).update({
    subscriptionStatus: 'active',
    subscriptionTier: tier,
    stripeSubscriptionId: subscription.id,
    currentPeriodStart: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_start * 1000
    ),
    currentPeriodEnd: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_end * 1000
    ),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Update limits based on tier
  await updateUserLimits(userId, tier);
}

/**
 * Handle customer.subscription.updated event
 */
async function handleSubscriptionUpdated(event) {
  const subscription = event.data.object;
  const userId = await getUserIdFromCustomerId(subscription.customer);

  if (!userId) {
    console.error('No userId found for customer:', subscription.customer);
    return;
  }

  const priceId = subscription.items.data[0].price.id;
  const tier = getTierFromPriceId(priceId);

  await admin.firestore().collection('users').doc(userId).update({
    subscriptionTier: tier,
    subscriptionStatus: subscription.status,
    currentPeriodStart: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_start * 1000
    ),
    currentPeriodEnd: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_end * 1000
    ),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Update limits based on tier
  await updateUserLimits(userId, tier);
}

/**
 * Handle customer.subscription.deleted event
 */
async function handleSubscriptionDeleted(event) {
  const subscription = event.data.object;
  const userId = await getUserIdFromCustomerId(subscription.customer);

  if (!userId) {
    console.error('No userId found for customer:', subscription.customer);
    return;
  }

  await admin.firestore().collection('users').doc(userId).update({
    subscriptionStatus: 'canceled',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

/**
 * Handle invoice.payment_succeeded event
 */
async function handlePaymentSucceeded(event) {
  const invoice = event.data.object;
  const userId = await getUserIdFromCustomerId(invoice.customer);

  if (!userId) {
    return;
  }

  // Update subscription dates if needed
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    await admin.firestore().collection('users').doc(userId).update({
      currentPeriodStart: admin.firestore.Timestamp.fromMillis(
        subscription.current_period_start * 1000
      ),
      currentPeriodEnd: admin.firestore.Timestamp.fromMillis(
        subscription.current_period_end * 1000
      ),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
}

/**
 * Handle invoice.payment_failed event
 */
async function handlePaymentFailed(event) {
  const invoice = event.data.object;
  const userId = await getUserIdFromCustomerId(invoice.customer);

  if (!userId) {
    return;
  }

  await admin.firestore().collection('users').doc(userId).update({
    subscriptionStatus: 'past_due',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

/**
 * Helper: Get tier from Stripe Price ID
 */
function getTierFromPriceId(priceId) {
  // Map price IDs to tiers
  // These should match your Stripe Price IDs
  const priceIdToTier = {
    'price_basic_monthly': 'basic',
    'price_pro_monthly': 'pro',
  };

  // Check if exact match exists
  if (priceIdToTier[priceId]) {
    return priceIdToTier[priceId];
  }

  // Check if price ID contains tier name (for dynamic price IDs)
  if (priceId.includes('basic')) {
    return 'basic';
  }
  if (priceId.includes('pro')) {
    return 'pro';
  }

  // Default to basic if unknown
  console.warn('Unknown price ID:', priceId, '- defaulting to basic');
  return 'basic';
}

/**
 * Helper: Get user ID from Stripe Customer ID
 */
async function getUserIdFromCustomerId(customerId) {
  try {
    // Query Firestore for user with this Stripe customer ID
    const usersSnapshot = await admin
      .firestore()
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (!usersSnapshot.empty) {
      return usersSnapshot.docs[0].id;
    }

    // If not found in Firestore, try getting from Stripe customer metadata
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.metadata && customer.metadata.firebaseUID) {
        return customer.metadata.firebaseUID;
      }
    } catch (stripeError) {
      console.error('Error retrieving customer from Stripe:', stripeError);
    }

    return null;
  } catch (error) {
    console.error('Error getting userId from customerId:', error);
    return null;
  }
}

/**
 * Helper: Update user limits based on tier
 */
async function updateUserLimits(userId, tier) {
  const tierConfig = {
    basic: {
      maxExtinguishers: 100,
      photosEnabled: false,
      maxPhotosPerUnit: 0,
      gpsEnabled: false,
      advancedExportEnabled: false,
      inspectionHistoryEnabled: false,
      prioritySupport: false,
    },
    pro: {
      maxExtinguishers: 500,
      photosEnabled: true,
      maxPhotosPerUnit: 5,
      gpsEnabled: true,
      advancedExportEnabled: true,
      inspectionHistoryEnabled: true,
      prioritySupport: true,
    },
    enterprise: {
      maxExtinguishers: Infinity,
      photosEnabled: true,
      maxPhotosPerUnit: 10,
      gpsEnabled: true,
      advancedExportEnabled: true,
      inspectionHistoryEnabled: true,
      prioritySupport: true,
    },
  };

  const limits = tierConfig[tier] || tierConfig.basic;

  await admin.firestore().collection('users').doc(userId).update({
    limits: limits,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

