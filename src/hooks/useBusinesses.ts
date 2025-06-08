import { useState, useEffect } from 'react';
import { getAllBusinesses, getBusinessById } from '../services/business.service';

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await getAllBusinesses();
        setBusinesses(response.data || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch businesses');
      } finally {
        setLoading(false);
      }
    }
    fetchBusinesses();
  }, []);

  return { businesses, loading, error };
};

export function useBusinessDetail(id: string) {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchBusinessDetail() {
      if (!id) return;
      
      try {
        const response = await getBusinessById(id);
        setBusiness(response.data || null);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch business details');
        console.error('Error fetching business details:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBusinessDetail();
  }, [id]);
  
  return { business, loading, error };
}
