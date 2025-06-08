'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data for the charts
const connectionData = [
  { month: 'Jan', connections: 4 },
  { month: 'Feb', connections: 6 },
  { month: 'Mar', connections: 8 },
  { month: 'Apr', connections: 10 },
  { month: 'May', connections: 12 },
  { month: 'Jun', connections: 16 },
];

const industryData = [
  { name: 'Technology', value: 35 },
  { name: 'Finance', value: 25 },
  { name: 'Healthcare', value: 20 },
  { name: 'Manufacturing', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#d935ff', '#14f024', '#FF8042', '#8884d8'];

export default function BusinessAnalytics() {
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Business Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Performance insights and connection statistics
        </p>
      </div>
      
      <div className="border-t border-primary-100 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connection Growth Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Connection Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={connectionData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }} 
                  />
                  <Bar 
                    dataKey="connections" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1aa7ff" stopColor="#d935ff" />
                      <stop offset="100%" stopColor="#0086f0" stopColor="#c217eb" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Industry Distribution Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Industry Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
