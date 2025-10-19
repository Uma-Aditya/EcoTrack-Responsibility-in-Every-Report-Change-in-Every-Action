import { Camera, Truck, Shield, Star, Users, MapPin, Clock, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full -translate-y-48 translate-x-48 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-300 rounded-full translate-y-40 -translate-x-40 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-soft border border-primary-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary-700">System Online</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                Welcome to EcoTrack
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-secondary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your city's intelligent waste reporting and recycling coordination system.
              <br />
              <span className="text-primary-600 font-semibold">Help keep our community clean and sustainable.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => onNavigate('report')}
                className="group inline-flex items-center justify-center space-x-3 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-strong hover:shadow-stronger"
              >
                <Camera className="h-6 w-6 group-hover:animate-bounce-gentle" />
                <span className="text-lg">Report Overflowing Bin</span>
              </button>

              <button
                onClick={() => onNavigate('schedule')}
                className="group inline-flex items-center justify-center space-x-3 px-10 py-5 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all transform hover:scale-105 shadow-soft hover:shadow-medium"
              >
                <Truck className="h-6 w-6 group-hover:animate-bounce-gentle" />
                <span className="text-lg">Schedule Waste Pickup</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-primary-200/50">
                <div className="text-3xl font-bold text-primary-600 mb-2">43</div>
                <div className="text-secondary-600">Reports Resolved</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-primary-200/50">
                <div className="text-3xl font-bold text-primary-600 mb-2">47</div>
                <div className="text-secondary-600">Pickups Scheduled</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-primary-200/50">
                <div className="text-3xl font-bold text-primary-600 mb-2">45%</div>
                <div className="text-secondary-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            How EcoTrack Works
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Simple, efficient, and designed for the modern city
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group text-center p-8 bg-white rounded-2xl shadow-soft border border-gray-200/50 hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Camera className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
              Quick Reporting
            </h3>
            <p className="text-secondary-600 leading-relaxed">
              Snap a photo and report overflowing bins or waste issues in seconds.
              Help us respond faster to community needs with our intelligent reporting system.
            </p>
          </div>

          <div className="group text-center p-8 bg-white rounded-2xl shadow-soft border border-gray-200/50 hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
              Flexible Scheduling
            </h3>
            <p className="text-secondary-600 leading-relaxed">
              Schedule pickups for different waste types at your convenience.
              Choose your preferred date and time with our smart scheduling system.
            </p>
          </div>

          <div className="group text-center p-8 bg-white rounded-2xl shadow-soft border border-gray-200/50 hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
              Efficient Management
            </h3>
            <p className="text-secondary-600 leading-relaxed">
              Municipal staff can efficiently track, manage, and respond to all
              citizen reports and requests with our comprehensive dashboard.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-3xl p-12 border border-primary-200/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Why Choose EcoTrack?
            </h2>
            <p className="text-xl text-secondary-600">
              Built for communities, designed for efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">24/7 Available</h3>
              <p className="text-secondary-600 text-sm">Report issues anytime, anywhere</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Location Tracking</h3>
              <p className="text-secondary-600 text-sm">Precise location-based reporting</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Community Driven</h3>
              <p className="text-secondary-600 text-sm">Built by and for the community</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Verified Results</h3>
              <p className="text-secondary-600 text-sm">Track resolution progress</p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-200/50 p-12 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-medium text-secondary-900 mb-6">
              "EcoTrack has transformed how our city manages waste. 
              Resolution time improved by 70% and citizen satisfaction is at an all-time high across wards."
            </blockquote>
            <div className="text-secondary-600">
              <div className="font-semibold">Uma Aditya</div>
              <div className="text-sm">Municipal Commissioner, Kokanada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
