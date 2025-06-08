import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BusinessProfile from '@/app/profile/page';

// Mock the Auth0 useUser hook
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(() => ({
    user: { name: 'Test User', email: 'test@example.com' },
    error: undefined,
    isLoading: false,
  })),
}));

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

describe('BusinessProfile Page', () => {
  it('renders the business profile page with tabs', () => {
    render(<BusinessProfile />);
    
    // Check page structure
    expect(screen.getByText(/Acme Corporation/i)).toBeInTheDocument();
    
    // Check tabs
    expect(screen.getByRole('tab', { name: /Basic Info/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Business Details/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Services & Products/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Media & Documents/i })).toBeInTheDocument();
  });

  it('allows editing the profile', async () => {
    render(<BusinessProfile />);
    
    // Initial state - Edit button should be visible
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Should now show Save and Cancel buttons
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    
    // Should show editable fields
    const nameInput = screen.getByLabelText('Business Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('Acme Corporation');
    
    // Change a field value
    fireEvent.change(nameInput, { target: { value: 'Updated Business Name' } });
    expect(nameInput).toHaveValue('Updated Business Name');
    
    // Save changes
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Should go back to view mode with updated data
    await waitFor(() => {
      expect(screen.getByText('Updated Business Name')).toBeInTheDocument();
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });

  it('cancels editing without saving changes', () => {
    render(<BusinessProfile />);
    
    // Start editing
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Change a field value
    const nameInput = screen.getByLabelText('Business Name');
    fireEvent.change(nameInput, { target: { value: 'Changed Name' } });
    
    // Cancel editing
    fireEvent.click(screen.getByText('Cancel'));
    
    // Should revert to original data
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<BusinessProfile />);
    
    // Should start on Basic Info tab
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    
    // Click on Business Details tab
    fireEvent.click(screen.getByRole('tab', { name: /Business Details/i }));
    
    // Should show Business Details content
    expect(screen.getByText('Contact & Location')).toBeInTheDocument();
    
    // Click on Services & Products tab
    fireEvent.click(screen.getByRole('tab', { name: /Services & Products/i }));
    
    // Should show Services content (currently under development)
    expect(screen.getByText('This section is under development. Check back soon!')).toBeInTheDocument();
  });

  it('redirects unauthenticated users', () => {
    // Mock the Auth0 hook to return no user
    require('@auth0/nextjs-auth0/client').useUser.mockImplementation(() => ({
      user: null,
      error: undefined,
      isLoading: false,
    }));
    
    const { container } = render(<BusinessProfile />);
    
    // Should not render the profile content
    expect(container.firstChild).toBeNull();
  });

  it('shows loading state while authenticating', () => {
    // Mock the Auth0 hook to return loading state
    require('@auth0/nextjs-auth0/client').useUser.mockImplementation(() => ({
      user: null,
      error: undefined,
      isLoading: true,
    }));
    
    render(<BusinessProfile />);
    
    // Should show loading indicator
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
