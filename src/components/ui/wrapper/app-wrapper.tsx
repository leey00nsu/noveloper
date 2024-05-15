import { Center } from '@mantine/core';

import LoaderModal from '@/components/ui/loader/loader-modal';

interface AppWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
}

const AppWrapper = ({ children, showLoader = false }: AppWrapperProps) => {
  return (
    <Center className="h-full w-full p-sm">
      <LoaderModal showLoader={showLoader} />
      {children}
    </Center>
  );
};

export default AppWrapper;
