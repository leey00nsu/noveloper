import UserInfo from '@/components/ui/user-info/user-info';
import { Button, Divider, Group, Select, Stack, Text } from '@mantine/core';

const SUPPORT_LANGUAGES = ['한국어', '영어'];

const ProfilTab = () => {
  return (
    <Stack className="p-sm ">
      <UserInfo>
        <UserInfo.Avatar userName="Test Name" />
        <UserInfo.Profile
          userName="Test Name"
          userEmail="testName@testName.com"
        />
      </UserInfo>

      <Divider className="my-sm border-gray-300 dark:border-gray-700" />

      <Group justify="space-between">
        <Text>언어</Text>
        <Select
          size="sm"
          checkIconPosition="right"
          defaultValue={SUPPORT_LANGUAGES[0]}
          data={SUPPORT_LANGUAGES}
        />
      </Group>

      <Divider className="my-sm border-gray-300 dark:border-gray-700" />

      <Group justify="flex-end">
        <Button color="red">로그아웃</Button>
      </Group>
    </Stack>
  );
};

export default ProfilTab;
