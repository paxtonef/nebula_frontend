import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock subscription data
  return NextResponse.json({
    subscriptions: [],
    message: "No subscriptions found"
  });
}
