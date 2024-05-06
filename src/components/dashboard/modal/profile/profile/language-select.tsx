'use client';

import { Group, Select, Text } from '@mantine/core';

const SUPPORT_LANGUAGES = ['한국어', '영어'];

const LanguageSelect = () => {
  return (
    <Group justify="space-between">
      <Text>언어</Text>
      <Select
        size="sm"
        allowDeselect={false}
        defaultValue={SUPPORT_LANGUAGES[0]}
        data={SUPPORT_LANGUAGES}
      />
    </Group>
  );
};

export default LanguageSelect;
