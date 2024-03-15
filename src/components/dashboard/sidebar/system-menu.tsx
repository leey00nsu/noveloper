import { Button, Stack } from '@mantine/core';
import { FaRegFileAlt, FaRegFolderOpen } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

const SystemMenu = () => {
  const MOCK_BUTTONS = [
    { label: '가이드', icon: <FaRegFileAlt /> },
    { label: '작품 목록', icon: <FaRegFolderOpen /> },
    { label: '환경 설정', icon: <IoSettingsOutline /> },
  ];

  return (
    <Stack className="p-sm">
      {MOCK_BUTTONS.map((button) => (
        <Button
          key={button.label}
          variant="transparent"
          leftSection={button.icon}
          justify="flex-start"
          color="white"
          className="px-md hover:bg-gray-800 "
        >
          {button.label}
        </Button>
      ))}
    </Stack>
  );
};

export default SystemMenu;
