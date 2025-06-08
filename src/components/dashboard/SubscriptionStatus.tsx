'use client';

import { CreditCardIcon, CheckCircleIcon, ArrowUpCircleIcon } from '@/components/icons/MockHeroIcons';
import Link from 'next/link';

type PlanType = 'free' | 'basic' | 'pro' | 'enterprise';

interface SubscriptionStatusProps {
  plan?: PlanType;
  expiryDate?: string;
  features?: string[];
}

export default function SubscriptionStatus({ 
  plan = 'basic',
  expiryDate = '2025-12-31',
  features = [
    'Up to 50 connections',
    'Basic business analytics',
    'Standard trust verification',
    'Email support'
  ]
}: SubscriptionStatusProps) {
  
  const planDetails: Record<PlanType, {
    name: string;
    color: string;
    nextPlan: PlanType | null;
  }> = {
    free: {
      name: 'Free',
      color: 'gray',
      nextPlan: 'basic'
    },
    basic: {
      name: 'Basic',
      color: 'primary',
      nextPlan: 'pro'
    },
    pro: {
      name: 'Professional',
      color: 'secondary',
      nextPlan: 'enterprise'
    },
    enterprise: {
      name: 'Enterprise',
      color: 'accent',
      nextPlan: null
    }
  };
  
  const currentPlan = planDetails[plan];
  
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent flex items-center">
          <CreditCardIcon className="h-5 w-5 mr-2 text-primary-600" />
          Subscription Status
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Your current plan and subscription details
        </p>
      </div>
      
      <div className="border-t border-primary-100 px-4 py-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${currentPlan.color}-100 text-${currentPlan.color}-800`}>
                {currentPlan.name} Plan
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Expires: {new Date(expiryDate).toLocaleDateString()}
              </span>
            </div>
            
            <ul className="mt-4 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            {currentPlan.nextPlan && (
              <div className="text-center md:text-right mb-3">
                <p className="text-sm text-gray-600">Recommended upgrade:</p>
                <p className="text-sm font-medium text-primary-600 flex items-center">
                  <ArrowUpCircleIcon className="h-4 w-4 mr-1" />
                  {planDetails[currentPlan.nextPlan].name} Plan
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Link 
                href="/billing" 
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                Manage Billing
              </Link>
              
              {currentPlan.nextPlan && (
                <Link 
                  href="/upgrade" 
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
