// src/app/dashboard/page.tsx - Dashboard with Real API Integration
'use client';

import { useState, useEffect } from 'react';
import { getAllBusinesses } from '../../services/business.service';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Bell, 
  Search, 
  Plus,
  Shield,
  Star,
  MessageCircle,
  BarChart3,
  UserPlus,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Target,
  Award,
  Activity
} from 'lucide-react';

// Mock data for features not yet connected to API
const mockBusinessProfile = {
  business_id: 'bus_123',
  name: 'Tech Solutions Ltd',
  description: 'Innovative software solutions for European SMEs',
  industry: 'Technology',
  size: 'small',
  country: 'France',
  city: 'Paris',
  trust_score: 85,
  founded: '2020',
  employees: '25-50'
};

const mockConnections = [
  {
    connection_id: 'conn_1',
    business_name: 'Green Energy Solutions',
    contact_name: 'Maria Rodriguez',
    industry: 'Renewable Energy',
    location: 'Madrid, Spain',
    connection_date: '2024-05-15',
    status: 'active',
    avatar: '/api/placeholder/40/40'
  }
];

const mockConnectionRequests = [
  {
    request_id: 'req_1',
    business_name: 'Nordic Tech Innovations',
    contact_name: 'Lars Andersen',
    industry: 'Software',
    location: 'Stockholm, Sweden',
    message: 'Interested in potential collaboration on AI projects',
    date: '2024-06-01',
    avatar: '/api/placeholder/40/40'
  }
];

const mockReviews = [
  {
    review_id: 'rev_1',
    reviewer_name: 'Carmen Silva',
    reviewer_business: 'Portuguese Imports Ltd',
    rating: 5,
    comment: 'Excellent service and very professional team',
    date: '2024-05-20'
  }
];

export default function Dashboard() {
  // State for real API data
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load real business data from API
  useEffect(() => {
    async function loadBusinesses() {
      try {
        setLoading(true);
        const response = await getAllBusinesses({ limit: 6 }); // Get first 6 for display
        setBusinesses(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load businesses:', err);
        setError('Failed to load business data');
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Nebula Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search businesses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'businesses', label: 'Businesses', icon: Building },
            { id: 'connections', label: 'Connections', icon: Users },
            { id: 'messages', label: 'Messages', icon: MessageCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Connections</p>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trust Score</p>
                    <p className="text-3xl font-bold text-gray-900">{mockBusinessProfile.trust_score}</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-4 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">Excellent rating</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                    <p className="text-3xl font-bold text-gray-900">{mockConnectionRequests.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-4 flex items-center">
                  <UserPlus className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-500">2 new this week</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-3xl font-bold text-gray-900">128</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8% from last week</span>
                </div>
              </div>
            </div>

            {/* Recommended Businesses - Using Real API Data */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Available Businesses</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
                <p className="text-gray-600 mt-1">Businesses you can connect with</p>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading businesses...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-2 text-blue-600 hover:text-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.map((business) => (
                      <div key={business.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {business.name}
                            </h3>
                            <p className="text-sm text-gray-600">{business.industry}</p>
                            <div className="flex items-center mt-2">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{business.location}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Shield className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm text-gray-600">Trust Score: {business.trustScore}</span>
                              {business.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Connect
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Connection Requests */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Pending Connection Requests</h2>
                <p className="text-gray-600 mt-1">Review and respond to incoming requests</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {mockConnectionRequests.map((request) => (
                  <div key={request.request_id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{request.business_name}</h3>
                        <p className="text-sm text-gray-600">{request.contact_name} • {request.industry}</p>
                        <p className="text-sm text-gray-500 mt-1">{request.message}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Accept
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tab contents would go here */}
        {activeTab === 'businesses' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Businesses</h2>
            <p className="text-gray-600">Business directory content would go here...</p>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Connections</h2>
            <p className="text-gray-600">Connection management content would go here...</p>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
            <p className="text-gray-600">Messaging interface would go here...</p>
          </div>
        )}
      </main>
    </div>
  );
}
