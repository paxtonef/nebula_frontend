import { useState, useEffect } from 'react';

interface ConnectionRequest {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  requestDate: string;
  message?: string;
}

interface ConnectionRequestsParams {
  page?: number;
  limit?: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ConnectionRequestsData {
  requests: ConnectionRequest[];
  pagination: PaginationData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  acceptRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => Promise<void>;
}

// Mock API function - replace with actual API call when backend is ready
const fetchConnectionRequests = async (params: ConnectionRequestsParams = {}): Promise<{
  requests: ConnectionRequest[];
  pagination: PaginationData;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  const mockRequests: ConnectionRequest[] = [
    {
      id: '1',
      businessName: 'Nordic Innovations',
      industry: 'Research & Development',
      location: 'Stockholm, Sweden',
      logoUrl: 'https://via.placeholder.com/50',
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'We would like to connect with your business to explore potential collaboration opportunities.',
    },
    {
      id: '2',
      businessName: 'Alpine Software',
      industry: 'Software Development',
      location: 'Zurich, Switzerland',
      logoUrl: 'https://via.placeholder.com/50',
      requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'Looking to partner with businesses in your industry.',
    },
  ];
  
  const { page = 1, limit = 10 } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRequests = mockRequests.slice(startIndex, endIndex);
  
  return {
    requests: paginatedRequests,
    pagination: {
      page,
      limit,
      total: mockRequests.length,
      totalPages: Math.ceil(mockRequests.length / limit),
    },
  };
};

// Mock API functions for accepting/rejecting requests
const acceptConnectionRequest = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Accepted connection request with ID: ${id}`);
};

const rejectConnectionRequest = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Rejected connection request with ID: ${id}`);
};

export function useConnectionRequests(params: ConnectionRequestsParams = {}): ConnectionRequestsData {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
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
      const data = await fetchConnectionRequests(params);
      setRequests(data.requests);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch connection requests'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [params.page, params.limit]);
  
  const acceptRequest = async (id: string) => {
    try {
      await acceptConnectionRequest(id);
      // Remove the accepted request from the list
      setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / prev.limit),
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to accept connection request'));
    }
  };
  
  const rejectRequest = async (id: string) => {
    try {
      await rejectConnectionRequest(id);
      // Remove the rejected request from the list
      setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / prev.limit),
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reject connection request'));
    }
  };
  
  return {
    requests,
    pagination,
    isLoading,
    error,
    refetch: fetchData,
    acceptRequest,
    rejectRequest,
  };
}
