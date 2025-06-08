import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const endpoint = params.slug.join('/');
  
  console.warn(`Missing API endpoint: /api/${endpoint}`);
  
  // Return a generic response for any missing endpoints
  return NextResponse.json({
    error: 'Endpoint not implemented',
    endpoint: `/api/${endpoint}`,
    message: 'This API endpoint is not yet implemented in the MVP'
  }, { status: 501 });
}

export async function POST(request: NextRequest, { params }: { params: { slug: string[] } }) {
  return GET(request, { params });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string[] } }) {
  return GET(request, { params });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string[] } }) {
  return GET(request, { params });
}
