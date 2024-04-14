import { Button, Divider, Group, Select, Stack, Text } from '@mantine/core';

import UserInfo from '@/components/ui/user-info/user-info';

import { useGetUser } from '@/hooks/user/use-user-service';

const SUPPORT_LANGUAGES = ['한국어', '영어'];

const ProfilTab = () => {
  const { user } = useGetUser();

  return (
    <Stack className="p-sm ">
      <UserInfo>
        <UserInfo.Avatar userName={user?.user_name} />
        <UserInfo.Profile
          truncate
          userName={user?.user_name}
          userEmail={user?.user_name}
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
