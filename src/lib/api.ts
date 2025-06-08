/**
 * API client for the Nebula backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1';

/**
 * Fetch wrapper with authentication and error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for auth
  });

  // Handle API errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));
    
    throw new Error(error.message || `API error: ${response.status}`);
  }

  // Parse JSON response
  return response.json();
}

/**
 * API client for businesses
 */
export const businessesAPI = {
  // Get all businesses with pagination and filtering
  getAll: async (params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    query?: string;
    industry?: string;
    country?: string;
    size?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    // Add params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    return fetchAPI<{
      status: string;
      data: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/businesses?${queryParams.toString()}`);
  },
  
  // Get a single business by ID
  getById: async (id: string) => {
    return fetchAPI<{ status: string; data: any }>(`/businesses/${id}`);
  },
  
  // Create a new business
  create: async (data: any) => {
    return fetchAPI<{ status: string; data: any }>('/businesses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Update a business
  update: async (id: string, data: any) => {
    return fetchAPI<{ status: string; data: any }>(`/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  // Upload a business logo
  uploadLogo: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('logo', file);
    
    return fetchAPI<{ status: string; data: { logo: string } }>(`/businesses/${id}/logo`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type with boundary
    });
  },
};

/**
 * API client for notifications
 */
export const notificationsAPI = {
  // Get all notifications for the current user
  getAll: async (params: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }) => {
    const queryParams = new URLSearchParams();
    
    // Add params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    return fetchAPI<{
      status: string;
      data: any[];
      unreadCount: number;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/notifications?${queryParams.toString()}`);
  },
  
  // Mark a notification as read
  markAsRead: async (id: string) => {
    return fetchAPI<{ status: string; data: any }>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },
  
  // Mark all notifications as read
  markAllAsRead: async () => {
    return fetchAPI<{ status: string; data: any }>('/notifications/read-all', {
      method: 'PUT',
    });
  },
};

/**
 * API client for connections
 */
export const connectionsAPI = {
  // Get all connections for the current user
  getAll: async (params: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    // Add params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    return fetchAPI<{
      status: string;
      data: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/connections?${queryParams.toString()}`);
  },
  
  // Send a connection request
  sendRequest: async (businessId: string) => {
    return fetchAPI<{ status: string; data: any }>('/connections', {
      method: 'POST',
      body: JSON.stringify({ businessId }),
    });
  },
  
  // Accept a connection request
  acceptRequest: async (connectionId: string) => {
    return fetchAPI<{ status: string; data: any }>(`/connections/${connectionId}/accept`, {
      method: 'PUT',
    });
  },
  
  // Reject a connection request
  rejectRequest: async (connectionId: string) => {
    return fetchAPI<{ status: string; data: any }>(`/connections/${connectionId}/reject`, {
      method: 'PUT',
    });
  },
};

/**
 * API client for user profile
 */
export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    return fetchAPI<{ status: string; data: any }>('/auth/profile');
  },
  
  // Update user profile
  updateProfile: async (data: any) => {
    return fetchAPI<{ status: string; data: any }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
