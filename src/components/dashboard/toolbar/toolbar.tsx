'use client';

import { Box, ScrollArea, Stack } from '@mantine/core';

import EditHistory from './edit-history';

interface ToolbarProps {
  isCollapsed?: boolean;
}

const Toolbar = ({ isCollapsed }: ToolbarProps) => {
  if (isCollapsed) return <Box className="h-full w-full bg-gray-900 " />;

  return (
    <Stack className="h-full w-full bg-gray-900">
      <ScrollArea
        scrollbars="y"
        className="h-full"
        classNames={{
          scrollbar: '!bg-gray-900',
          thumb: '!bg-white/40',
        }}
      >
        <EditHistory />
      </ScrollArea>
    </Stack>
  );
};

export default Toolbar;
