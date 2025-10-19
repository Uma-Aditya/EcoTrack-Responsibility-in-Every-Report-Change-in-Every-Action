import { Mail, Phone, MapPin, Recycle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-secondary-50 to-primary-50 border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Recycle className="h-8 w-8 text-primary-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full animate-pulse-slow"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                EcoTrack
              </span>
            </div>
            <p className="text-secondary-600 mb-6 max-w-md">
              India’s intelligent waste reporting and recycling coordination system.
              Join your Nagar Nigam in keeping our cities clean and sustainable.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Contact Us (India)</h3>
            <div className="space-y-3">
              <a
                href="mailto:support@ecotrack.in"
                className="flex items-center space-x-3 text-sm text-secondary-600 hover:text-primary-600 transition-colors group"
              >
                <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Mail className="h-4 w-4 text-primary-600" />
                </div>
                <span>support@ecotrack.in</span>
              </a>
              <a
                href="tel:+91 9696966969"
                className="flex items-center space-x-3 text-sm text-secondary-600 hover:text-primary-600 transition-colors group"
              >
                <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Phone className="h-4 w-4 text-primary-600" />
                </div>
                <span>+91 9696966969</span>
              </a>
              <div className="flex items-center space-x-3 text-sm text-secondary-600">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary-600" />
                </div>
                <span>KBC Head Office,Main Road, Kakinada</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                Report Issue
              </a>
              <a href="#" className="block text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                Schedule Pickup
              </a>
              <a href="#" className="block text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                Admin Portal
              </a>
              <a href="#" className="block text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-500">
              &copy; 2025 EcoTrack India. All rights reserved. Your city's smart waste management solution.
            </div>
            <div className="flex items-center space-x-6 text-sm text-secondary-500">
              <span></span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
