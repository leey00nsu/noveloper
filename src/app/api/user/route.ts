import { NextResponse } from 'next/server';

import { getUserData } from '@/services/supabase/user/get-user-data';

import { catchResponseError } from '@/libs/response-catch-error';

export async function GET() {
  const response = await catchResponseError(getUserData());

  return NextResponse.json(response, {
    status: response.status,
  });
}
