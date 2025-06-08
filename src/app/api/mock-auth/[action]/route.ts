import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const MOCK_USER = {
  sub: 'auth0|123456789',
  email: 'demo@nebula-mvp.com',
  name: 'Demo User',
  picture: 'https://via.placeholder.com/150',
  email_verified: true,
  given_name: 'Demo',
  family_name: 'User',
  nickname: 'demo',
  updated_at: new Date().toISOString()
};

export async function GET(
  request: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;
  const searchParams = request.nextUrl.searchParams;
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  // For server-side routes, we'll just redirect to the appropriate page
  // The actual authentication state is managed client-side with localStorage
  switch (action) {
    case 'login':
    case 'signup':
      // Redirect to dashboard - client-side code will handle the actual login
      return NextResponse.redirect(new URL(returnTo, request.url));
      
    case 'logout':
      // Redirect to login page - client-side code will handle the actual logout
      return NextResponse.redirect(new URL('/login', request.url));
      
    case 'callback':
      // Mock callback - just redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
      
    default:
      return NextResponse.json(
        { error: 'Invalid auth action' },
        { status: 400 }
      );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } }
) {
  // Handle POST requests the same as GET for simplicity
  return GET(request, { params });
}
