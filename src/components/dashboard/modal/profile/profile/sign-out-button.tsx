import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

import signOut from '@/services/supabase/user/sign-out';

const SignOutButton = () => {
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Button color="red" onClick={signOutHandler}>
      로그아웃
    </Button>
  );
};

export default SignOutButton;
