import { NextResponse } from 'next/server';

import { getUserData } from '@/services/supabase/user/get-user-data';

export async function GET() {
  const response = await getUserData();

  return NextResponse.json(response);
}
