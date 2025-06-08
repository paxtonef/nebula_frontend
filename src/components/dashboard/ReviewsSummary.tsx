'use client';

import { ChatBubbleLeftRightIcon, StarIcon } from '@/components/icons/MockHeroIcons';
import Link from 'next/link';

interface Review {
  id: string;
  businessName: string;
  businessLogo: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSummaryProps {
  title?: string;
  description?: string;
}

export default function ReviewsSummary({ 
  title = "Recent Reviews", 
  description = "Latest feedback from your business connections" 
}: ReviewsSummaryProps) {
  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      businessName: 'TechSolutions GmbH',
      businessLogo: '/logos/tech-solutions.png',
      rating: 5,
      comment: 'Excellent business partner! Very responsive and professional. Looking forward to future collaborations.',
      date: '2 days ago'
    },
    {
      id: '2',
      businessName: 'Finance Group International',
      businessLogo: '/logos/finance-group.png',
      rating: 4,
      comment: 'Good communication and reliable service. Would recommend to others in our network.',
      date: '1 week ago'
    },
    {
      id: '3',
      businessName: 'HealthCare Innovations',
      businessLogo: '/logos/healthcare-innovations.png',
      rating: 5,
      comment: 'Exceptional quality and attention to detail. A valuable addition to our supply chain.',
      date: '2 weeks ago'
    }
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent flex items-center">
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-primary-600" />
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {description}
          </p>
        </div>
        <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
          <span className="text-lg font-bold text-gray-800 mr-1">{averageRating.toFixed(1)}</span>
          <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
        </div>
      </div>
      
      <div className="border-t border-primary-100">
        {reviews.length > 0 ? (
          <div className="divide-y divide-primary-100">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 hover:bg-primary-50 transition-colors duration-150">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {review.businessLogo ? (
                        <img 
                          src={review.businessLogo} 
                          alt={review.businessName} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + review.businessName.charAt(0);
                          }}
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-500">
                          {review.businessName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{review.businessName}</p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon 
                              key={star} 
                              className={`h-3.5 w-3.5 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No reviews yet</p>
            <p className="mt-2">Connect with more businesses to receive reviews</p>
          </div>
        )}
        
        <div className="px-4 py-4 sm:px-6 bg-primary-50 flex justify-between items-center">
          <span className="text-sm text-gray-600">Showing {reviews.length} of {reviews.length} reviews</span>
          <Link href="/reviews" className="text-sm text-primary-600 hover:text-primary-800 transition-colors duration-200">
            View all reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
