import { Button, Stack } from '@mantine/core';
import Link from 'next/link';
import { FaRegFileAlt, FaRegFolderOpen } from 'react-icons/fa';

const SystemMenu = () => {
  const MOCK_BUTTONS = [
    { label: '가이드', icon: <FaRegFileAlt />, href: '/dashboard/guide' },
    {
      label: '작품 목록',
      icon: <FaRegFolderOpen />,
      href: '/dashboard/project',
    },
  ];

  return (
    <Stack className="p-sm">
      {MOCK_BUTTONS.map((button) => (
        <Button
          component={Link}
          href={button.href}
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
