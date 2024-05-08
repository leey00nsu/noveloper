import { Box, Center, TypographyStylesProvider } from '@mantine/core';

import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';

interface MdxWrapperProps {
  children: React.ReactNode;
}

const MdxWrapper = ({ children }: MdxWrapperProps) => {
  return (
    <Box className="h-full w-full p-sm">
      <ThemeScrollArea className="h-full" scrollbars="y">
        <Center className="h-full w-full ">
          <TypographyStylesProvider className="h-full w-full max-w-2xl">
            {children}
          </TypographyStylesProvider>
        </Center>
      </ThemeScrollArea>
    </Box>
  );
};

export default MdxWrapper;
