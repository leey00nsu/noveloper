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
    <Container className="h-[60px]" size="lg">
      <Group justify="space-between" align="center" className="h-full">
        <ActionIcon variant="outline" onClick={openSidebar}>
          <IoSettingsOutline />
        </ActionIcon>
        <Logo color="black" />
        <ActionIcon variant="outline" onClick={openToolbar}>
          <IoMenuOutline />
        </ActionIcon>
      </Group>
    </Container>
  );
};

export default DashboardHeader;
