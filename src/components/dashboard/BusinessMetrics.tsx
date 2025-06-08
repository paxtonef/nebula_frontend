'use client';

import { ArrowUp, ArrowDown, TrendingUp, Users, Star, Eye } from 'lucide-react';

interface MetricProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
}

const Metric = ({ title, value, change, changeType, icon }: MetricProps) => {
  const changeColor = 
    changeType === 'increase' ? 'text-accent-600' : 
    changeType === 'decrease' ? 'text-red-600' : 
    'text-gray-500';
  
  const changeIcon = 
    changeType === 'increase' ? <ArrowUp className="w-3 h-3" /> : 
    changeType === 'decrease' ? <ArrowDown className="w-3 h-3" /> : 
    null;

  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-lg border-l-4 border-primary-500">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className="p-2 bg-primary-100 rounded-lg">
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-2 flex items-center text-sm">
          <span className={`flex items-center ${changeColor}`}>
            {changeIcon}
            <span className="ml-1">{change}</span>
          </span>
          <span className="text-gray-500 text-xs ml-2">vs. last month</span>
        </div>
      )}
    </div>
  );
};

export default function BusinessMetrics() {
  // In a real application, this data would come from an API
  const metrics = [
    {
      title: 'Trust Score',
      value: '78',
      change: '+5',
      changeType: 'increase' as const,
      icon: <Star className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Total Connections',
      value: '24',
      change: '+8',
      changeType: 'increase' as const,
      icon: <Users className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Profile Views',
      value: '142',
      change: '+12%',
      changeType: 'increase' as const,
      icon: <Eye className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Match Quality',
      value: '92%',
      change: '+3%',
      changeType: 'increase' as const,
      icon: <TrendingUp className="h-5 w-5 text-primary-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <Metric
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
