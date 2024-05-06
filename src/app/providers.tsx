import { Notifications } from '@mantine/notifications';
import React from 'react';

import MantineProvider from './mantine-provider';
import ModalProvider from './modal-provider';
import QueryProvider from './query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <ModalProvider>
        <Notifications zIndex={1000} />
        <QueryProvider>{children}</QueryProvider>
      </ModalProvider>
    </MantineProvider>
  );
};

export default Providers;
