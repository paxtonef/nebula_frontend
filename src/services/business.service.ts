import { get, post, put, del, uploadFile } from './api';

export interface Business {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  country: string;
  city: string;
  website: string;
  email: string;
  phone: string;
  logo: string | null;
  coverImage?: string;
  founded?: string;
  trustScore: number;
  verificationStatus: string;
  createdAt: string;
  updatedAt: string;
  services?: string[];
  certifications?: string[];
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  socialMedia?: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
}

export interface BusinessSearchParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  query?: string;
  industry?: string;
  country?: string;
  city?: string;
  size?: string;
  minTrustScore?: number;
}

export interface BusinessSearchResponse {
  status: string;
  data: Business[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

/**
 * Get all businesses with optional search parameters
 */
export const getAllBusinesses = (params: BusinessSearchParams = {}) => {
  // Convert params to query string
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const endpoint = `/businesses${queryString ? `?${queryString}` : ''}`;
  
  return get<BusinessSearchResponse>(endpoint);
};

/**
 * Get business by ID
 */
export const getBusinessById = (id: string) => {
  return get<{ status: string; data: Business }>(`/businesses/${id}`);
};

/**
 * Get current user's business
 */
export const getCurrentBusiness = () => {
  return get<{ status: string; data: Business }>('/businesses/me');
};

/**
 * Create a new business
 */
export const createBusiness = (businessData: Partial<Business>) => {
  return post<{ status: string; data: Business }>('/businesses', businessData);
};

/**
 * Update business by ID
 */
export const updateBusiness = (id: string, businessData: Partial<Business>) => {
  return put<{ status: string; data: Business }>(`/businesses/${id}`, businessData);
};

/**
 * Delete business by ID
 */
export const deleteBusiness = (id: string) => {
  return del<{ status: string; message: string }>(`/businesses/${id}`);
};

/**
 * Upload business logo
 */
export const uploadBusinessLogo = (id: string, file: File) => {
  return uploadFile<{ status: string; data: { logo: string } }>(
    `/businesses/${id}/logo`,
    file,
    'logo'
  );
};

/**
 * Add service to business
 */
export const addBusinessService = (id: string, service: string) => {
  return post<{ status: string; data: Business }>(`/businesses/${id}/services`, { service });
};

/**
 * Remove service from business
 */
export const removeBusinessService = (id: string, service: string) => {
  return del<{ status: string; data: Business }>(`/businesses/${id}/services/${encodeURIComponent(service)}`);
};

/**
 * Add certification to business
 */
export const addBusinessCertification = (id: string, certification: string) => {
  return post<{ status: string; data: Business }>(`/businesses/${id}/certifications`, { certification });
};

/**
 * Remove certification from business
 */
export const removeBusinessCertification = (id: string, certification: string) => {
  return del<{ status: string; data: Business }>(`/businesses/${id}/certifications/${encodeURIComponent(certification)}`);
};
