import { Avatar, Box, Group, Stack, Text } from '@mantine/core';

const UserInfo = () => {
  return (
    <Box className="p-sm">
      <Group className="p-sm rounded bg-gray-800" justify="center">
        <Avatar src={null} color="white">
          TN
        </Avatar>
        <Stack className="gap-0">
          <Text className="font-bold text-white">Test Name</Text>
          <Text className="text-sm text-white">testname@gmail.com</Text>
        </Stack>
      </Group>
    </Box>
  );
};

export default UserInfo;