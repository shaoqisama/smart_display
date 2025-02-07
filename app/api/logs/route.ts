import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  console.log('Client Log:', message); // Log to the terminal
  return new Response('Log received', { status: 200 });
} 