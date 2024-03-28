'use client';

import { AppShell } from '@mantine/core';

import LandingHeader from '../header/landing-header';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <AppShell
      header={{
        height: 60,
      }}
    >
      <AppShell.Header>
        <LandingHeader />
      </AppShell.Header>

      <AppShell.Main className="h-dvh">{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppContainer;
