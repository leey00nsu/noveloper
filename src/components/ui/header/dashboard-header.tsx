import { ActionIcon, Container, Group } from '@mantine/core';
import { IoMenuOutline, IoSettingsOutline } from 'react-icons/io5';

import Logo from '../logo/logo';

interface DashboardHeaderProps {
  openSidebar: () => void;
  openToolbar: () => void;
}

const DashboardHeader = ({
  openSidebar,
  openToolbar,
}: DashboardHeaderProps) => {
  return (
    <header>
      <Container className="h-[60px]" size="lg">
        <Group justify="space-between" align="center" className="h-full">
          <ActionIcon
            onClick={openSidebar}
            className="bg-gray-900 hover:bg-gray-800"
          >
            <IoSettingsOutline />
          </ActionIcon>
          <Logo color="black" />
          <ActionIcon
            onClick={openToolbar}
            className="bg-gray-900 hover:bg-gray-800"
          >
            <IoMenuOutline />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
};

export default DashboardHeader;
