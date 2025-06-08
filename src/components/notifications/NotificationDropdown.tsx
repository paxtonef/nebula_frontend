'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { 
    notifications, 
    isLoading, 
    error, 
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch 
  } = useNotifications({ limit: 5 });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle notification click
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading notifications...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">Failed to load notifications</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={{
                      id: notification.id,
                      title: notification.title,
                      message: notification.message,
                      type: notification.type,
                      read: notification.read,
                      createdAt: notification.created_at
                    }} 
                    onClick={() => handleNotificationClick(notification.id)} 
                  />
                ))}
                {notifications.length > 0 && (
                  <div className="p-2 text-center border-t border-gray-100">
                    <a href="/notifications" className="text-xs text-primary-600 hover:text-primary-800">
                      View all notifications
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
