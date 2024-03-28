'use client';

import DashboardGroup from '@/components/dashboard/dashboard-group';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import Toolbar from '@/components/dashboard/toolbar/toolbar';
import { AppShell, Drawer } from '@mantine/core';
import { useState } from 'react';

import DashboardHeader from '../header/dashboard-header';
import ScrollArea from '../scroll-area/scroll-area';

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  const openSidebar = () => setIsSidebarCollapsed(true);
  const closeSidebar = () => setIsSidebarCollapsed(false);
  const openToolbar = () => setIsToolbarCollapsed(true);
  const closeToolbar = () => setIsToolbarCollapsed(false);

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

      <Drawer
        hiddenFrom="lg"
        opened={isSidebarCollapsed}
        onClose={closeSidebar}
        classNames={{
          header: '!bg-gray-900',
          body: 'p-0 h-full',
        }}
        scrollAreaComponent={ScrollArea}
      >
        <Sidebar />
      </Drawer>

      <Drawer
        hiddenFrom="lg"
        position="right"
        opened={isToolbarCollapsed}
        onClose={closeToolbar}
        classNames={{
          header: '!bg-gray-900',
          body: 'p-0 h-full',
        }}
        scrollAreaComponent={ScrollArea}
      >
        <Toolbar />
      </Drawer>

      <AppShell.Main className="h-dvh">
        <DashboardGroup>{children}</DashboardGroup>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardContainer;
