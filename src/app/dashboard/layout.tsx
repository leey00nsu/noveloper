import DashboardContainer from '@/components/ui/container/dashboard-container';
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
      <DashboardContainer>{children}</DashboardContainer>
      {modal}
    </>
  );
};

export default Layout;
