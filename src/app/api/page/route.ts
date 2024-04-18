import { NextRequest, NextResponse } from 'next/server';

import { createPage } from '@/services/supabase/page/create-page';
import { getPageById } from '@/services/supabase/page/get-page-by-id';
import { getPages } from '@/services/supabase/page/get-projects';
import { updatePage } from '@/services/supabase/page/update-project';

import { catchResponseError } from '@/libs/response-catch-error';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(createPage(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(updatePage(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const pageId = Number(params.get('pageId'));

  if (projectId && pageId) {
    const response = await catchResponseError(
      getPageById({
        projectId,
        pageId,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId) {
    const response = await catchResponseError(
      getPages({
        projectId,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }
}
