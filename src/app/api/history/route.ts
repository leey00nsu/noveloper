import { NextRequest, NextResponse } from 'next/server';

import { getHistories } from '@/services/supabase/history/get-histories';
import { getHistoriesById } from '@/services/supabase/history/get-histories-by-id';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');

  if (projectId) {
    const response = await getHistoriesById(projectId);

    return NextResponse.json(response);
  }

  const response = await getHistories();

  return NextResponse.json(response);
}
