import { Drawer, DrawerProps } from '@mantine/core';

interface ThemeDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

const ThemeDrawer = ({ children, ...props }: ThemeDrawerProps) => {
  return (
    <Drawer
      classNames={{
        header: '!bg-gray-900',
        body: 'p-0 h-full',
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default ThemeDrawer;
