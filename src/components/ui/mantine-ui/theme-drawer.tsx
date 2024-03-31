import { Drawer, DrawerProps } from '@mantine/core';

import ThemeScrollArea from './theme-scroll-area';

interface ThemeDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeScrollArea ignoreTheme className="h-full" scrollbars="y">
      {children}
    </ThemeScrollArea>
  );
};

const ThemeDrawer = ({ children, ...props }: ThemeDrawerProps) => {
  return (
    <Drawer
      classNames={{
        header: '!bg-gray-900',
        body: 'p-0 h-full',
      }}
      scrollAreaComponent={ScrollArea}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default ThemeDrawer;
