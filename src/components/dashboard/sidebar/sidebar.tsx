'use client';

import Logo from '@/components/ui/logo/logo';
import { Box, Center, Divider, ScrollArea, Stack } from '@mantine/core';

import NovelMenu from './novel-menu';
import SystemMenu from './system-menu';
import ThemeSwitch from './theme-switch';
import UserInfo from './user-info';

interface SidebarProps {
  isCollapsed?: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  if (isCollapsed) return <Box className="h-full w-full bg-gray-900 " />;

  return (
    <Stack className="h-full w-full bg-gray-900">
      <Center className="p-sm">
        <Logo color="white" />
      </Center>

      <ThemeSwitch />

      <ScrollArea
        className="h-full"
        scrollbars="y"
        classNames={{
          scrollbar: '!bg-gray-900',
          thumb: '!bg-white/40',
          viewport: '[&>div]:!block', // https://github.com/mantinedev/mantine/issues/4941
        }}
      >
        <SystemMenu />
        <Divider color="gray.7" className="my-sm" />
        <NovelMenu />
      </ScrollArea>

      <UserInfo />
    </Stack>
  );
};

export default Sidebar;
