import AppContainer from '@/components/ui/container/app-container';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppContainer>{children}</AppContainer>;
};

export default Layout;
