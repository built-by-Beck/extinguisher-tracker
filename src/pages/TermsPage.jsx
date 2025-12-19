import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const TermsPage = () => {
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
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/app" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 3, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Fire Extinguisher Tracker ("the Service"), you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to these Terms of Service, please
              do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              Fire Extinguisher Tracker provides a cloud-based platform for managing fire extinguisher inspections,
              tracking compliance, and generating reports. The Service includes features such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Fire extinguisher inventory management</li>
              <li>Inspection tracking and documentation</li>
              <li>Photo and GPS location capture</li>
              <li>Report generation and data export</li>
              <li>Time tracking and section management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To use the Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Providing accurate, current, and complete information during registration</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>
            <p className="text-gray-600 mb-4">
              Access to the Service requires a paid subscription. By subscribing, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Pay all fees associated with your chosen subscription plan</li>
              <li>Automatic renewal of your subscription unless cancelled</li>
              <li>That all fees are non-refundable except as required by law</li>
              <li>Price changes with 30 days advance notice</li>
            </ul>
            <p className="text-gray-600 mb-4">
              We offer a 30-day free trial for new users. No credit card is required to start the trial.
              You may cancel at any time during the trial period without charge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct</h2>
            <p className="text-gray-600 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or malicious code</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data and Privacy</h2>
            <p className="text-gray-600 mb-4">
              Your use of the Service is also governed by our Privacy Policy. We collect, use, and protect
              your data as described in our Privacy Policy. You retain all rights to your data, and you may
              export or delete your data at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              The Service, including all content, features, and functionality, is owned by Fire Extinguisher
              Tracker and is protected by copyright, trademark, and other intellectual property laws. You are
              granted a limited, non-exclusive, non-transferable license to access and use the Service for its
              intended purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations of Liability</h2>
            <p className="text-gray-600 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
              OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
            <p className="text-gray-600 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Compliance Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              While Fire Extinguisher Tracker is designed to help you meet NFPA 10 and OSHA fire safety requirements,
              you are solely responsible for ensuring compliance with all applicable laws and regulations. The Service
              is a tool to assist with compliance management, not a substitute for professional fire safety expertise
              or legal advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to suspend or terminate your account and access to the Service at any time,
              with or without notice, for conduct that we believe violates these Terms of Service or is harmful
              to other users, us, or third parties, or for any other reason.
            </p>
            <p className="text-gray-600 mb-4">
              You may cancel your subscription at any time through your account settings. Upon cancellation,
              you will continue to have access to the Service until the end of your current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify you of any
              material changes by email or through the Service. Your continued use of the Service after such
              modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the
              jurisdiction in which Fire Extinguisher Tracker operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us through the contact
              information provided on our website.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-600">
            <Link to="/privacy" className="text-red-600 hover:text-red-700">Privacy Policy</Link>
            {' | '}
            <Link to="/" className="text-red-600 hover:text-red-700">Back to Home</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
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

export default TermsPage;
