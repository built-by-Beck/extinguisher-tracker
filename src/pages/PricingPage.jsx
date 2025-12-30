import { Link } from 'react-router-dom';
import { Shield, Check, X } from 'lucide-react';
import AdSense from '../components/AdSense';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Fire Extinguisher Tracker</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link to="/pricing" className="text-gray-900 font-semibold">Pricing</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/app" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Choose the plan that's right for your organization. All plans include core features with a 30-day free trial.
          </p>
        </div>
      </section>

      {/* Ad Unit - Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="7777777777"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-gray-600 mb-4">Perfect for small facilities</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-500">Billed monthly</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Up to 100 fire extinguishers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Pass/Fail inspection tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>13-point inspection checklist</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Basic Excel export</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Time tracking per section</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Mobile access</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">Photo documentation</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">GPS location tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">Priority support</span>
              </li>
            </ul>

            <Link
              to="/signup?plan=basic"
              className="block w-full bg-gray-200 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan (Most Popular) */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-red-600 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-8 mt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-4">For growing organizations</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$79</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-500">Billed monthly</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-semibold">Up to 500 fire extinguishers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Everything in Basic, plus:</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-semibold">Up to 5 photos per unit</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-semibold">GPS location tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Advanced export options</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Inspection history tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Monthly cycle automation</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Priority email support</span>
              </li>
            </ul>

            <Link
              to="/signup?plan=pro"
              className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large organizations</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-sm text-gray-500">Call for pricing</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-semibold">Unlimited fire extinguishers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Everything in Pro, plus:</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Priority 24/7 support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Custom training</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>API access</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>SLA guarantee</span>
              </li>
            </ul>

            <a
              href="mailto:sales@extinguishertracker.com?subject=Enterprise%20Inquiry"
              className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Contact Sales
            </a>
          </div>

        </div>
      </section>

      {/* Ad Unit - Middle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="8888888888"
          adFormat="rectangle"
          className="my-8"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">How does the free trial work?</h3>
            <p className="text-gray-600">
              All plans include a 30-day free trial with full access to features. No credit card required to start.
              You can upgrade, downgrade, or cancel at any time during or after the trial period.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Can I change plans later?</h3>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged a prorated
              amount for the remainder of your billing period. When you downgrade, you'll receive a credit for your next billing cycle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards (Visa, MasterCard, American Express, Discover) via Stripe's secure payment processing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Is my data secure?</h3>
            <p className="text-gray-600">
              Absolutely. We use enterprise-grade security with Firebase cloud storage, SSL encryption, and regular
              backups. Your data is stored redundantly across multiple data centers and is only accessible by your
              authorized users.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">What happens if I exceed my plan limits?</h3>
            <p className="text-gray-600">
              We'll notify you when you're approaching your plan limits. You can either upgrade to a higher plan or
              remove older records. We won't lock you out of your account - you'll have time to adjust your plan.
            </p>
          </div>

        </div>
      </section>

      {/* Ad Unit - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="9999999999"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Free 30-Day Trial Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No credit card required. Full access to all features. Cancel anytime.
          </p>
          <Link
            to="/signup"
            className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-red-500" />
                <span className="ml-2 text-white font-bold">Fire Extinguisher Tracker</span>
              </div>
              <p className="text-sm">Professional fire safety inspection management for modern facilities.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/app" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2025 Fire Extinguisher Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
