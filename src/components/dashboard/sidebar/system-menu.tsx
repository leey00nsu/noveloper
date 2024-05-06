import { Stack } from '@mantine/core';
import { FaRegFileAlt, FaRegFolderOpen } from 'react-icons/fa';

import AccordianButton from '@/components/ui/button/accordian-button';

const SystemMenu = () => {
  const menus = [
    { label: '가이드', icon: <FaRegFileAlt />, href: '/dashboard/guide' },
    {
      label: '프로젝트 목록',
      icon: <FaRegFolderOpen />,
      href: '/dashboard/project',
    },
  ];

  return (
    <Stack className="p-sm">
      {menus.map((menu) => (
        <AccordianButton
          key={menu.label}
          label={menu.label}
          href={menu.href}
          icon={menu.icon}
        />
      ))}
    </Stack>
  );
};

export default SystemMenu;
