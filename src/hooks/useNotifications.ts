import { useState, useEffect } from 'react';
import { notificationsAPI } from '@/lib/api';

interface NotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

interface Notification {
  id: string;
  user_id: string;
  business_id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface NotificationsData {
  notifications: Notification[];
  unreadCount: number;
  pagination: PaginationData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export function useNotifications(params: NotificationsParams = {}): NotificationsData {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch notifications
  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await notificationsAPI.getAll(params);
      setNotifications(response.data);
      setUnreadCount(response.unreadCount);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
      console.error('Error fetching notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to mark a notification as read
  const markAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      
      // Decrement unread count
      setUnreadCount(prevCount => Math.max(0, prevCount - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };
  
  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
      
      // Reset unread count
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  };
  
  // Fetch notifications on mount and when params change
  useEffect(() => {
    fetchNotifications();
  }, [params.page, params.limit, params.unreadOnly]);
  
  return {
    notifications,
    unreadCount,
    pagination,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}
