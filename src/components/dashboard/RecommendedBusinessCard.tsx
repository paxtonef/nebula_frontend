'use client';

import Image from 'next/image';
import Link from 'next/link';

interface RecommendedBusinessCardProps {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  matchScore: number;
  description?: string;
}

export default function RecommendedBusinessCard({
  id,
  businessName,
  industry,
  location,
  logoUrl,
  matchScore,
  description,
}: RecommendedBusinessCardProps) {
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
          <div className="flex justify-between items-center">
            <Link href={`/businesses/${id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600">
              {businessName}
            </Link>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
              {matchScore}% match
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {industry} • {location}
          </div>
        </div>
      </div>
      
      {description && (
        <div className="mt-2 text-sm text-gray-600">
          {description}
        </div>
      )}
      
      <div className="mt-3 flex justify-end">
        <Link 
          href={`/businesses/${id}`}
          className="text-xs text-primary-600 hover:text-primary-800 mr-4"
        >
          View Profile
        </Link>
        <Link 
          href={`/connections/request/${id}`}
          className="text-xs bg-primary-600 px-3 py-1 rounded-md text-white hover:bg-primary-700"
        >
          Connect
        </Link>
      </div>
    </div>
  );
}
