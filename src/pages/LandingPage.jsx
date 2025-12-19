import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Clock, BarChart3, Download, Smartphone } from 'lucide-react';
import AdSense from '../components/AdSense';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Fire Extinguisher Tracker</span>
            </div>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Fire Extinguisher Inspection Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your fire safety compliance with our cloud-based inspection tracking system.
            Manage inspections, track compliance, and generate comprehensive reports with ease.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/app"
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              Start Free Trial
            </Link>
            <Link
              to="/features"
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Unit - Top of page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AdSense
          adSlot="1111111111"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need for Fire Safety Compliance
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Easy Inspections</h3>
            <p className="text-gray-600">
              Intuitive pass/fail inspection workflow with detailed checklists.
              Complete inspections faster with barcode scanning and GPS location tracking.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Clock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Time Tracking</h3>
            <p className="text-gray-600">
              Built-in timer system tracks inspection time per section.
              Monitor efficiency and optimize your inspection workflows.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Comprehensive Reports</h3>
            <p className="text-gray-600">
              Generate detailed inspection reports with pass/fail statistics.
              Export to Excel for compliance documentation and record keeping.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Download className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Import/Export</h3>
            <p className="text-gray-600">
              Easily import existing fire extinguisher data from Excel or CSV files.
              Export inspection results with photos and GPS coordinates.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Smartphone className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Mobile Friendly</h3>
            <p className="text-gray-600">
              Works on any device - desktop, tablet, or smartphone.
              Capture photos and GPS locations directly from your mobile device.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Shield className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              Cloud-based storage with offline capability.
              Your inspection data is always secure and accessible when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Unit - Middle of page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <AdSense
          adSlot="2222222222"
          adFormat="rectangle"
          className="my-8"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Fire Extinguisher Tracker?
        </h2>
        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Save Time and Money</h3>
              <p className="text-gray-600">
                Reduce inspection time by up to 50% with our streamlined workflow.
                Eliminate paper forms and manual data entry, saving hours of administrative work each month.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Ensure Compliance</h3>
              <p className="text-gray-600">
                Meet NFPA 10 and OSHA fire safety requirements with confidence.
                Our detailed checklists ensure every required inspection point is documented and verified.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Improve Accountability</h3>
              <p className="text-gray-600">
                Track who performed each inspection and when.
                Photo documentation and GPS verification provide proof of inspection completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Modernize Your Fire Safety Inspections?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of facilities using Fire Extinguisher Tracker to stay compliant and efficient.
          </p>
          <Link
            to="/app"
            className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Ad Unit - Bottom of page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <AdSense
          adSlot="3333333333"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

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
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
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

export default LandingPage;
