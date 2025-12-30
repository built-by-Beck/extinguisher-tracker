import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { redirectToCheckout } from '../services/stripeService';
import { SUBSCRIPTION_TIERS, TIER_CONFIG } from '../config/subscriptionTiers';
import { Shield, Lock, User, AlertCircle, Loader } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan') || 'pro'; // default to pro
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(planParam);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate selected plan
  const validPlan = ['basic', 'pro'].includes(selectedPlan) ? selectedPlan : 'pro';
  const planConfig = TIER_CONFIG[validPlan === 'basic' ? SUBSCRIPTION_TIERS.BASIC : SUBSCRIPTION_TIERS.PRO];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!planConfig.pricing.monthly.stripePriceId) {
      setError('Invalid plan selected. Please contact support.');
      return;
    }

    setLoading(true);

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore with trial status
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 30); // 30-day trial

      const userDoc = {
        userId: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
        subscriptionTier: validPlan,
        subscriptionStatus: 'trialing',
        trialStartedAt: serverTimestamp(),
        trialEndsAt: trialEndsAt,
        limits: {
          maxExtinguishers: planConfig.limits.maxExtinguishers,
          photosEnabled: planConfig.limits.photosEnabled,
          maxPhotosPerUnit: planConfig.limits.maxPhotosPerUnit,
          gpsEnabled: planConfig.limits.gpsEnabled,
          advancedExportEnabled: planConfig.limits.advancedExportEnabled,
          inspectionHistoryEnabled: planConfig.limits.inspectionHistoryEnabled,
          prioritySupport: planConfig.limits.prioritySupport,
        },
        usage: {
          extinguisherCount: 0,
          lastUpdated: serverTimestamp(),
        },
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);

      // Redirect to Stripe Checkout
      await redirectToCheckout(planConfig.pricing.monthly.stripePriceId, user.uid);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(error.message || 'An error occurred during signup. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
            <h2 className="text-lg text-gray-600">Fire Extinguisher Tracker</h2>
          </div>

          {/* Plan Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Plan
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlan('basic')}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedPlan === 'basic'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">Basic</div>
                <div className="text-sm text-gray-600">$29/month</div>
                <div className="text-xs text-gray-500 mt-1">Up to 100 units</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedPlan === 'pro'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">Pro</div>
                <div className="text-sm text-gray-600">$79/month</div>
                <div className="text-xs text-gray-500 mt-1">Up to 500 units</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                `Sign Up & Continue to Payment`
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/app" className="text-red-600 hover:text-red-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

