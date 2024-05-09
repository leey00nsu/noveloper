import { NextResponse } from 'next/server';

import { findOrInsertUser } from '@/services/supabase/user/find-or-insert-user';

import { createClient } from '@/libs/supabase/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');

  // next가 param에 있으면 next로 redirect
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();

    const { data, error: exchageCodeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchageCodeError) {
      // TODO: exchage code error
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }

    const { data: user } = await findOrInsertUser(data.user);

    if (!user) {
      // TODO: find or insert user error
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}${next}`);
};
