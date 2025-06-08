import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendedBusinessCard from '@/components/dashboard/RecommendedBusinessCard';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('RecommendedBusinessCard Component', () => {
  const mockBusiness = {
    id: '123',
    businessName: 'Test Business',
    industry: 'Technology',
    location: 'San Francisco, CA',
    logoUrl: 'https://via.placeholder.com/150',
    matchScore: 85,
    description: 'A great business for testing',
  };

  it('renders business details correctly', () => {
    render(<RecommendedBusinessCard {...mockBusiness} />);
    
    expect(screen.getByText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByAltText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('A great business for testing')).toBeInTheDocument();
  });

  it('displays the match score correctly', () => {
    render(<RecommendedBusinessCard {...mockBusiness} />);
    
    expect(screen.getByText('85% Match')).toBeInTheDocument();
  });

  it('includes view profile and connect links', () => {
    render(<RecommendedBusinessCard {...mockBusiness} />);
    
    const viewProfileLink = screen.getByText('View Profile');
    expect(viewProfileLink).toBeInTheDocument();
    expect(viewProfileLink.closest('a')).toHaveAttribute('href', '/businesses/123');
    
    const connectLink = screen.getByText('Connect');
    expect(connectLink).toBeInTheDocument();
    expect(connectLink.closest('a')).toHaveAttribute('href', '/connect/123');
  });

  it('applies different styling based on match score', () => {
    // High match score
    const { rerender } = render(<RecommendedBusinessCard {...mockBusiness} matchScore={85} />);
    expect(screen.getByText('85% Match').closest('span')).toHaveClass('bg-green-100 text-green-800');
    
    // Medium match score
    rerender(<RecommendedBusinessCard {...mockBusiness} matchScore={65} />);
    expect(screen.getByText('65% Match').closest('span')).toHaveClass('bg-yellow-100 text-yellow-800');
    
    // Low match score
    rerender(<RecommendedBusinessCard {...mockBusiness} matchScore={35} />);
    expect(screen.getByText('35% Match').closest('span')).toHaveClass('bg-gray-100 text-gray-800');
  });
});
