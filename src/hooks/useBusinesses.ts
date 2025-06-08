import { useState, useEffect } from 'react';
import { businessesAPI } from '@/lib/api';

interface BusinessesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  query?: string;
  industry?: string;
  country?: string;
  size?: string;
}

interface Business {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  country: string;
  city: string;
  logo: string;
  trustScore: number;
  verificationStatus: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BusinessesData {
  businesses: Business[];
  pagination: PaginationData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useBusinesses(params: BusinessesParams = {}): BusinessesData {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch businesses
  const fetchBusinesses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await businessesAPI.getAll(params);
      setBusinesses(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch businesses'));
      console.error('Error fetching businesses:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch businesses on mount and when params change
  useEffect(() => {
    fetchBusinesses();
  }, [
    params.page,
    params.limit,
    params.sortBy,
    params.sortOrder,
    params.query,
    params.industry,
    params.country,
    params.size,
  ]);
  
  return {
    businesses,
    pagination,
    isLoading,
    error,
    refetch: fetchBusinesses,
  };
}

export function useBusinessDetail(id: string) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch business details
  const fetchBusinessDetail = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await businessesAPI.getById(id);
      setBusiness(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch business details'));
      console.error('Error fetching business details:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch business details on mount
  useEffect(() => {
    if (id) {
      fetchBusinessDetail();
    }
  }, [id]);
  
  return {
    business,
    isLoading,
    error,
    refetch: fetchBusinessDetail,
  };
}
