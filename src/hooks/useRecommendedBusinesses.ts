import { useState, useEffect } from 'react';

interface RecommendedBusiness {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  matchScore: number;
  description?: string;
}

interface RecommendedBusinessesParams {
  page?: number;
  limit?: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface RecommendedBusinessesData {
  businesses: RecommendedBusiness[];
  pagination: PaginationData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Mock API function - replace with actual API call when backend is ready
const fetchRecommendedBusinesses = async (params: RecommendedBusinessesParams = {}): Promise<{
  businesses: RecommendedBusiness[];
  pagination: PaginationData;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  const mockBusinesses: RecommendedBusiness[] = [
    {
      id: '1',
      businessName: 'Green Energy Solutions',
      industry: 'Renewable Energy',
      location: 'Copenhagen, Denmark',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 92,
      description: 'Specializing in solar and wind energy solutions for businesses.',
    },
    {
      id: '2',
      businessName: 'Logistics Pro',
      industry: 'Transportation',
      location: 'Rotterdam, Netherlands',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 87,
      description: 'European logistics and supply chain management services.',
    },
    {
      id: '3',
      businessName: 'MediTech Innovations',
      industry: 'Healthcare',
      location: 'Milan, Italy',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 85,
      description: 'Medical technology and healthcare solutions provider.',
    },
    {
      id: '4',
      businessName: 'Culinary Exports',
      industry: 'Food & Beverage',
      location: 'Lyon, France',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 81,
      description: 'Exporting fine European foods and beverages worldwide.',
    },
  ];
  
  const { page = 1, limit = 10 } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBusinesses = mockBusinesses.slice(startIndex, endIndex);
  
  return {
    businesses: paginatedBusinesses,
    pagination: {
      page,
      limit,
      total: mockBusinesses.length,
      totalPages: Math.ceil(mockBusinesses.length / limit),
    },
  };
};

export function useRecommendedBusinesses(params: RecommendedBusinessesParams = {}): RecommendedBusinessesData {
  const [businesses, setBusinesses] = useState<RecommendedBusiness[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: params.page || 1,
    limit: params.limit || 10,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchRecommendedBusinesses(params);
      setBusinesses(data.businesses);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recommended businesses'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [params.page, params.limit]);
  
  return {
    businesses,
    pagination,
    isLoading,
    error,
    refetch: fetchData,
  };
}
