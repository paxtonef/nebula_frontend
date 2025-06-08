import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuickActions from '@/components/dashboard/QuickActions';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('QuickActions Component', () => {
  it('renders all quick action buttons', () => {
    render(<QuickActions />);
    
    expect(screen.getByText('Find Businesses')).toBeInTheDocument();
    expect(screen.getByText('Connections')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('My Business')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('links to the correct routes', () => {
    render(<QuickActions />);
    
    const findBusinessesLink = screen.getByText('Find Businesses').closest('a');
    expect(findBusinessesLink).toHaveAttribute('href', '/businesses');
    
    const connectionsLink = screen.getByText('Connections').closest('a');
    expect(connectionsLink).toHaveAttribute('href', '/connections');
    
    const messagesLink = screen.getByText('Messages').closest('a');
    expect(messagesLink).toHaveAttribute('href', '/messages');
    
    const myBusinessLink = screen.getByText('My Business').closest('a');
    expect(myBusinessLink).toHaveAttribute('href', '/profile');
    
    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  it('applies hover effect styling', () => {
    render(<QuickActions />);
    
    const quickActionLinks = screen.getAllByRole('link');
    quickActionLinks.forEach(link => {
      expect(link).toHaveClass('transition-transform hover:scale-105');
    });
  });

  it('displays icons for each action', () => {
    render(<QuickActions />);
    
    // Check that each action has an icon container
    const iconContainers = document.querySelectorAll('.text-white.mb-2');
    expect(iconContainers.length).toBe(5);
  });
});
