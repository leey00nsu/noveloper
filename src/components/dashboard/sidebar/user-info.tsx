import { Avatar, Box, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';

const UserInfo = () => {
  return (
    <Box href="/dashboard/profile" component={Link} className="p-sm">
      <Group
        wrap="nowrap"
        className="rounded bg-gray-800 p-sm"
        justify="space-between"
      >
        <Avatar
          src={null}
          classNames={{
            placeholder: 'bg-gray-700 text-gray-600',
          }}
        >
          TN
        </Avatar>
        <Stack className="gap-0 overflow-hidden">
          <Text truncate="end" className="font-bold text-white">
            Test Name
          </Text>
          <Text truncate="end" className="text-sm text-white">
            testname@gmail.comtestname@gmail.comtestname@gmail.com
          </Text>
        </Stack>
      </Group>
    </Box>
  );
};

export default UserInfo;
