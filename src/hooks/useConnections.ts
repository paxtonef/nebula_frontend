import { useState, useEffect } from 'react';

interface Connection {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  connectionDate: string;
}

interface ConnectionsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ConnectionsData {
  connections: Connection[];
  pagination: PaginationData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Mock API function - replace with actual API call when backend is ready
const fetchConnections = async (params: ConnectionsParams = {}): Promise<{
  connections: Connection[];
  pagination: PaginationData;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  const mockConnections: Connection[] = [
    {
      id: '1',
      businessName: 'TechSolutions GmbH',
      industry: 'Technology',
      location: 'Berlin, Germany',
      logoUrl: 'https://via.placeholder.com/50',
      connectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      businessName: 'EcoFriendly Products',
      industry: 'Manufacturing',
      location: 'Barcelona, Spain',
      logoUrl: 'https://via.placeholder.com/50',
      connectionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      businessName: 'Digital Marketing Pro',
      industry: 'Marketing',
      location: 'Paris, France',
      logoUrl: 'https://via.placeholder.com/50',
      connectionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  const { page = 1, limit = 10 } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedConnections = mockConnections.slice(startIndex, endIndex);
  
  return {
    connections: paginatedConnections,
    pagination: {
      page,
      limit,
      total: mockConnections.length,
      totalPages: Math.ceil(mockConnections.length / limit),
    },
  };
};

export function useConnections(params: ConnectionsParams = {}): ConnectionsData {
  const [connections, setConnections] = useState<Connection[]>([]);
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
      const data = await fetchConnections(params);
      setConnections(data.connections);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch connections'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [params.page, params.limit, params.sortBy]);
  
  return {
    connections,
    pagination,
    isLoading,
    error,
    refetch: fetchData,
  };
}
