'use client';

import TrustScore from '@/components/business/TrustScore';
import { ArrowUp, ShieldCheck } from 'lucide-react';

interface TrustScoreDisplayProps {
  score: number;
  previousScore?: number;
}

export default function TrustScoreDisplay({ score, previousScore }: TrustScoreDisplayProps) {
  const change = previousScore ? score - previousScore : 0;
  
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-primary-600" />
          Trust Score Analysis
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Your business trust and credibility metrics
        </p>
      </div>
      
      <div className="border-t border-primary-100 px-4 py-5 sm:p-6">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <TrustScore score={score} size="large" />
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800">{score}/100</h3>
            {change > 0 && (
              <p className="text-sm flex items-center justify-center text-accent-600 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                +{change} points since last month
              </p>
            )}
          </div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-700">Verification Status</h4>
              <div className="mt-2 flex items-center">
                <div className="h-3 w-3 rounded-full bg-accent-500 mr-2"></div>
                <span className="text-sm text-gray-600">Business Verified</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-700">Review Score</h4>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.0/5.0 (12 reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 w-full">
            <h4 className="font-medium text-gray-700 mb-2">Trust Factors</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completeness</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Verification Level</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Network Quality</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="mt-6 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            Improve Trust Score
          </button>
        </div>
      </div>
    </div>
  );
}
