'use client';

import Logo from '@/components/ui/logo/logo';
import { Center, Divider, ScrollArea, Stack } from '@mantine/core';

import NovelMenu from './novel-menu';
import SystemMenu from './system-menu';
import ThemeSwitch from './theme-switch';
import UserInfo from './user-info';

const Sidebar = () => {
  return (
    <Stack className="h-full w-[300px] bg-gray-900 ">
      <Center className="p-sm">
        <Logo color="white" />
      </Center>

      <ThemeSwitch />

      <ScrollArea
        className="h-full"
        classNames={{
          scrollbar: '!bg-gray-900',
          thumb: '!bg-white/40',
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
