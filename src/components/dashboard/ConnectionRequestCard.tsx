'use client';

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';

interface ConnectionRequestCardProps {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  requestDate: string;
  message?: string;
  onAccept: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

export default function ConnectionRequestCard({
  id,
  businessName,
  industry,
  location,
  logoUrl,
  requestDate,
  message,
  onAccept,
  onReject,
}: ConnectionRequestCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept(id);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReject = async () => {
    setIsLoading(true);
    try {
      await onReject(id);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-12 w-12 relative">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={businessName}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {businessName.charAt(0)}
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <div className="text-sm font-medium text-gray-900">{businessName}</div>
          <div className="text-xs text-gray-500">
            {industry} • {location}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Requested {formatDistanceToNow(new Date(requestDate))} ago
          </div>
        </div>
      </div>
      
      {message && (
        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          "{message}"
        </div>
      )}
      
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={handleReject}
          disabled={isLoading}
          className="px-3 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          disabled={isLoading}
          className="px-3 py-1 text-xs bg-primary-600 rounded-md text-white hover:bg-primary-700 disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
