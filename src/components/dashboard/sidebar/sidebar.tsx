'use client';

import Logo from '@/components/ui/logo/logo';
import {
  Accordion,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Group,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { FaRegFileAlt, FaRegFolderOpen } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

const Sidebar = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const MOCK_BUTTONS = [
    { label: '가이드', icon: <FaRegFileAlt /> },
    { label: '작품 목록', icon: <FaRegFolderOpen /> },
    { label: '환경 설정', icon: <IoSettingsOutline /> },
  ];

  const MOCK_ACCORDIANS = [
    { label: '인물', items: ['인물 관리', '인물 관계도'] },
    { label: '회차', items: ['회차 관리', '타임라인'] },
    { label: '설정', items: ['작품 정보', '배경 관리', '고유 명사 설정'] },
  ];

  return (
    <Stack className="h-full w-[300px] bg-gray-900 ">
      <Center className="p-sm">
        <Logo color="white" />
      </Center>

      <Box className="p-sm">
        <SegmentedControl
          onChange={(value) => setColorScheme(value as any)}
          fullWidth
          value={colorScheme}
          classNames={{
            root: 'bg-gray-800',
            indicator: 'bg-gray-700',
            label: 'text-white hover:text-white',
          }}
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
        />
      </Box>

      <ScrollArea
        className="h-full"
        classNames={{
          scrollbar: '!bg-gray-900',
          thumb: '!bg-white/40',
        }}
      >
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

        <Divider color="gray.7" className="my-sm" />

        <Accordion multiple defaultValue={[]} className="p-sm">
          {MOCK_ACCORDIANS.map((accordion) => (
            <Accordion.Item
              key={accordion.label}
              value={accordion.label}
              className="border-none"
            >
              <Accordion.Control className="rounded text-white hover:bg-gray-800">
                {accordion.label}
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  {accordion.items.map((item) => (
                    <Button
                      key={item}
                      variant="transparent"
                      justify="flex-start"
                      color="white"
                      className="px-md hover:bg-gray-800 "
                    >
                      {item}
                    </Button>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea>

      <Box className="p-sm">
        <Group className="p-sm rounded bg-gray-800" justify="center">
          <Avatar src={null} color="white">
            TN
          </Avatar>
          <Stack className="gap-0">
            <Text className="font-bold text-white">Test Name</Text>
            <Text className="text-sm text-white">testname@gmail.com</Text>
          </Stack>
        </Group>
      </Box>
    </Stack>
  );
};

export default Sidebar;
