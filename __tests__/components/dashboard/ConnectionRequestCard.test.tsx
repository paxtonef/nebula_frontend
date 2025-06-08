import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectionRequestCard from '@/components/dashboard/ConnectionRequestCard';

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

describe('ConnectionRequestCard Component', () => {
  const mockRequest = {
    id: '123',
    businessName: 'Test Business',
    industry: 'Technology',
    location: 'San Francisco, CA',
    logoUrl: 'https://via.placeholder.com/150',
    requestDate: new Date('2025-05-01').toISOString(),
    message: 'Would like to connect with you',
  };

  const mockOnAccept = jest.fn();
  const mockOnReject = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders connection request details correctly', () => {
    render(
      <ConnectionRequestCard 
        {...mockRequest} 
        onAccept={mockOnAccept} 
        onReject={mockOnReject} 
      />
    );
    
    expect(screen.getByText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByAltText('Test Business')).toBeInTheDocument();
    expect(screen.getByText('Would like to connect with you')).toBeInTheDocument();
  });

  it('formats the request date correctly', () => {
    render(
      <ConnectionRequestCard 
        {...mockRequest} 
        onAccept={mockOnAccept} 
        onReject={mockOnReject} 
      />
    );
    
    // The date should be formatted as "Requested on May 1, 2025"
    expect(screen.getByText(/Requested on May 1, 2025/i)).toBeInTheDocument();
  });

  it('calls onAccept when accept button is clicked', async () => {
    render(
      <ConnectionRequestCard 
        {...mockRequest} 
        onAccept={mockOnAccept} 
        onReject={mockOnReject} 
      />
    );
    
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    
    expect(mockOnAccept).toHaveBeenCalledWith('123');
  });

  it('calls onReject when reject button is clicked', async () => {
    render(
      <ConnectionRequestCard 
        {...mockRequest} 
        onAccept={mockOnAccept} 
        onReject={mockOnReject} 
      />
    );
    
    const rejectButton = screen.getByText('Decline');
    fireEvent.click(rejectButton);
    
    expect(mockOnReject).toHaveBeenCalledWith('123');
  });

  it('disables buttons when in loading state', () => {
    render(
      <ConnectionRequestCard 
        {...mockRequest} 
        onAccept={mockOnAccept} 
        onReject={mockOnReject}
        isAccepting={true}
        isRejecting={false}
      />
    );
    
    const acceptButton = screen.getByText('Accept');
    const rejectButton = screen.getByText('Decline');
    
    expect(acceptButton).toBeDisabled();
    expect(rejectButton).not.toBeDisabled();
  });
});
