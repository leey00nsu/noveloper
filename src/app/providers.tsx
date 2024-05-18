import { Notifications } from '@mantine/notifications';
import React from 'react';

import {
  BlockBrowserNavigation,
  NavigationBlockerProvider,
} from '@/components/ui/navigation/navigation-block';

import MantineProvider from './mantine-provider';
import ModalProvider from './modal-provider';
import QueryProvider from './query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <ModalProvider>
        <Notifications zIndex={1000} />
        <QueryProvider>
          <NavigationBlockerProvider>
            <BlockBrowserNavigation />
            {children}
          </NavigationBlockerProvider>
        </QueryProvider>
      </ModalProvider>
    </MantineProvider>
  );
};

export default Providers;
