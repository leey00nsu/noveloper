'use client';

import { AppShell } from '@mantine/core';

import LandingHeader from '../header/landing-header';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      header={{
        height: 60,
      }}
    >
      <AppShell.Header>
        <LandingHeader />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppContainer;
