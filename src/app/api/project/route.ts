import { createProject } from '@/services/supabase/create-project';
import { getProjects } from '@/services/supabase/get-projects';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await createProject(body);

  return NextResponse.json(response);
}

export async function GET() {
  const response = await getProjects();

  return NextResponse.json(response);
}
