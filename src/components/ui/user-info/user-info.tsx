import { Avatar, Group, Stack, Text } from '@mantine/core';
import { createContext, useContext } from 'react';

import tw from '@/libs/tw';

import ThemeSkeleton from '../mantine-ui/theme-skeleton';

const IgnoreThemeContext = createContext<boolean | undefined>(undefined);

interface UserAvatarProps {
  userName?: string;
  src?: string;
}

const UserAvatar = ({ userName, src }: UserAvatarProps) => {
  const ignoreTheme = useContext(IgnoreThemeContext);

  return (
    <Avatar
      src={src}
      classNames={{
        placeholder: tw(ignoreTheme && 'bg-gray-700 text-gray-600'),
      }}
    >
      {!src && userName && userName.slice(0, 1)}
    </Avatar>
  );
};

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
  truncate?: boolean;
}

const UserProfileSkeleton = () => {
  const ignoreTheme = useContext(IgnoreThemeContext);

  return (
    <Stack className="w-full gap-0">
      <ThemeSkeleton ignoreTheme={ignoreTheme} className="h-6" />
      <ThemeSkeleton ignoreTheme={ignoreTheme} className="h-6" />
    </Stack>
  );
};

const UserProfile = ({ userName, userEmail, truncate }: UserProfileProps) => {
  const ignoreTheme = useContext(IgnoreThemeContext);

  if (!userName || !userEmail) return <UserProfileSkeleton />;

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

interface UserInfoProps {
  children?: React.ReactNode;
  ignoreTheme?: boolean;
}

const UserInfo = ({ children, ignoreTheme }: UserInfoProps) => {
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
