import { NextRequest, NextResponse } from 'next/server';

import { getHistories } from '@/services/supabase/history/get-histories';
import { getHistoriesById } from '@/services/supabase/history/get-histories-by-id';

import { catchResponseError } from '@/libs/response-catch-error';
import { getHistoriesByDate } from '@/services/supabase/history/get-histories-by-date';
import { getHistoriesByYear } from '@/services/supabase/history/get-histories-by-year';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const year = params.get('year');
  const date = params.get('date');

  if (projectId && date)  {
    const response = await catchResponseError(getHistoriesByDate({ projectId, date}));

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId && year)  {
    const response = await catchResponseError(getHistoriesByYear({ projectId, year}));

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId) {
    const response = await catchResponseError(getHistoriesById({ projectId }));

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  const response = await catchResponseError(getHistories());

  return NextResponse.json(response, {
    status: response.status,
  });
}
