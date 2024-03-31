import UserInfo from '@/components/ui/user-info/user-info';
import { Box } from '@mantine/core';
import Link from 'next/link';

const UserMenu = () => {
  return (
    <Box href="/dashboard/profile" component={Link} className="p-sm">
      <UserInfo ignoreTheme>
        <UserInfo.Avatar userName="User" />
        <UserInfo.Profile
          truncate
          userName="User"
          userEmail="testName@testName.com"
        />
      </UserInfo>
    </Box>
  );
};

export default UserMenu;
