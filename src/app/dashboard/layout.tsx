import React from 'react';

import DashboardContainer from '@/components/ui/container/dashboard-container';

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
