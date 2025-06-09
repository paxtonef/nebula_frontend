'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradienttext';
import { Crown, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export interface UpgradePromptProps {
  feature?: 'advanced-analytics' | 'unlimited-connections' | 'ai-recommendations' | 'export-data' | 'priority-support';
  currentPlan?: 'free' | 'basic' | 'pro';
  className?: string;
  compact?: boolean;
  showFeatures?: boolean;
}

export function UpgradePrompt({
  feature = 'advanced-analytics',
  currentPlan = 'free',
  className = '',
  compact = false,
  showFeatures = true,
}: UpgradePromptProps) {
  // Feature-specific content
  const featureContent = {
    'advanced-analytics': {
      title: 'Unlock Advanced Analytics',
      description: 'Get deeper insights into your business network with advanced analytics and reporting.',
      icon: <Crown className="w-5 h-5" />,
      cta: 'Upgrade for Analytics',
      features: [
        'Network growth trends',
        'Trust score analytics',
        'Connection quality metrics',
        'Custom reports and exports'
      ]
    },
    'unlimited-connections': {
      title: 'Remove Connection Limits',
      description: 'Connect with unlimited businesses and expand your network without restrictions.',
      icon: <Lock className="w-5 h-5" />,
      cta: 'Unlock Unlimited',
      features: [
        'Unlimited business connections',
        'Unlimited introduction requests',
        'Advanced filtering and search',
        'Bulk connection management'
      ]
    },
    'ai-recommendations': {
      title: 'AI-Powered Recommendations',
      description: 'Get personalized business recommendations powered by our advanced AI algorithm.',
      icon: <Crown className="w-5 h-5" />,
      cta: 'Unlock AI Features',
      features: [
        'Personalized business matches',
        'Opportunity predictions',
        'Smart introduction suggestions',
        'Industry-specific insights'
      ]
    },
    'export-data': {
      title: 'Export Your Data',
      description: 'Export your network data and insights to use in other business tools.',
      icon: <Lock className="w-5 h-5" />,
      cta: 'Enable Exports',
      features: [
        'CSV and Excel exports',
        'API access for integrations',
        'Scheduled automated exports',
        'Custom data selection'
      ]
    },
    'priority-support': {
      title: 'Priority Support',
      description: 'Get faster responses and dedicated support for your business needs.',
      icon: <Crown className="w-5 h-5" />,
      cta: 'Get Priority Support',
      features: [
        'Dedicated account manager',
        'Priority email and chat support',
        'Business networking consultations',
        'Onboarding assistance'
      ]
    }
  };

  const content = featureContent[feature];

  // Determine recommended plan based on feature
  const recommendedPlan = feature === 'priority-support' ? 'pro' : 'basic';
  
  // Compact version (for inline prompts)
  if (compact) {
    return (
      <div className={`flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-100 ${className}`}>
        <div className="flex items-center">
          {content.icon}
          <p className="ml-2 text-sm font-medium">{content.title}</p>
        </div>
        <Link href="/billing">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1">
            Upgrade
          </Button>
        </Link>
      </div>
    );
  }

  // Full version
  return (
    <Card className={className}>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white">
            {content.icon}
          </div>
          <h3 className="ml-3 text-lg font-semibold">{content.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{content.description}</p>
        
        {showFeatures && (
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Premium features include:</p>
            <ul className="space-y-2">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-3">
            Recommended plan: <GradientText variant={recommendedPlan === 'pro' ? 'purple' : 'blue'} className="ml-1">
              {recommendedPlan === 'pro' ? 'Professional' : 'Business'}
            </GradientText>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/billing" className="flex-1">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                {content.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/pricing" className="flex-1">
              <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
