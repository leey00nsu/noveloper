import { Box, Center, Divider, Stack } from '@mantine/core';

import Logo from '@/components/ui/logo/logo';
import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';

import ProjectMenu from './project-menu';
import SystemMenu from './system-menu';
import TokenStatus from './token-status';
import UserMenu from './user-menu';

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

      <TokenStatus />

      <ThemeScrollArea ignoreTheme className="h-full" scrollbars="y">
        <Divider className="my-sm border-gray-700" />
        <SystemMenu />
        <Divider className="my-sm border-gray-700" />
        <ProjectMenu />
      </ThemeScrollArea>

      <UserMenu />
    </Stack>
  );
};

export default Sidebar;
