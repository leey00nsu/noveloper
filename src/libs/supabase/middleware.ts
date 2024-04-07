import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

const WITH_AUTH_LIST = ['/dashboard']; // 로그인이 되어있을 때 접근 가능한 루트
const WITHOUT_AUTH_LIST = ['/', '/auth/signin']; // 로그인이 되어있지 않을 때 접근 가능한 루트

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();

  const isLogin = !!data.user;

  if (WITHOUT_AUTH_LIST.includes(request.nextUrl.pathname)) {
    if (isLogin) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
  }

  if (
    WITH_AUTH_LIST.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!isLogin) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }

  return response;
}
