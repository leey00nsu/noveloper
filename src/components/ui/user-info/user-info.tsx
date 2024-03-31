import tw from '@/libs/tw';
import { Avatar, Group, Stack, Text } from '@mantine/core';
import { createContext, useContext } from 'react';

interface UserInfoProps {
  userName: string;
  userEmail: string;
  src?: string;
  children?: React.ReactNode;
  ignoreTheme?: boolean;
  truncate?: boolean;
}

const IgnoreThemeContext = createContext<boolean | undefined>(undefined);

const UserAvatar = ({
  userName,
  src,
}: Pick<UserInfoProps, 'userName' | 'src'>) => {
  const ignoreTheme = useContext(IgnoreThemeContext);

  return (
    <Avatar
      src={src}
      classNames={{
        placeholder: tw(ignoreTheme && 'bg-gray-700 text-gray-600'),
      }}
    >
      {!src && userName.slice(0, 1)}
    </Avatar>
  );
};

const UserProfile = ({
  userName,
  userEmail,
  truncate,
}: Pick<UserInfoProps, 'userName' | 'userEmail' | 'truncate'>) => {
  const ignoreTheme = useContext(IgnoreThemeContext);

  return (
    <Stack className="min-w-0 gap-0">
      <Text
        truncate={truncate && 'end'}
        className={tw('break-words font-bold', ignoreTheme && 'text-white')}
      >
        {userName}
      </Text>
      <Text
        truncate={truncate && 'end'}
        className={tw('break-words', ignoreTheme && 'text-white')}
      >
        {userEmail}
      </Text>
    </Stack>
  );
};

const UserInfo = ({
  children,
  ignoreTheme,
}: Pick<UserInfoProps, 'children' | 'ignoreTheme'>) => {
  return (
    <IgnoreThemeContext.Provider value={ignoreTheme}>
      <Group
        wrap="nowrap"
        className={tw('rounded p-sm', ignoreTheme && 'bg-gray-800')}
        justify="center"
      >
        {children}
      </Group>
    </IgnoreThemeContext.Provider>
  );
};

UserInfo.Avatar = UserAvatar;
UserInfo.Profile = UserProfile;

export default UserInfo;
