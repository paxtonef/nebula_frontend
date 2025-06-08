'use client';

import { Bell, MessageSquare, UserPlus, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
  };
  onClick: () => void;
}

export default function NotificationItem({ notification, onClick }: NotificationItemProps) {
  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'MESSAGE':
        return <MessageSquare size={16} className="text-blue-500" />;
      case 'CONNECTION':
        return <UserPlus size={16} className="text-green-500" />;
      case 'ALERT':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  // Format date
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

  return (
    <div 
      onClick={onClick}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-1">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500 ml-2">
              {formattedDate}
            </span>
          </div>
          <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}
