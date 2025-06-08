import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectionCard from '@/components/dashboard/ConnectionCard';

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

describe('ConnectionCard Component', () => {
  const mockConnection = {
    id: '123',
    businessName: 'Test Business',
    industry: 'Technology',
    location: 'San Francisco, CA',
    logoUrl: 'https://via.placeholder.com/150',
    connectionDate: new Date('2025-05-01').toISOString(),
  };

  it('renders connection details correctly', () => {
    render(<ConnectionCard {...mockConnection} />);
    
    expect(screen.getByText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByAltText('Test Business')).toBeInTheDocument();
    expect(screen.getByAltText('Test Business')).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('formats the connection date correctly', () => {
    render(<ConnectionCard {...mockConnection} />);
    
    // The date should be formatted as "Connected on May 1, 2025"
    expect(screen.getByText(/Connected on May 1, 2025/i)).toBeInTheDocument();
  });

  it('includes a message link', () => {
    render(<ConnectionCard {...mockConnection} />);
    
    const messageLink = screen.getByText('Message');
    expect(messageLink).toBeInTheDocument();
    expect(messageLink.closest('a')).toHaveAttribute('href', '/messages/123');
  });
});
