import { handleAuth } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

// Check if we should use mock authentication
const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';

// If using mock auth, redirect to our mock auth endpoints
export async function GET(req: NextRequest, { params }: { params: { auth0: string[] } }) {
  if (useMockAuth) {
    const auth0Param = params.auth0[0];
    const url = new URL(req.url);
    const searchParams = url.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';
    
    // Map Auth0 routes to our mock routes
    switch (auth0Param) {
      case 'login':
        return NextResponse.redirect(new URL(`/api/mock-auth/login${queryString}`, req.url));
      case 'logout':
        return NextResponse.redirect(new URL(`/api/mock-auth/logout${queryString}`, req.url));
      case 'callback':
        return NextResponse.redirect(new URL(`/api/mock-auth/callback${queryString}`, req.url));
      case 'signup':
        return NextResponse.redirect(new URL(`/api/mock-auth/signup${queryString}`, req.url));
      default:
        return NextResponse.json({ error: 'Invalid auth route' }, { status: 400 });
    }
  }
  
  // Use real Auth0 if not using mock auth
  const auth0Handler = handleAuth();
  return auth0Handler(req);
}

export async function POST(req: NextRequest, context: { params: { auth0: string[] } }) {
  if (useMockAuth) {
    // Handle POST the same as GET for mock auth
    return GET(req, context);
  }
  
  // Use real Auth0 if not using mock auth
  const auth0Handler = handleAuth();
  return auth0Handler(req);
}
