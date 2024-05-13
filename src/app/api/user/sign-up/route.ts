import { NextResponse } from 'next/server';

import { signUpWithEmail } from '@/services/supabase/user/sign-up-with-email';

import { catchResponseError } from '@/libs/response-catch-error';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(signUpWithEmail(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}
