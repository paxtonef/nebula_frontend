'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name || 'User profile'}
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-600 text-white">
              {user.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.name}
        </span>
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Your Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
          <Link
            href="/billing"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Billing
          </Link>
          <div className="border-t border-gray-100 mt-1 pt-1">
            <LogoutButton
              className="w-full text-left px-4 py-2 text-sm"
              variant="link"
            />
          </div>
        </div>
      )}
    </div>
  );
}
