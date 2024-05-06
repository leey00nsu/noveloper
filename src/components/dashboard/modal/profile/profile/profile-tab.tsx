import { Divider, Group, Stack } from '@mantine/core';

import UserInfo from '@/components/ui/user-info/user-info';

import { useGetUser } from '@/hooks/user/use-user-service';

import LanguageSelect from './language-select';
import SignOutButton from './sign-out-button';
import ThemeSelect from './theme-select';

const ProfilTab = () => {
  const { user } = useGetUser();

  return (
    <Stack className="p-sm ">
      <UserInfo>
        <UserInfo.Avatar userName={user?.userName} />
        <UserInfo.Profile
          truncate
          userName={user?.userName}
          userEmail={user?.userName}
        />
      </UserInfo>

      <Divider className="my-sm border-gray-300 dark:border-gray-700" />

      <LanguageSelect />
      <ThemeSelect />

      <Divider className="my-sm border-gray-300 dark:border-gray-700" />

      <Group justify="flex-end">
        <SignOutButton />
      </Group>
    </Stack>
  );
};

export default ProfilTab;
