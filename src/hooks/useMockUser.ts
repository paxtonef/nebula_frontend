'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export interface MockUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface UseMockUserReturn {
  user: MockUser | undefined;
  error: Error | undefined;
  isLoading: boolean;
  checkSession: () => Promise<void>;
}

export function useMockUser(): UseMockUserReturn {
  const [user, setUser] = useState<MockUser | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkSession = async () => {
    try {
      setIsLoading(true);
      
      // Check if we have a mock session cookie
      const hasSession = getCookie('auth_session');
      
      if (hasSession) {
        // Create a mock user
        setUser({
          sub: 'mock-user-id-123',
          name: 'Demo User',
          email: 'demo@example.com',
          picture: 'https://via.placeholder.com/150',
        });
      } else {
        setUser(undefined);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { user, error, isLoading, checkSession };
}
