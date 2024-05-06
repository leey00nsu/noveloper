import { Box, Center } from '@mantine/core';

import LoaderModal from '@/components/dashboard/modal/loader/loader-modal';
import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';

interface ContentWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
}

const ContentWrapper = ({
  children,
  showLoader = false,
}: ContentWrapperProps) => {
  return (
    <Box className="h-full w-full p-sm">
      <ThemeScrollArea className="h-full" scrollbars="y">
        <Center className="h-full w-full">
          <LoaderModal showLoader={showLoader} />
          {children}
        </Center>
      </ThemeScrollArea>
    </Box>
  );
};

export default ContentWrapper;
