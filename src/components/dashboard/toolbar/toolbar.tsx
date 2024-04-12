'use client';

import { Box, Stack } from '@mantine/core';

import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';

import TimeLineList from './time-line/time-line-list';

interface ToolbarProps {
  isCollapsed?: boolean;
}

const Toolbar = ({ isCollapsed }: ToolbarProps) => {
  if (isCollapsed) return <Box className="h-full w-full bg-gray-900 " />;

  return (
    <Stack className="h-full w-full bg-gray-900">
      <ThemeScrollArea ignoreTheme className="h-full" scrollbars="y">
        <TimeLineList />
      </ThemeScrollArea>
    </Stack>
  );
};

export default Toolbar;
