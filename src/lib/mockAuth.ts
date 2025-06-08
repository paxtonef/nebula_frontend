import { useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Mock user data structure
export interface MockUser {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
  given_name?: string;
  family_name?: string;
  nickname?: string;
  updated_at: string;
}

// Default mock user
const DEFAULT_USER: MockUser = {
  sub: 'auth0|123456789',
  email: 'demo@nebula-mvp.com',
  name: 'Demo User',
  picture: 'https://via.placeholder.com/150',
  email_verified: true,
  given_name: 'Demo',
  family_name: 'User',
  nickname: 'demo',
  updated_at: new Date().toISOString()
};

// Cookie name for storing mock auth state
const AUTH_COOKIE = 'nebula_mock_auth';

// Hook for mock authentication
export function useMockUser() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const cookieValue = getCookie(AUTH_COOKIE);
      if (cookieValue) {
        setUser(JSON.parse(cookieValue as string));
      }
    } catch (err) {
      console.error('Error parsing auth cookie:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    setCookie(AUTH_COOKIE, JSON.stringify(DEFAULT_USER), { maxAge: 60 * 60 * 24 });
    setUser(DEFAULT_USER);
    return Promise.resolve();
  };

  const logout = () => {
    deleteCookie(AUTH_COOKIE);
    setUser(null);
    return Promise.resolve();
  };

  const signup = () => {
    // Same as login for mock implementation
    return login();
  };

  return { user, error, isLoading, login, logout, signup };
}

// Mock API routes for Auth0
export const mockAuthRoutes = {
  login: '/api/mock-auth/login',
  logout: '/api/mock-auth/logout',
  signup: '/api/mock-auth/signup',
  callback: '/api/mock-auth/callback'
};
