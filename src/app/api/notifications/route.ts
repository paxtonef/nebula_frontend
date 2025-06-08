import { NextRequest, NextResponse } from 'next/server';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    user_id: 'mock|123456789',
    business_id: '1',
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'TechSolutions GmbH wants to connect with you',
    link: '/connections/requests',
    read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    user_id: 'mock|123456789',
    business_id: '2',
    type: 'system',
    title: 'Profile Completion',
    message: 'Complete your business profile to get better matches',
    link: '/profile',
    read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  // Parse query parameters
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '20');
  const unreadOnly = url.searchParams.get('unreadOnly') === 'true';
  
  // Filter notifications based on parameters
  const filteredNotifications = unreadOnly 
    ? mockNotifications.filter(n => !n.read) 
    : mockNotifications;
  
  // Calculate pagination
  const total = filteredNotifications.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
  
  // Return mock response
  return NextResponse.json({
    status: 'success',
    data: {
      notifications: paginatedNotifications,
      unreadCount: mockNotifications.filter(n => !n.read).length,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  });
}

// Handle marking a notification as read
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Handle read-all endpoint
  if (path.endsWith('/read-all')) {
    return NextResponse.json({
      status: 'success',
      data: {
        message: 'All notifications marked as read'
      }
    });
  }
  
  // Handle marking individual notification as read
  const idMatch = path.match(/\/notifications\/(.+)\/read/);
  if (idMatch) {
    const id = idMatch[1];
    return NextResponse.json({
      status: 'success',
      data: {
        message: `Notification ${id} marked as read`
      }
    });
  }
  
  // Default response for other POST requests
  return NextResponse.json({
    status: 'error',
    message: 'Invalid endpoint'
  }, { status: 400 });
}
