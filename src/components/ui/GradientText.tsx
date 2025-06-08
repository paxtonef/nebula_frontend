'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'custom';
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ 
    className, 
    variant = 'blue', 
    from,
    via,
    to,
    animate = false,
    weight = 'bold',
    children,
    ...props 
  }, ref) => {
    // Predefined gradient variants
    const gradientVariants = {
      blue: 'from-blue-600 to-cyan-600',
      purple: 'from-purple-600 to-pink-600',
      cyan: 'from-cyan-500 to-blue-500',
      emerald: 'from-emerald-500 to-teal-500',
      amber: 'from-amber-500 to-orange-500',
      custom: `${from ? `from-${from}` : ''} ${via ? `via-${via}` : ''} ${to ? `to-${to}` : ''}`,
    };

    const fontWeights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    // Animation classes for the gradient
    const animationClass = animate ? 'animate-gradient bg-size-200' : '';

    return (
      <span
        ref={ref}
        className={cn(
          'bg-clip-text text-transparent bg-gradient-to-r',
          gradientVariants[variant],
          fontWeights[weight],
          animationClass,
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = 'GradientText';

export { GradientText };
