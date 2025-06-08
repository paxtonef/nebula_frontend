/**
 * Base API service for making HTTP requests to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * HTTP GET request
 */
export function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * HTTP POST request
 */
export function post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP PUT request
 */
export function put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP PATCH request
 */
export function patch<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP DELETE request
 */
export function del<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * Upload file with multipart/form-data
 */
export async function uploadFile<T>(
  endpoint: string, 
  file: File, 
  fieldName: string = 'file',
  additionalData: Record<string, any> = {},
  options: RequestInit = {}
): Promise<T> {
  const formData = new FormData();
  formData.append(fieldName, file);
  
  // Add any additional form fields
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    headers: {
      // Don't set Content-Type, let the browser set it with the boundary
      ...options.headers,
    },
    body: formData,
  });
}
