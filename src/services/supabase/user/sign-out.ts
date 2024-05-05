import { createClient } from '@/libs/supabase/client';

const signOut = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();
};

export default signOut;
