'use client';

import Link from 'next/link';
import { CheckCircle, Circle } from 'lucide-react';

interface ProfileStep {
  id: string;
  label: string;
  completed: boolean;
  href: string;
}

interface ProfileCompletionProps {
  steps: ProfileStep[];
}

export default function ProfileCompletion({ steps }: ProfileCompletionProps) {
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Profile Completion</h2>
        <span className="text-sm font-medium text-primary-600">
          {completionPercentage}% Complete
        </span>
      </div>
      <div className="border-t border-primary-100 px-4 py-5 sm:p-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full shadow-inner" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-accent-500" />
              ) : (
                <Circle className="h-5 w-5 text-secondary-200" />
              )}
              <Link 
                href={step.href}
                className={`ml-3 text-sm ${step.completed ? 'text-gray-500' : 'text-secondary-600 font-medium hover:text-secondary-700 transition-colors'}`}
              >
                {step.label}
              </Link>
            </div>
          ))}
        </div>
        
        {completionPercentage < 100 && (
          <div className="mt-6">
            <Link
              href="/profile"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Complete Your Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
