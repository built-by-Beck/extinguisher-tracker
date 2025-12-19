import { Link } from 'react-router-dom';
import { Shield, Target, Users, Award } from 'lucide-react';
import AdSense from '../components/AdSense';

const AboutPage = () => {
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
              <Link to="/about" className="text-gray-900 font-semibold">About</Link>
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
          <h1 className="text-5xl font-bold mb-6">About Fire Extinguisher Tracker</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            We're on a mission to modernize fire safety compliance and make inspections easier for facilities worldwide.
          </p>
        </div>
      </section>

      {/* Ad Unit - Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="1010101010"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              Fire Extinguisher Tracker was created to solve a common problem: managing fire extinguisher inspections
              is time-consuming, error-prone, and often relies on outdated paper-based systems.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We believe that fire safety compliance should be simple, efficient, and accessible to organizations
              of all sizes. Our cloud-based platform eliminates paperwork, reduces inspection time, and provides
              instant access to compliance documentation.
            </p>
            <p className="text-lg text-gray-600">
              Built by safety professionals for safety professionals, Fire Extinguisher Tracker combines
              industry expertise with modern technology to deliver a solution that actually works in the field.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-lg">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Our Goal</h3>
                <p className="text-gray-600">Make fire safety compliance effortless</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Our Team</h3>
                <p className="text-gray-600">Safety experts and software engineers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Our Values</h3>
                <p className="text-gray-600">Quality, reliability, and customer success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Active Facilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50,000+</div>
              <div className="text-gray-600">Fire Extinguishers Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100,000+</div>
              <div className="text-gray-600">Inspections Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Unit - Middle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="2020202020"
          adFormat="rectangle"
          className="my-8"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Organizations Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Built for the Field</h3>
            <p className="text-gray-600">
              Designed by people who actually do fire extinguisher inspections. We understand the challenges
              of working in different buildings, connectivity issues, and tight schedules.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Always Improving</h3>
            <p className="text-gray-600">
              We regularly release new features based on customer feedback. Your input directly shapes
              the future of Fire Extinguisher Tracker.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">Responsive Support</h3>
            <p className="text-gray-600">
              Our support team responds quickly and actually understands fire safety. We're here to help
              you succeed, not just sell software.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Compliance & Standards</h2>
          <p className="text-lg text-gray-600 mb-8">
            Fire Extinguisher Tracker is designed to help you meet NFPA 10 and OSHA fire safety requirements.
            Our 13-point inspection checklist covers all standard monthly inspection criteria, ensuring
            comprehensive compliance documentation.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">NFPA 10 Aligned</h3>
              <p className="text-sm text-gray-600">Monthly inspection requirements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">OSHA Compliant</h3>
              <p className="text-sm text-gray-600">Documentation standards</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Audit Ready</h3>
              <p className="text-sm text-gray-600">Complete inspection records</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Hundreds of Satisfied Customers
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference that modern fire safety management can make.
          </p>
          <Link
            to="/app"
            className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Start Your Free Trial
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

export default AboutPage;
