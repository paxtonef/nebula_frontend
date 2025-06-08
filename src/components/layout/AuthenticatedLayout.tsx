'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMockUser } from '../auth/MockUserProvider';
import NotificationDropdown from '../notifications/NotificationDropdown';

// Check if we should use mock authentication
const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Use either Auth0 or mock authentication based on environment variable
  const auth0User = useUser();
  const mockUser = useMockUser();
  
  // Select the appropriate authentication based on environment
  const { user, isLoading } = useMockAuth ? mockUser : auth0User;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Connections', href: '/connections' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                  Nebula
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`${
                      pathname === item.href
                        ? 'border-primary-500 text-primary-700 font-semibold'
                        : 'border-transparent text-primary-500 hover:border-primary-300 hover:text-primary-600'
                    } inline-flex items-center px-3 pt-1 border-b-2 text-sm transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <NotificationDropdown />
              
              <div className="ml-3 relative">
                <div className="flex items-center">
                  {!isLoading && user && (
                    <span className="mr-4 text-sm font-medium text-primary-700">
                      {user.name}
                    </span>
                  )}
                  <Link 
                    href="/api/auth/logout?returnTo=/login" 
                    className="bg-white hover:bg-primary-50 text-primary-600 border border-primary-300 font-medium py-1.5 px-4 rounded-full transition-colors duration-200"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : user ? (
            children
          ) : null}
        </div>
      </main>
    </div>
  );
}
