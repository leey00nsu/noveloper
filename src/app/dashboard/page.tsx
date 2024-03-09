'use client';

import AppContainer from '@/components/ui/container/app-container';
import { Button } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  return (
    <AppContainer>
      <div>logined as {session?.user?.email}</div>
      <Button onClick={() => signOut()}>Log out</Button>
    </AppContainer>
  );
}
