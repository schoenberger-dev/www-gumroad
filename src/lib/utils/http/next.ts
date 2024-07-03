import { NextRequest, NextResponse } from 'next/server';

export async function next(request: NextRequest, url: string) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = url;
  return NextResponse.redirect(redirectUrl);
}
