import { findOrInsertUser } from '@/actions/supabase/find-or-insert-user';
import { createClient } from '@/libs/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');

  // next가 param에 있으면 next로 redirect
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();

    const { data, error: exchageCodeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchageCodeError) {
      // TODO: exchage code error
      return NextResponse.redirect(`${origin}`);
    }

    const { error: findOrInsertUserError } = await findOrInsertUser(data.user);

    if (findOrInsertUserError) {
      // TODO: find or insert user error
      return NextResponse.redirect(`${origin}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
};
