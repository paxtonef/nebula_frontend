import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock product config data
  return NextResponse.json({
    configs: [],
    message: "No product configs found"
  });
}
