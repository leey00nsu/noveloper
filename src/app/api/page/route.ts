import { NextRequest, NextResponse } from 'next/server';

import { createPage } from '@/services/supabase/page/create-page';
import { deletePage } from '@/services/supabase/page/delete-page';
import { getPageById } from '@/services/supabase/page/get-page-by-id';
import { getPages } from '@/services/supabase/page/get-pages';
import { updatePage } from '@/services/supabase/page/update-page';

import { catchResponseError } from '@/libs/response-catch-error';

import { OrderSchema } from '@/types/api';
import { PageOrderBySchema } from '@/types/page';

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

export async function DELETE(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(deletePage(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const pageId = Number(params.get('pageId'));
  const orderBy = PageOrderBySchema.parse(params.get('order-by'));
  const order = OrderSchema.parse(params.get('order'));
  const search = params.get('search') || '';

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

  if (projectId && orderBy && order) {
    const response = await catchResponseError(
      getPages({
        projectId,
        orderBy,
        order,
        search,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }
}
