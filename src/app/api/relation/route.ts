import { NextRequest, NextResponse } from 'next/server';

import { findOrInsertRelation } from '@/services/supabase/character-relation/find-or-insert-relation';
import { updateRelation } from '@/services/supabase/character-relation/update-relation';

import { catchResponseError } from '@/libs/response-catch-error';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');

  if (projectId) {
    const response = await catchResponseError(
      findOrInsertRelation({
        projectId,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(updateRelation(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}
