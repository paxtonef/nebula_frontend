import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Business, getCurrentBusiness, updateBusiness, uploadBusinessLogo } from '@/services/business.service';

interface UseBusinessProfileReturn {
  business: Business | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<Business>) => Promise<void>;
  uploadLogo: (file: File) => Promise<string>;
  isUpdating: boolean;
  isUploading: boolean;
}

export function useBusinessProfile(): UseBusinessProfileReturn {
  const { data: session, status } = useSession();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const isUserLoading = status === 'loading';

  // Fetch business data when user is loaded
  useEffect(() => {
    if (isUserLoading) return;
    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    async function fetchBusinessData() {
      try {
        setIsLoading(true);
        const response = await getCurrentBusiness();
        setBusiness(response.data);
      } catch (err) {
        console.error('Error fetching business profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to load business profile'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchBusinessData();
  }, [session, isUserLoading]);

  // Update business profile
  const updateProfile = async (data: Partial<Business>) => {
    if (!business) {
      throw new Error('No business profile loaded');
    }

    try {
      setIsUpdating(true);
      const response = await updateBusiness(business.id, data);
      setBusiness(response.data);
    } catch (err) {
      console.error('Error updating business profile:', err);
      throw err instanceof Error ? err : new Error('Failed to update business profile');
    } finally {
      setIsUpdating(false);
    }
  };

  // Upload business logo
  const uploadLogo = async (file: File): Promise<string> => {
    if (!business) {
      throw new Error('No business profile loaded');
    }

    try {
      setIsUploading(true);
      const response = await uploadBusinessLogo(business.id, file);
      
      // Update the business state with the new logo URL
      setBusiness(prev => prev ? { ...prev, logo: response.data.logo } : null);
      
      return response.data.logo;
    } catch (err) {
      console.error('Error uploading logo:', err);
      throw err instanceof Error ? err : new Error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    business,
    isLoading,
    error,
    updateProfile,
    uploadLogo,
    isUpdating,
    isUploading
  };
}
