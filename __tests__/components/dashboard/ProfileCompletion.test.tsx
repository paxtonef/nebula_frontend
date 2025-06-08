import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCompletion from '@/components/dashboard/ProfileCompletion';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('ProfileCompletion Component', () => {
  const mockSteps = [
    { id: '1', title: 'Basic Info', completed: true, href: '/profile?tab=basic' },
    { id: '2', title: 'Business Details', completed: true, href: '/profile?tab=details' },
    { id: '3', title: 'Services & Products', completed: false, href: '/profile?tab=services' },
    { id: '4', title: 'Media & Documents', completed: false, href: '/profile?tab=media' },
  ];

  it('renders the profile completion card', () => {
    render(<ProfileCompletion steps={mockSteps} />);
    
    expect(screen.getByText('Complete Your Profile')).toBeInTheDocument();
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });

  it('displays all steps with correct completion status', () => {
    render(<ProfileCompletion steps={mockSteps} />);
    
    // Check each step is rendered
    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Business Details')).toBeInTheDocument();
    expect(screen.getByText('Services & Products')).toBeInTheDocument();
    expect(screen.getByText('Media & Documents')).toBeInTheDocument();
    
    // Check for completed steps (should have a checkmark or completed indicator)
    const completedSteps = document.querySelectorAll('.text-green-500');
    expect(completedSteps.length).toBe(2);
  });

  it('calculates completion percentage correctly', () => {
    render(<ProfileCompletion steps={mockSteps} />);
    
    // 2 out of 4 steps are completed, so should show 50%
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
    
    // Progress bar width should reflect 50%
    const progressBar = document.querySelector('.bg-primary-600');
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('links to the correct profile sections', () => {
    render(<ProfileCompletion steps={mockSteps} />);
    
    // Check that each step links to the correct URL
    const basicInfoLink = screen.getByText('Basic Info').closest('a');
    expect(basicInfoLink).toHaveAttribute('href', '/profile?tab=basic');
    
    const businessDetailsLink = screen.getByText('Business Details').closest('a');
    expect(businessDetailsLink).toHaveAttribute('href', '/profile?tab=details');
    
    const servicesLink = screen.getByText('Services & Products').closest('a');
    expect(servicesLink).toHaveAttribute('href', '/profile?tab=services');
    
    const mediaLink = screen.getByText('Media & Documents').closest('a');
    expect(mediaLink).toHaveAttribute('href', '/profile?tab=media');
  });

  it('shows a call-to-action button when profile is incomplete', () => {
    render(<ProfileCompletion steps={mockSteps} />);
    
    const ctaButton = screen.getByText('Complete Your Profile');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/profile');
  });

  it('displays a different message when profile is complete', () => {
    const completedSteps = mockSteps.map(step => ({ ...step, completed: true }));
    render(<ProfileCompletion steps={completedSteps} />);
    
    expect(screen.getByText('100% Complete')).toBeInTheDocument();
    expect(screen.getByText('Profile Complete!')).toBeInTheDocument();
  });
});
