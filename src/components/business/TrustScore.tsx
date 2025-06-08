'use client';

import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface TrustScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function TrustScore({
  score,
  size = 'md',
  showLabel = true,
  className = '',
}: TrustScoreProps) {
  // Define size classes first so they can be used in the icon components
  const sizeClasses = {
    sm: {
      container: 'text-xs',
      icon: 'w-3 h-3 mr-1',
      score: 'text-sm font-medium',
    },
    md: {
      container: 'text-sm',
      icon: 'w-4 h-4 mr-1',
      score: 'text-base font-medium',
    },
    lg: {
      container: 'text-base',
      icon: 'w-5 h-5 mr-2',
      score: 'text-lg font-semibold',
    },
  };

  // Calculate the color based on the score
  let color = '';
  let icon = null;
  let label = '';

  if (score >= 80) {
    color = 'text-green-600';
    icon = <ShieldCheck className={sizeClasses[size].icon} />;
    label = 'High Trust';
  } else if (score >= 50) {
    color = 'text-yellow-600';
    icon = <Shield className={sizeClasses[size].icon} />;
    label = 'Medium Trust';
  } else {
    color = 'text-red-600';
    icon = <ShieldAlert className={sizeClasses[size].icon} />;
    label = 'Low Trust';
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center ${color}`}>
        {icon}
        <span className={sizeClasses[size].score}>{score}</span>
      </div>
      {showLabel && (
        <span className={`ml-1.5 text-gray-500 ${sizeClasses[size].container}`}>
          {label}
        </span>
      )}
    </div>
  );
}
