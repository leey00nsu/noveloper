'use client';

import {
  Group,
  MantineColorScheme,
  Select,
  Text,
  useMantineColorScheme,
} from '@mantine/core';

const THEMES = [
  { label: '라이트', value: 'light' },
  { label: '다크', value: 'dark' },
  { label: '시스템 설정', value: 'auto' },
];

const ThemeSelect = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return (
    <Group justify="space-between">
      <Text>테마</Text>
      <Select
        size="sm"
        allowDeselect={false}
        defaultValue={colorScheme}
        onChange={(value) => setColorScheme(value as MantineColorScheme)}
        data={THEMES}
      />
    </Group>
  );
};

export default ThemeSelect;
