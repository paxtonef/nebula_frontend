'use client';

import { Bell, MessageSquare, Check, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'connection_request' | 'message' | 'system' | 'profile_view';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  businessId?: string;
  businessName?: string;
  businessLogo?: string;
}

export default function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  // In a real application, this data would come from an API
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'connection_request',
      title: 'New Connection Request',
      content: 'TechSolutions GmbH wants to connect with you',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      businessId: '1',
      businessName: 'TechSolutions GmbH',
      businessLogo: 'https://via.placeholder.com/40'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      content: 'You received a new message from FinTech Innovations',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: false,
      businessId: '3',
      businessName: 'FinTech Innovations',
      businessLogo: 'https://via.placeholder.com/40'
    },
    {
      id: '3',
      type: 'profile_view',
      title: 'Profile View',
      content: 'GreenEnergy Co. viewed your profile',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      businessId: '2',
      businessName: 'GreenEnergy Co.',
      businessLogo: 'https://via.placeholder.com/40'
    },
    {
      id: '4',
      type: 'system',
      title: 'Trust Score Update',
      content: 'Your trust score increased to 78',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
  
  const displayedNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'connection_request':
        return <div className="p-2 bg-secondary-100 rounded-full"><Bell className="h-4 w-4 text-secondary-600" /></div>;
      case 'message':
        return <div className="p-2 bg-primary-100 rounded-full"><MessageSquare className="h-4 w-4 text-primary-600" /></div>;
      case 'profile_view':
        return <div className="p-2 bg-accent-100 rounded-full"><Check className="h-4 w-4 text-accent-600" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full"><Bell className="h-4 w-4 text-gray-600" /></div>;
    }
  };
  
  const markAsRead = (id: string) => {
    // In a real application, this would call an API
    console.log(`Marking notification ${id} as read`);
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-secondary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-secondary-600 mr-2" />
          <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-secondary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            className={`text-xs px-2 py-1 rounded-full ${activeTab === 'all' ? 'bg-secondary-100 text-secondary-800' : 'text-gray-600 hover:text-secondary-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`text-xs px-2 py-1 rounded-full ${activeTab === 'unread' ? 'bg-secondary-100 text-secondary-800' : 'text-gray-600 hover:text-secondary-600'}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>
      </div>
      
      <div className="border-t border-secondary-100">
        {displayedNotifications.length > 0 ? (
          <div className="divide-y divide-secondary-100">
            {displayedNotifications.map((notification) => (
              <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-secondary-50' : ''} hover:bg-secondary-50 transition-colors duration-200`}>
                <div className="flex items-start">
                  {notification.businessLogo ? (
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={notification.businessLogo}
                        alt={notification.businessName || ''}
                        width={40}
                        height={40}
                        className="rounded-full object-cover shadow-sm"
                      />
                    </div>
                  ) : (
                    getNotificationIcon(notification.type)
                  )}
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.timestamp))} ago
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.content}</p>
                    <div className="mt-2 flex justify-between items-center">
                      {notification.businessId && (
                        <Link 
                          href={`/businesses/${notification.businessId}`}
                          className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                        >
                          View Profile
                        </Link>
                      )}
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No notifications</p>
          </div>
        )}
        
        <div className="p-4 border-t border-secondary-100 bg-white">
          <Link 
            href="/notifications"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-gradient-to-r from-secondary-500 to-primary-500 hover:from-secondary-600 hover:to-primary-600 shadow-sm transition-all duration-200"
          >
            View All Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
