import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// Add this to prevent static rendering and allow headers usage
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Return mock profile data based on NextAuth user
    return NextResponse.json({
      id: session.user.id || session.user.email || 'user-id',
      email: session.user.email || 'user@example.com',
      name: session.user.name || 'User',
      picture: session.user.image || null,
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
