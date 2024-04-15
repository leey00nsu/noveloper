import { NextRequest, NextResponse } from 'next/server';

import { getHistories } from '@/services/supabase/history/get-histories';
import { getHistoriesById } from '@/services/supabase/history/get-histories-by-id';

import { catchResponseError } from '@/libs/response-catch-error';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');

  if (projectId) {
    const response = await catchResponseError(getHistoriesById(projectId));

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  const response = await catchResponseError(getHistories());

  return NextResponse.json(response, {
    status: response.status,
  });
}
