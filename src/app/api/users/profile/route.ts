import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Return mock profile data based on Auth0 user
    return NextResponse.json({
      id: session.user.sub,
      email: session.user.email,
      name: session.user.name,
      picture: session.user.picture,
      business_profile: null,
      subscription: {
        tier: 'starter',
        status: 'active'
      }
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
