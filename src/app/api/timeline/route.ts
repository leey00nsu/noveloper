import { NextRequest, NextResponse } from 'next/server';

import { getTimelines } from '@/services/supabase/timeline/get-timelines';
import { getTimelinesByDate } from '@/services/supabase/timeline/get-timelines-by-date';
import { getTimelinesById } from '@/services/supabase/timeline/get-timelines-by-id';
import { getTimelinesByYear } from '@/services/supabase/timeline/get-timelines-by-year';

import { catchResponseError } from '@/libs/response-catch-error';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const year = params.get('year');
  const date = params.get('date');

  if (projectId && date) {
    const response = await catchResponseError(
      getTimelinesByDate({ projectId, date }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId && year) {
    const response = await catchResponseError(
      getTimelinesByYear({ projectId, year }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId) {
    const response = await catchResponseError(getTimelinesById({ projectId }));

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  const response = await catchResponseError(getTimelines());

  return NextResponse.json(response, {
    status: response.status,
  });
}
