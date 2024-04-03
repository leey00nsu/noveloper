import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';
import { Box, Center } from '@mantine/core';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <Box className="h-full w-full p-sm">
      <ThemeScrollArea className="h-full" scrollbars="y">
        <Center className="h-full w-full">{children}</Center>
      </ThemeScrollArea>
    </Box>
  );
};

export default ContentWrapper;
