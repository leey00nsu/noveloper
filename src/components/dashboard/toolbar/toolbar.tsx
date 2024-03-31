'use client';

import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';
import { Box, Stack } from '@mantine/core';

import EditHistory from './edit-history';

interface ToolbarProps {
  isCollapsed?: boolean;
}

const Toolbar = ({ isCollapsed }: ToolbarProps) => {
  if (isCollapsed) return <Box className="h-full w-full bg-gray-900 " />;

  return (
    <Stack className="h-full w-full bg-gray-900">
      <ThemeScrollArea ignoreTheme className="h-full" scrollbars="y">
        <EditHistory />
      </ThemeScrollArea>
    </Stack>
  );
};

export default Toolbar;
