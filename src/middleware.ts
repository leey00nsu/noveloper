import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const WITH_AUTH_LIST = ['/dashboard']; // 로그인이 되어있을 때 접근 가능한 루트
const WITHOUT_AUTH_LIST = ['/', '/auth/signin']; // 로그인이 되어있지 않을 때 접근 가능한 루트

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isLogin = !!token;

  if (WITHOUT_AUTH_LIST.includes(req.nextUrl.pathname)) {
    if (isLogin) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  if (WITH_AUTH_LIST.includes(req.nextUrl.pathname)) {
    if (!isLogin) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
