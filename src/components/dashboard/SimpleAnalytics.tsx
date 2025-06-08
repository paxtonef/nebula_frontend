'use client';

interface AnalyticsProps {
  title: string;
  description: string;
}

export default function SimpleAnalytics({ title, description }: AnalyticsProps) {
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 shadow-md rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {description}
        </p>
      </div>
      
      <div className="border-t border-primary-100 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connection Growth */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Connection Growth</h3>
            <div className="h-64 bg-white rounded-lg p-4 flex flex-col justify-between">
              <div className="flex justify-between items-end h-40">
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-1/6 rounded-t-md"></div>
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-1/4 rounded-t-md"></div>
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-1/3 rounded-t-md"></div>
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-1/2 rounded-t-md"></div>
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-3/5 rounded-t-md"></div>
                <div className="w-1/6 bg-gradient-to-t from-primary-500 to-secondary-500 h-4/5 rounded-t-md"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
          
          {/* Industry Distribution */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Industry Distribution</h3>
            <div className="h-64 bg-white rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2 h-full">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                    <span className="text-xs">Technology (35%)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                    <span className="text-xs">Finance (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                    <span className="text-xs">Healthcare (20%)</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-xs">Manufacturing (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    <span className="text-xs">Other (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
