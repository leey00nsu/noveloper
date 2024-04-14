import { Box } from '@mantine/core';
import Link from 'next/link';

import UserInfo from '@/components/ui/user-info/user-info';

import { useGetUser } from '@/hooks/user/use-user-service';

const UserMenu = () => {
  const { user } = useGetUser();

  return (
    <Box href="/dashboard/profile" component={Link} className="p-sm">
      <UserInfo ignoreTheme>
        <UserInfo.Avatar userName={user?.user_name} />
        <UserInfo.Profile
          truncate
          userName={user?.user_name}
          userEmail={user?.user_name}
        />
      </UserInfo>
    </Box>
  );
};

export default UserMenu;
