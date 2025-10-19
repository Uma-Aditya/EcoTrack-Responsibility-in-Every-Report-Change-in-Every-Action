import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { supabase, WasteType } from '../lib/supabase';

interface SchedulePageProps {
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export function SchedulePage({ onShowToast }: SchedulePageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [wasteType, setWasteType] = useState<WasteType>('Plastic');
  const [wasteVolume, setWasteVolume] = useState('Medium (10-20 kg)');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const wasteTypes: WasteType[] = ['General', 'Plastic', 'Organic', 'E-Waste', 'Hazardous', 'Mixed'];
  const volumeOptions = [
    'Small (< 10 kg)',
    'Medium (10-20 kg)',
    'Large (20-50 kg)',
    'Extra Large (> 50 kg)',
  ];
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
  const detectLocation = () => {
    setDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const addressStr = await reverseGeocode(latitude, longitude);
          if (addressStr) {
            setAddress(addressStr);
            onShowToast('Address detected from your location', 'success');
          } else {
            setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
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

  const generateReferenceNumber = () => {
    const prefix = 'P';
    const number = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${number}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !preferredDate || !preferredTime) {
      onShowToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const referenceNumber = generateReferenceNumber();

      const { data, error } = await supabase
        .from('scheduled_pickups')
        .insert({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          waste_type: wasteType,
          waste_volume: wasteVolume,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          notes: notes.trim() || null,
          reference_number: referenceNumber,
        })
        .select()
        .single();

      if (error) throw error;

      onShowToast(
        `Pickup scheduled successfully! Reference: ${data.reference_number}`,
        'success'
      );

      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setWasteType('Plastic');
      setWasteVolume('Medium (10-20 kg)');
      setPreferredDate('');
      setPreferredTime('');
      setNotes('');
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      onShowToast('Failed to schedule pickup. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Schedule Waste Pickup</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Request a convenient waste collection service. Choose your preferred date, time,
          and waste type for pickup.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abhishek Kumar"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="UzikMazino@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Address <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street, City, State ZIP"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waste Type <span className="text-red-500">*</span>
              </label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value as WasteType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                Waste Volume <span className="text-red-500">*</span>
              </label>
              <select
                value={wasteVolume}
                onChange={(e) => setWasteVolume(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {volumeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={today}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions for the pickup crew..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Scheduling...' : 'Confirm Pickup'}
          </button>
        </form>
      </div>
    </div>
  );
}
