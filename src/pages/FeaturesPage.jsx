import { Link } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Clock, BarChart3, Download, Upload, Smartphone, MapPin, Camera, FileText, Users, Settings } from 'lucide-react';
import AdSense from '../components/AdSense';

const FeaturesPage = () => {
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
              <Link to="/features" className="text-gray-900 font-semibold">Features</Link>
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
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Powerful Features for Fire Safety Compliance</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Everything you need to manage fire extinguisher inspections efficiently and meet compliance requirements.
          </p>
        </div>
      </section>

      {/* Ad Unit - Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="4444444444"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Core Inspection Features</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Pass/Fail Inspection System</h3>
                <p className="text-gray-600 mb-4">
                  Streamlined workflow for marking fire extinguishers as pass or fail with detailed notes.
                  Quick status updates with visual indicators make it easy to track inspection progress.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Visual pass/fail indicators
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Add detailed inspection notes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Track inspection history per unit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Reset status for new inspection cycles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Detailed Inspection Checklist</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive 13-point checklist covering all NFPA 10 requirements.
                  Ensure complete compliance with standardized inspection criteria.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Pin and tamper seal verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Pressure gauge and weight checks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Location and visibility requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Mounting and height compliance
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Time Tracking System</h3>
                <p className="text-gray-600 mb-4">
                  Built-in timer tracks how long you spend inspecting each section or building.
                  Monitor efficiency and optimize your inspection workflows.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Start/stop/pause timers per section
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Track total time spent per location
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Export time reports with section breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Add notes for each section
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Section-Based Organization</h3>
                <p className="text-gray-600 mb-4">
                  Organize fire extinguishers by hospital sections, buildings, or custom locations.
                  Filter and focus on specific areas for efficient inspections.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Pre-configured hospital sections
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Custom building assignments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Filter view by section
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Section-specific notes and tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Unit - Middle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="5555555555"
          adFormat="rectangle"
          className="my-8"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* Data Management Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Data Management & Reporting</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Excel/CSV Import</h3>
            <p className="text-gray-600">
              Import existing fire extinguisher data from Excel or CSV files.
              Bulk upload hundreds of units in seconds with section assignment.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Comprehensive Exports</h3>
            <p className="text-gray-600">
              Export inspection results to Excel with optional photos, GPS data, and checklist details.
              Separate exports for all, passed, or failed units.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Monthly Cycle Reset</h3>
            <p className="text-gray-600">
              Start new monthly inspection cycles with one click.
              Previous results saved to history while resetting all statuses.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile & Media Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Mobile & Documentation Features</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Camera className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Photo Documentation</h3>
                <p className="text-gray-600 mb-4">
                  Capture up to 5 photos per fire extinguisher directly from your device.
                  Visual proof of condition and location for compliance documentation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Multiple photos per unit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Photo thumbnails and main image
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Inspection-specific photos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Include in export reports
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">GPS Location Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Automatically capture GPS coordinates during inspections.
                  Verify physical location and generate map links for easy navigation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Automatic GPS capture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Accuracy and altitude data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Google Maps integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Export GPS in reports
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Smartphone className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Barcode Scanner Support</h3>
                <p className="text-gray-600 mb-4">
                  Quickly locate fire extinguishers using barcode scanner integration.
                  Instant search and selection for faster inspections.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Barcode scanner compatibility
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Instant asset lookup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Keyboard wedge support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Mobile device scanning
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Cloud Storage & Offline Mode</h3>
                <p className="text-gray-600 mb-4">
                  Secure cloud storage with offline capability for inspections in areas without connectivity.
                  Data syncs automatically when connection is restored.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Firebase cloud storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Offline inspection capability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Automatic sync on reconnect
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Secure user authentication
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Unit - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <AdSense
          adSlot="6666666666"
          adFormat="horizontal"
          className="my-8"
          style={{ minHeight: '100px' }}
        />
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and see how Fire Extinguisher Tracker can transform your inspection process.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/app"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-900 transition"
            >
              View Pricing
            </Link>
          </div>
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

export default FeaturesPage;
