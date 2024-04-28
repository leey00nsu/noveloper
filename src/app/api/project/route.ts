import { NextRequest, NextResponse } from 'next/server';

import { createProject } from '@/services/supabase/project/create-project';
import { getProjectById } from '@/services/supabase/project/get-project-by-id';
import { getProjects } from '@/services/supabase/project/get-projects';
import { updateProject } from '@/services/supabase/project/update-project';

import { catchResponseError } from '@/libs/response-catch-error';

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

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');

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

  const response = await catchResponseError(getProjects());

  return NextResponse.json(response, {
    status: response.status,
  });
}
