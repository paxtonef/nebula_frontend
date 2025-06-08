'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

interface BusinessOpportunity {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  logoUrl?: string;
  matchScore: number;
  opportunityType: 'partnership' | 'supplier' | 'client' | 'investor';
  description: string;
}

export default function BusinessOpportunities() {
  // In a real application, this data would come from an API
  const opportunities: BusinessOpportunity[] = [
    {
      id: '1',
      businessName: 'TechSolutions GmbH',
      industry: 'Software Development',
      location: 'Berlin, Germany',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 92,
      opportunityType: 'partnership',
      description: 'Looking for partners in AI and machine learning projects'
    },
    {
      id: '2',
      businessName: 'GreenEnergy Co.',
      industry: 'Renewable Energy',
      location: 'Madrid, Spain',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 87,
      opportunityType: 'client',
      description: 'Seeking software solutions for energy management'
    },
    {
      id: '3',
      businessName: 'FinTech Innovations',
      industry: 'Financial Technology',
      location: 'London, UK',
      logoUrl: 'https://via.placeholder.com/50',
      matchScore: 85,
      opportunityType: 'partnership',
      description: 'Collaboration on blockchain payment solutions'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Business Opportunities
          </h2>
        </div>
        <Link href="/opportunities" className="text-sm text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center">
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="border-t border-primary-100">
        {opportunities.length > 0 ? (
          <div>
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border-b border-primary-100 hover:bg-primary-50 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 relative">
                    {opportunity.logoUrl ? (
                      <Image
                        src={opportunity.logoUrl}
                        alt={opportunity.businessName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-primary-600 font-medium shadow-sm">
                        {opportunity.businessName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <Link href={`/businesses/${opportunity.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200">
                        {opportunity.businessName}
                      </Link>
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {opportunity.matchScore}% match
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {opportunity.industry} • {opportunity.location}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      {opportunity.description}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        {opportunity.opportunityType.charAt(0).toUpperCase() + opportunity.opportunityType.slice(1)}
                      </span>
                      <button className="text-xs text-primary-600 hover:text-primary-800 font-medium">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No business opportunities found</p>
            <p className="mt-2">Complete your profile to get matched with potential partners</p>
            <Link href="/profile" className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
              Complete Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
