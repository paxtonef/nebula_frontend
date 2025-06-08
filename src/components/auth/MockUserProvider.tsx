'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

// Storage key for storing mock auth state
const AUTH_STORAGE_KEY = 'nebula_mock_auth';

// Context type
interface MockUserContextType {
  user: MockUser | null;
  error: Error | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Create context
const MockUserContext = createContext<MockUserContextType>({
  user: null,
  error: null,
  isLoading: true,
  checkSession: async () => {},
  login: async () => {},
  logout: async () => {}
});

// Provider props
interface MockUserProviderProps {
  children: ReactNode;
}

// Provider component
export function MockUserProvider({ children }: MockUserProviderProps) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      // Use localStorage instead of cookies for client-side storage
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Error checking mock auth session:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Login function
  const login = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
        setUser(DEFAULT_USER);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Error during mock login:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Error during mock logout:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <MockUserContext.Provider value={{ user, error, isLoading, checkSession, login, logout }}>
      {children}
    </MockUserContext.Provider>
  );
}

// Hook to use the mock user context
export function useMockUser() {
  const context = useContext(MockUserContext);
  
  if (context === undefined) {
    throw new Error('useMockUser must be used within a MockUserProvider');
  }
  
  return context;
}
