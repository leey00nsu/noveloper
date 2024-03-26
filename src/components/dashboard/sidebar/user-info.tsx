import { Avatar, Box, Group, Stack, Text } from '@mantine/core';

const UserInfo = () => {
  return (
    <Box className="p-sm">
      <Group
        grow
        preventGrowOverflow={false}
        wrap="nowrap"
        className="rounded bg-gray-800 p-sm"
        justify="space-between"
      >
        <Avatar src={null} color="white">
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
