import { NextResponse } from 'next/server';

import { signInWithEmail } from '@/services/supabase/user/sign-in-with-email';

import { catchResponseError } from '@/libs/response-catch-error';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(signInWithEmail(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}
