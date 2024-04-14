import { createClient } from '@/libs/supabase/client';

export const signInWithGithub = async () => {
  const supabase = createClient();
  const location = window.location.origin;

  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location}/auth/callback`,
    },
  });
};
