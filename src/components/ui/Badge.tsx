'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  showZero?: boolean;
  maxCount?: number;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    count,
    showZero = false,
    maxCount = 99,
    dot = false,
    children,
    ...props 
  }, ref) => {
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800 border-gray-200',
      primary: 'bg-blue-100 text-blue-800 border-blue-200',
      secondary: 'bg-purple-100 text-purple-800 border-purple-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-200',
      danger: 'bg-red-100 text-red-800 border-red-200',
      outline: 'bg-transparent border border-gray-300 text-gray-700'
    };

    const sizeStyles = {
      sm: 'text-xs px-1.5 py-0.5 rounded-full',
      md: 'text-xs px-2.5 py-1 rounded-full',
      lg: 'text-sm px-3 py-1.5 rounded-full'
    };

    // Handle count display logic
    const showCount = count !== undefined && (count > 0 || showZero);
    const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;

    // For dot-only badges (no text/count)
    if (dot && !children && count === undefined) {
      return (
        <span 
          ref={ref}
          className={cn(
            'inline-block w-2 h-2 rounded-full',
            variantStyles[variant].split(' ')[0], // Only use background color
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium border',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {showCount && (
          <span className={children ? 'ml-1' : ''}>{displayCount}</span>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
