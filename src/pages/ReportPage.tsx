import { useState } from 'react';
import { MapPin, Camera, AlertCircle } from 'lucide-react';
import { supabase, WasteType } from '../lib/supabase';

interface ReportPageProps {
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export function ReportPage({ onShowToast }: ReportPageProps) {
  const [location, setLocation] = useState('');
  const [wasteType, setWasteType] = useState<WasteType>('General');
  const [comments, setComments] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  
  const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EcoTrack Demo (contact: support@ecotrack.in)'
        }
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (data && data.display_name) return data.display_name as string;
      return null;
    } catch {
      return null;
    }
  };

  const wasteTypes: WasteType[] = ['General', 'Plastic', 'Organic', 'E-Waste', 'Hazardous'];

  const detectLocation = () => {
    setDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          if (address) {
            setLocation(address);
            onShowToast('Address detected from your location', 'success');
          } else {
            setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
            onShowToast('Location detected (address lookup unavailable)', 'success');
          }
          setDetectingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          onShowToast('Could not detect location. Please enter manually.', 'error');
          setDetectingLocation(false);
        }
      );
    } else {
      onShowToast('Geolocation is not supported by your browser', 'error');
      setDetectingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      onShowToast('Please provide a location', 'error');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('bin_reports')
        .insert({
          location: location.trim(),
          waste_type: wasteType,
          comments: comments.trim() || null,
          reporter_email: reporterEmail.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      onShowToast(`Report submitted successfully! ID: #${data.id.slice(0, 8)}`, 'success');

      setLocation('');
      setWasteType('General');
      setComments('');
      setReporterEmail('');
    } catch (error) {
      console.error('Error submitting report:', error);
      onShowToast('Failed to submit report. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Report Overflowing Bin and Pot Holes</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Help us keep the community clean by reporting overflowing bins or waste issues.
          Your report will be reviewed by municipal staff.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter address or location description"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={detectingLocation}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <MapPin className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Click the map pin to auto-detect your location
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Type <span className="text-red-500">*</span>
            </label>
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value as WasteType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {wasteTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo (Optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload photo</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={reporterEmail}
              onChange={(e) => setReporterEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Provide your email if you'd like updates on this report
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe the issue in more detail..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
