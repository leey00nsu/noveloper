'use client';

import DashboardGroup from '@/components/dashboard/dashboard-group';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import Toolbar from '@/components/dashboard/toolbar/toolbar';
import { AppShell } from '@mantine/core';
import { useState } from 'react';

import DashboardHeader from '../header/dashboard-header';
import ThemeDrawer from '../mantine-ui/theme-drawer';
import ScrollArea from '../mantine-ui/theme-scroll-area';

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(true);

  const openSidebar = () => setIsSidebarCollapsed(false);
  const closeSidebar = () => setIsSidebarCollapsed(true);
  const openToolbar = () => setIsToolbarCollapsed(false);
  const closeToolbar = () => setIsToolbarCollapsed(true);

  return (
    <AppShell
      header={{
        height: {
          xs: 60,
          lg: 0,
        },
      }}
    >
      <AppShell.Header hiddenFrom="lg">
        <DashboardHeader openSidebar={openSidebar} openToolbar={openToolbar} />
      </AppShell.Header>

      <ThemeDrawer
        hiddenFrom="lg"
        position="left"
        opened={!isSidebarCollapsed}
        onClose={closeSidebar}
        scrollAreaComponent={ScrollArea}
      >
        <Sidebar />
      </ThemeDrawer>

      <ThemeDrawer
        hiddenFrom="lg"
        position="right"
        opened={!isToolbarCollapsed}
        onClose={closeToolbar}
        scrollAreaComponent={ScrollArea}
      >
        <Toolbar />
      </ThemeDrawer>

      <AppShell.Main className="h-dvh">
        <DashboardGroup>{children}</DashboardGroup>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardContainer;
