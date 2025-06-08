'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrustScore } from '@/components/business/TrustScore';
import { 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  Star, 
  HandshakeIcon, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export interface Activity {
  id: string;
  type: 'connection' | 'message' | 'meeting' | 'review' | 'deal' | 'introduction';
  businessName: string;
  businessId: string;
  timestamp: string | Date;
  description?: string;
  trustScore?: number;
  status?: 'pending' | 'completed' | 'accepted' | 'declined';
}

interface RecentActivityProps {
  activities: Activity[];
  limit?: number;
  showTrustScore?: boolean;
  showViewAll?: boolean;
  className?: string;
  loading?: boolean;
}

export function RecentActivity({
  activities,
  limit = 5,
  showTrustScore = true,
  showViewAll = true,
  className = '',
  loading = false,
}: RecentActivityProps) {
  // Format relative time (e.g., "2 hours ago")
  const getTimeSince = (date: string | Date): string => {
    const now = new Date();
    const activityDate = new Date(date);
    const seconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);
    
    let interval = seconds / 31536000; // seconds in a year
    
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400; // seconds in a day
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60; // seconds in a minute
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  // Get icon based on activity type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'connection':
        return <UserCheck className="w-5 h-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'meeting':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-amber-500" />;
      case 'deal':
        return <HandshakeIcon className="w-5 h-5 text-cyan-500" />;
      case 'introduction':
        return <UserCheck className="w-5 h-5 text-indigo-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get activity text based on type
  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'connection':
        return `Connected with ${activity.businessName}`;
      case 'message':
        return `New message from ${activity.businessName}`;
      case 'meeting':
        return `Meeting scheduled with ${activity.businessName}`;
      case 'review':
        return `New review from ${activity.businessName}`;
      case 'deal':
        return `Deal ${activity.status || 'updated'} with ${activity.businessName}`;
      case 'introduction':
        return `Introduction to ${activity.businessName}`;
      default:
        return activity.description || `Activity with ${activity.businessName}`;
    }
  };

  // Get status badge if applicable
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const variants: Record<string, string> = {
      pending: 'warning',
      completed: 'success',
      accepted: 'success',
      declined: 'danger'
    };
    
    return (
      <Badge 
        variant={variants[status] as any || 'default'} 
        size="sm" 
        className="ml-2"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <Card className={className}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // Filter activities based on limit
  const displayedActivities = activities.slice(0, limit);

  return (
    <Card className={className}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        
        {displayedActivities.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No recent activity to display
          </div>
        ) : (
          <div className="space-y-4">
            {displayedActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="rounded-full bg-gray-100 p-2 flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-900">
                      {getActivityText(activity)}
                    </p>
                    {getStatusBadge(activity.status)}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">
                      {getTimeSince(activity.timestamp)}
                    </p>
                    
                    {showTrustScore && activity.trustScore && (
                      <TrustScore 
                        score={activity.trustScore} 
                        size="sm" 
                        showLabel={false}
                      />
                    )}
                  </div>
                </div>
                
                <Link 
                  href={`/businesses/${activity.businessId}`}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
        
        {showViewAll && activities.length > limit && (
          <div className="mt-4 text-center">
            <Link 
              href="/activity" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all activity
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
