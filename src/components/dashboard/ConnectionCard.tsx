'use client';

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface ConnectionCardProps {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  connectionDate: string;
}

export default function ConnectionCard({
  id,
  businessName,
  industry,
  location,
  logoUrl,
  connectionDate,
}: ConnectionCardProps) {
  return (
    <div className="flex items-center p-4 border-b border-primary-100 hover:bg-primary-50 transition-colors duration-200">
      <div className="flex-shrink-0 h-12 w-12 relative">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={businessName}
            width={48}
            height={48}
            className="rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-primary-600 font-medium shadow-sm">
            {businessName.charAt(0)}
          </div>
        )}
      </div>
      <div className="ml-4 flex-1">
        <Link href={`/businesses/${id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200">
          {businessName}
        </Link>
        <div className="text-xs text-gray-600">
          {industry} • {location}
        </div>
        <div className="text-xs text-primary-400 mt-1">
          Connected {formatDistanceToNow(new Date(connectionDate))} ago
        </div>
      </div>
      <div className="ml-2">
        <Link href={`/messages/${id}`} className="text-xs text-primary-600 hover:text-primary-800">
          Message
        </Link>
      </div>
    </div>
  );
}
