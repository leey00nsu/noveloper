import React from 'react';

import AppContainer from '@/components/ui/container/app-container';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppContainer>{children}</AppContainer>;
};

export default Layout;
