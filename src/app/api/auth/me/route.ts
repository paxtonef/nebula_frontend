import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock user data when using mock auth
  const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  
  if (useMockAuth) {
    return NextResponse.json({
      sub: 'mock|123456789',
      email: 'demo@nebula-mvp.com',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/150',
      email_verified: true,
      given_name: 'Demo',
      family_name: 'User'
    });
  }
  
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}
