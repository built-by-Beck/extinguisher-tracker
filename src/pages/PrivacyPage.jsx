import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const PrivacyPage = () => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 3, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Fire Extinguisher Tracker ("we", "our", or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            <p className="text-gray-600 mb-4">
              Please read this Privacy Policy carefully. By using the Service, you consent to the data practices
              described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-600 mb-4">We collect information that you voluntarily provide when using our Service:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Account information (name, email address, password)</li>
              <li>Fire extinguisher data (asset IDs, locations, serial numbers)</li>
              <li>Inspection records and notes</li>
              <li>Photos uploaded during inspections</li>
              <li>GPS location data (when you choose to capture it)</li>
              <li>Time tracking information</li>
              <li>Payment information (processed by third-party payment processors)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-600 mb-4">We automatically collect certain information when you use our Service:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Device information (browser type, operating system, device type)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>IP address and general location information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information for various purposes:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process your transactions and manage your subscription</li>
              <li>To send you technical notices, updates, and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to track activity on our Service and store certain
              information. Cookies are files with a small amount of data that are stored on your device.
            </p>
            <p className="text-gray-600 mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>

            <h3 className="text-xl font-bold text-gray-900 mb-3">5.1 Google Firebase</h3>
            <p className="text-gray-600 mb-4">
              We use Google Firebase for authentication, data storage, and file hosting. Firebase may collect and
              process data as described in Google's Privacy Policy. For more information, visit
              https://policies.google.com/privacy
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">5.2 Google AdSense</h3>
            <p className="text-gray-600 mb-4">
              We use Google AdSense to display advertisements on our website. Google uses cookies to serve ads based
              on your prior visits to our website or other websites. Google's use of advertising cookies enables it
              and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
            </p>
            <p className="text-gray-600 mb-4">
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-red-600 hover:text-red-700" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              {' '}or by visiting{' '}
              <a href="http://www.aboutads.info/choices/" className="text-red-600 hover:text-red-700" target="_blank" rel="noopener noreferrer">
                www.aboutads.info
              </a>.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">5.3 Payment Processors</h3>
            <p className="text-gray-600 mb-4">
              We use third-party payment processors to process subscription payments. We do not store or have access
              to your full credit card information. Payment information is encrypted and processed securely by our
              payment partners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Storage and Security</h2>
            <p className="text-gray-600 mb-4">
              Your data is stored securely using Google Firebase's cloud infrastructure, which provides enterprise-grade
              security including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Redundant backup systems</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="text-gray-600 mb-4">
              While we implement reasonable security measures, no method of transmission over the Internet or electronic
              storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information for as long as your account is active or as needed to provide you
              services. If you wish to delete your account or request that we no longer use your information, you can
              do so through your account settings or by contacting us.
            </p>
            <p className="text-gray-600 mb-4">
              We may retain and use your information as necessary to comply with legal obligations, resolve disputes,
              and enforce our agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Data Rights</h2>
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Access:</strong> You can access your personal data through your account dashboard</li>
              <li><strong>Correction:</strong> You can update or correct your information at any time</li>
              <li><strong>Deletion:</strong> You can request deletion of your account and associated data</li>
              <li><strong>Export:</strong> You can export your data in Excel format</li>
              <li><strong>Objection:</strong> You can object to processing of your personal data</li>
              <li><strong>Portability:</strong> You can request a copy of your data in a structured format</li>
            </ul>
            <p className="text-gray-600 mb-4">
              To exercise these rights, please contact us through the contact information provided below or use the
              account settings in the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided
              us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              Your information may be transferred to and maintained on computers located outside of your state,
              province, country, or other governmental jurisdiction where data protection laws may differ. By using
              our Service, you consent to such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. California Privacy Rights</h2>
            <p className="text-gray-600 mb-4">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act
              (CCPA), including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>The right to know what personal information is collected, used, and shared</li>
              <li>The right to delete personal information held by businesses</li>
              <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your CCPA rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. GDPR Compliance (EU Users)</h2>
            <p className="text-gray-600 mb-4">
              If you are located in the European Economic Area (EEA), you have rights under the General Data Protection
              Regulation (GDPR). We process your data based on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Your consent (which you can withdraw at any time)</li>
              <li>The performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests (where not overridden by your rights)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us through
              the contact information provided on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Do Not Track Signals</h2>
            <p className="text-gray-600 mb-4">
              We do not currently respond to "Do Not Track" signals from web browsers. Third-party services like
              Google AdSense may track your browsing activities across different websites.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-600">
            <Link to="/terms" className="text-red-600 hover:text-red-700">Terms of Service</Link>
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

export default PrivacyPage;
