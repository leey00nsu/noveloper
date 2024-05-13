import { NextResponse } from 'next/server';

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

    if (!data.session || !data.user || exchageCodeError) {
      // TODO: exchage code error
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}${next}`);
};
