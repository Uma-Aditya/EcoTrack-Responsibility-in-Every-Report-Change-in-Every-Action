import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  LogOut, 
  AlertCircle, 
  Calendar, 
  Filter, 
  TrendingUp, 
  
  Clock,
  MapPin,
  BarChart3,
  RefreshCw,
  Eye,
  Edit3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BinReport, ScheduledPickup, ReportStatus, PickupStatus } from '../lib/supabase';

interface AdminDashboardPageProps {
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onNavigate: (page: string) => void;
}

export function AdminDashboardPage({ onShowToast, onNavigate }: AdminDashboardPageProps) {
  const { adminUser, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'pickups'>('overview');
  const [reports, setReports] = useState<BinReport[]>([]);
  const [pickups, setPickups] = useState<ScheduledPickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!adminUser) {
      onNavigate('admin-login');
      return;
    }
    fetchData();
  }, [adminUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock data for testing without Supabase
      const mockReports: BinReport[] = [
        {
          id: '1',
          location: 'Venkat Nagar, Kakinada',
          waste_type: 'Plastic',
          status: 'Pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          location: 'valasapakala, Kakinada',
          waste_type: 'General',
          status: 'In Progress',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          location: 'MulaPet, Kakinada',
          waste_type: 'Organic',
          status: 'Resolved',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      const mockPickups: ScheduledPickup[] = [
        {
          id: '1',
          name: 'Yesebuu Reddy',
          email: 'Yesu.Reddy@example.in',
          phone: '+919876543210',
          address: '12 MG Road, Kakinada',
          waste_type: 'Plastic',
          waste_volume: 'Medium',
          preferred_date: new Date().toISOString().split('T')[0],
          preferred_time: '10:00',
          status: 'Pending',
          reference_number: 'PCK-001',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Aman DomaRaju',
          email: 'Tirupathi@example.in',
          phone: '+919812345678',
          address: '56 Lodhi Road, Sarpavaram, Kakinada',
          waste_type: 'General',
          waste_volume: 'Large',
          preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          preferred_time: '14:00',
          status: 'Scheduled',
          reference_number: 'PCK-002',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Karthik Erigaisi',
          email: 'Erigaisi@example.in',
          phone: '+918700112233',
          address: '21 DD,Hema Nagar, Kakinada',
          waste_type: 'E-Waste',
          waste_volume: 'Small',
          preferred_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          preferred_time: '09:00',
          status: 'Completed',
          reference_number: 'PCK-003',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setReports(mockReports);
      setPickups(mockPickups);
    } catch (error) {
      console.error('Error fetching data:', error);
      onShowToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
    onShowToast('Data refreshed successfully', 'success');
  };

  const handleSignOut = async () => {
    await signOut();
    onShowToast('Signed out successfully', 'success');
    onNavigate('home');
  };

  const updateReportStatus = async (id: string, status: ReportStatus) => {
    try {
      // Mock update - just update local state
      setReports((prev) =>
        prev.map((report) => (report.id === id ? { ...report, status, updated_at: new Date().toISOString() } : report))
      );
      onShowToast('Report status updated', 'success');
    } catch (error) {
      console.error('Error updating report:', error);
      onShowToast('Failed to update report status', 'error');
    }
  };

  const updatePickupStatus = async (id: string, status: PickupStatus) => {
    try {
      // Mock update - just update local state
      setPickups((prev) =>
        prev.map((pickup) => (pickup.id === id ? { ...pickup, status, updated_at: new Date().toISOString() } : pickup))
      );
      onShowToast('Pickup status updated', 'success');
    } catch (error) {
      console.error('Error updating pickup:', error);
      onShowToast('Failed to update pickup status', 'error');
    }
  };

  const filteredReports = reports.filter(
    (report) => statusFilter === 'All' || report.status === statusFilter
  );

  const filteredPickups = pickups.filter(
    (pickup) => statusFilter === 'All' || pickup.status === statusFilter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  // Calculate statistics
  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter(r => r.status === 'Pending').length,
    resolvedReports: reports.filter(r => r.status === 'Resolved').length,
    totalPickups: pickups.length,
    pendingPickups: pickups.filter(p => p.status === 'Pending').length,
    completedPickups: pickups.filter(p => p.status === 'Completed').length,
    inProgressPickups: pickups.filter(p => p.status === 'In Progress').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <div className="text-secondary-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-secondary-600 mt-2 text-lg">
              Welcome back, {adminUser?.full_name || 'Admin'} 👋
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-secondary-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all shadow-soft border border-gray-200"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all shadow-soft border border-red-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-soft border border-gray-200/50 p-6 hover:shadow-medium transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Reports</p>
                <p className="text-3xl font-bold text-secondary-900">{stats.totalReports}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">{stats.resolvedReports} resolved</span>
              <span className="text-secondary-400 mx-2">•</span>
              <span className="text-yellow-600 font-medium">{stats.pendingReports} pending</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border border-gray-200/50 p-6 hover:shadow-medium transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Scheduled Pickups</p>
                <p className="text-3xl font-bold text-secondary-900">{stats.totalPickups}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">{stats.completedPickups} completed</span>
              <span className="text-secondary-400 mx-2">•</span>
              <span className="text-blue-600 font-medium">{stats.inProgressPickups} in progress</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border border-gray-200/50 p-6 hover:shadow-medium transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Pending Tasks</p>
                <p className="text-3xl font-bold text-secondary-900">{stats.pendingReports + stats.pendingPickups}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">Requires attention</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border border-gray-200/50 p-6 hover:shadow-medium transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Completion Rate</p>
                <p className="text-3xl font-bold text-secondary-900">
                  {stats.totalReports + stats.totalPickups > 0 
                    ? Math.round(((stats.resolvedReports + stats.completedPickups) / (stats.totalReports + stats.totalPickups)) * 100)
                    : 0}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">Overall performance</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-200/50 mb-6">
          <div className="border-b border-gray-200/50">
            <div className="flex space-x-8 px-6">
              {([
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'reports', label: 'Bin Reports', icon: AlertCircle, count: reports.length },
                { id: 'pickups', label: 'Pickups', icon: Calendar, count: pickups.length },
              ] as { id: 'overview' | 'reports' | 'pickups'; label: string; icon: LucideIcon; count?: number }[]).map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setStatusFilter('All');
                  }}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                    {count !== undefined && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === id 
                          ? 'bg-primary-100 text-primary-600' 
                          : 'bg-secondary-100 text-secondary-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Reports */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-orange-800">Recent Reports</h3>
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="space-y-3">
                      {reports.slice(0, 3).map((report) => (
                        <div key={report.id} className="bg-white/70 rounded-lg p-3 border border-orange-200/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-secondary-900 text-sm">{report.location}</p>
                              <p className="text-xs text-secondary-600">{formatDate(report.created_at)}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Pickups */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-800">Recent Pickups</h3>
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                      {pickups.slice(0, 3).map((pickup) => (
                        <div key={pickup.id} className="bg-white/70 rounded-lg p-3 border border-blue-200/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-secondary-900 text-sm">{pickup.name}</p>
                              <p className="text-xs text-secondary-600">{formatDate(pickup.preferred_date)}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(pickup.status)}`}>
                              {pickup.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'reports' || activeTab === 'pickups') && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Filter className="h-5 w-5 text-secondary-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-soft"
                    >
                      <option value="All">All Status</option>
                      {activeTab === 'reports' ? (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </>
                      ) : (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </>
                      )}
                    </select>
                    <span className="text-sm text-secondary-500">
                      Showing {activeTab === 'reports' ? filteredReports.length : filteredPickups.length}{' '}
                      {statusFilter !== 'All' ? statusFilter.toLowerCase() : ''} items
                    </span>
                  </div>
                </div>

                {activeTab === 'reports' ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-secondary-50 to-primary-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Waste Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReports.map((report) => (
                          <tr key={report.id} className="hover:bg-primary-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-secondary-900">
                              #{report.id.slice(0, 8)}
                            </td>
                            <td className="px-6 py-4 text-sm text-secondary-900">
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-secondary-400" />
                                <span>{report.location}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800">
                                {report.waste_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                              {formatDate(report.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={report.status}
                                onChange={(e) =>
                                  updateReportStatus(report.id, e.target.value as ReportStatus)
                                }
                                className={`px-3 py-1 text-xs font-medium rounded-full border cursor-pointer transition-all ${getStatusColor(report.status)}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-primary-600 hover:text-primary-800 transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-secondary-600 hover:text-secondary-800 transition-colors">
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredReports.length === 0 && (
                      <div className="text-center py-12 text-secondary-500">
                        <AlertCircle className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                        <p className="text-lg font-medium">No reports found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-secondary-50 to-primary-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Reference
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Waste Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Volume
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPickups.map((pickup) => (
                          <tr key={pickup.id} className="hover:bg-primary-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-secondary-900">
                              {pickup.reference_number}
                            </td>
                            <td className="px-6 py-4 text-sm text-secondary-900">
                              <div>
                                <div className="font-medium">{pickup.name}</div>
                                <div className="text-xs text-secondary-500">{pickup.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800">
                                {pickup.waste_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              {pickup.waste_volume}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              <div>{formatDate(pickup.preferred_date)}</div>
                              <div className="text-xs text-secondary-500">
                                {formatTime(pickup.preferred_time)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={pickup.status}
                                onChange={(e) =>
                                  updatePickupStatus(pickup.id, e.target.value as PickupStatus)
                                }
                                className={`px-3 py-1 text-xs font-medium rounded-full border cursor-pointer transition-all ${getStatusColor(pickup.status)}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-primary-600 hover:text-primary-800 transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-secondary-600 hover:text-secondary-800 transition-colors">
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredPickups.length === 0 && (
                      <div className="text-center py-12 text-secondary-500">
                        <Calendar className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                        <p className="text-lg font-medium">No pickups found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
