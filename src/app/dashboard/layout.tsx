import DashboardGroup from '@/components/dashboard/dashboard-group';
import { Box } from '@mantine/core';
import React from 'react';

const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      <Box className="h-dvh">
        <DashboardGroup>{children}</DashboardGroup>
      </Box>
      {modal}
    </>
  );
};

export default Layout;
