import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  // Allow all routes without authentication
  return NextResponse.next();
}

export const config = { 
  matcher: ['/((?!.*\\..*|_next).*)', "/", "/(api|trpc)(.*)"] 
};