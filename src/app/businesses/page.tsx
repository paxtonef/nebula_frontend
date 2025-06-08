'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, MapPin, Building2, Users, ChevronDown, ChevronUp } from 'lucide-react';
import BusinessCard from '@/components/business/BusinessCard';
import TrustScore from '@/components/business/TrustScore';
import { useBusinesses } from '@/hooks/useBusinesses';

// Industry options for filtering
const INDUSTRY_OPTIONS = [
  'Technology',
  'Fashion',
  'Food & Beverage',
  'Finance',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Retail',
  'Logistics',
  'Construction',
  'Energy',
  'Agriculture',
  'Hospitality',
  'Entertainment',
  'Other',
];

// Country options for filtering
const COUNTRY_OPTIONS = [
  'GERMANY',
  'FRANCE',
  'ITALY',
  'SPAIN',
  'NETHERLANDS',
  'BELGIUM',
  'POLAND',
  'SWEDEN',
  'AUSTRIA',
  'DENMARK',
  'FINLAND',
  'PORTUGAL',
  'IRELAND',
  'GREECE',
  'OTHER',
];

// Business size options for filtering
const SIZE_OPTIONS = [
  'MICRO',
  'SMALL',
  'MEDIUM',
];

// Industry options for dropdown
const INDUSTRIES = [
  'All Industries',
  'Technology',
  'Finance',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Education',
  'Food & Beverage',
  'Creative',
  'Consulting',
  'Fashion',
];

// Country options
const COUNTRIES = [
  'All Countries',
  'FRANCE',
  'GERMANY',
  'ITALY',
  'UK',
  'SPAIN',
  'AUSTRIA',
];

// Size options
const SIZES = [
  'All Sizes',
  'MICRO',
  'SMALL',
  'MEDIUM',
];

export default function BusinessesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get filter values from URL params or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get('industry') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'trustScore');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));
  const [limit] = useState(10);
  
  // Fetch businesses from API using our custom hook
  const { 
    businesses, 
    pagination, 
    isLoading, 
    error, 
    refetch 
  } = useBusinesses({
    page,
    limit,
    sortBy,
    sortOrder: sortOrder as 'asc' | 'desc',
    query: searchQuery,
    industry: selectedIndustry,
    country: selectedCountry,
    size: selectedSize,
  });
  
  // Update URL when filters change
  const updateFilters = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('query', searchQuery);
    if (selectedIndustry) params.set('industry', selectedIndustry);
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedSize) params.set('size', selectedSize);
    if (sortBy !== 'trustScore') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (page !== 1) params.set('page', page.toString());
    
    router.push(`/businesses?${params.toString()}`);
  };
  
  // Apply filters when search button is clicked
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    updateFilters();
  };
  
  // Update URL when pagination or sorting changes
  useEffect(() => {
    updateFilters();
  }, [page, sortBy, sortOrder]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Directory</h1>
      
      {/* Search and filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedIndustry('');
              setSelectedCountry('');
              setSelectedSize('');
            }}
            className="flex items-center justify-center md:justify-start gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </form>
        
        {/* Advanced filters */}
        <div className="bg-gray-50 p-4 rounded-md mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Industries</option>
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Countries</option>
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Sizes</option>
              {SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Sort options */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {pagination.total} businesses found
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-1 text-sm border border-gray-300 rounded-md"
            >
              <option value="trustScore">Trust Score</option>
              <option value="name">Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {sortOrder === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Business listings */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading businesses. Please try again later.</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded text-center">
            <p className="text-lg font-medium">No businesses found</p>
            <p className="mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {businesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={{
                  ...business,
                  size: business.size as 'MICRO' | 'SMALL' | 'MEDIUM' | undefined,
                  verificationStatus: business.verificationStatus as 'PENDING' | 'VERIFIED' | 'REJECTED'
                }} 
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded ${pageNum === page ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                disabled={page === pagination.totalPages}
                className={`px-3 py-1 rounded ${page === pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
