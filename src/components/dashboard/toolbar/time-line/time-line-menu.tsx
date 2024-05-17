import { Box, Menu } from '@mantine/core';
import { FaEllipsis } from 'react-icons/fa6';
import { IoChatboxEllipses } from 'react-icons/io5';

interface TimeLineMenuProps {
  openModal: () => void;
}

const TimeLineMenu = ({ openModal }: TimeLineMenuProps) => {
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Box className="rounded p-1.5 hover:bg-gray-700">
          <FaEllipsis className="text-white " />
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={openModal} leftSection={<IoChatboxEllipses />}>
          자세히
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TimeLineMenu;
