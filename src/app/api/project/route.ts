import { NextRequest, NextResponse } from 'next/server';

import { createProject } from '@/services/supabase/project/create-project';
import { getProjectById } from '@/services/supabase/project/get-project-by-id';
import { getProjects } from '@/services/supabase/project/get-projects';
import { updateProject } from '@/services/supabase/project/update-project';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await createProject(body);

  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const response = await updateProject(body);

  return NextResponse.json(response);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');

  if (projectId) {
    const response = await getProjectById(projectId);

    return NextResponse.json(response);
  }

  const response = await getProjects();

  return NextResponse.json(response);
}
