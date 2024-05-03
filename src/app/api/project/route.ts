import { NextRequest, NextResponse } from 'next/server';

import { createProject } from '@/services/supabase/project/create-project';
import { deleteProject } from '@/services/supabase/project/delete-project';
import { getProjectById } from '@/services/supabase/project/get-project-by-id';
import { getProjects } from '@/services/supabase/project/get-projects';
import { updateProject } from '@/services/supabase/project/update-project';

import { catchResponseError } from '@/libs/response-catch-error';

import { OrderSchema } from '@/types/api';
import { ProjectOrderBySchema } from '@/types/project';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(createProject(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(updateProject(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(deleteProject(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const orderBy = ProjectOrderBySchema.parse(params.get('order-by'));
  const order = OrderSchema.parse(params.get('order'));
  const search = params.get('search') || '';

  if (projectId) {
    const response = await catchResponseError(
      getProjectById({
        projectId,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (orderBy && order) {
    const response = await catchResponseError(
      getProjects({
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
