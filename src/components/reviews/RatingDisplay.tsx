'use client';

import * as React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showEmpty?: boolean;
  maxRating?: number;
  className?: string;
  showCount?: boolean;
}

export function RatingDisplay({
  rating,
  reviewCount,
  size = 'md',
  showEmpty = true,
  maxRating = 5,
  className = '',
  showCount = true,
}: RatingDisplayProps) {
  // Size classes for the stars and text
  const sizeClasses = {
    sm: {
      container: 'gap-0.5',
      star: 'w-3 h-3',
      text: 'text-xs',
    },
    md: {
      container: 'gap-1',
      star: 'w-4 h-4',
      text: 'text-sm',
    },
    lg: {
      container: 'gap-1.5',
      star: 'w-5 h-5',
      text: 'text-base',
    },
  };

  // Generate the stars based on the rating
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

    for (let i = 1; i <= maxRating; i++) {
      if (i <= roundedRating) {
        // Full star
        stars.push(
          <Star 
            key={i} 
            className={cn(
              sizeClasses[size].star, 
              'fill-amber-400 text-amber-400'
            )} 
          />
        );
      } else if (i - 0.5 === roundedRating) {
        // Half star
        stars.push(
          <StarHalf 
            key={i} 
            className={cn(
              sizeClasses[size].star, 
              'fill-amber-400 text-amber-400'
            )} 
          />
        );
      } else if (showEmpty) {
        // Empty star
        stars.push(
          <Star 
            key={i} 
            className={cn(
              sizeClasses[size].star, 
              'text-gray-300'
            )} 
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={cn('flex items-center', className)}>
      <div className={cn('flex items-center', sizeClasses[size].container)}>
        {renderStars()}
      </div>
      
      {showCount && reviewCount !== undefined && (
        <span className={cn('ml-2 text-gray-600', sizeClasses[size].text)}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
