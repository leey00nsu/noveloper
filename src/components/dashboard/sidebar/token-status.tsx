import { Box, Progress, Text } from '@mantine/core';

const TokenStatus = () => {
  const MOCK_TOKEN_MAX = 100;
  const MOCK_TOKEN_VALUE = 7;

  return (
    <Box className="px-md">
      <Text className="text-sm font-bold text-gray-600">토큰</Text>
      <Text className="text-base text-white">
        {MOCK_TOKEN_VALUE} / {MOCK_TOKEN_MAX}
      </Text>
      <Progress
        value={(MOCK_TOKEN_VALUE / MOCK_TOKEN_MAX) * 100}
        size="lg"
        radius="xl"
        className="mt-md"
        classNames={{
          root: 'bg-gray-800',
          section: 'bg-blue-600',
        }}
      />
    </Box>
  );
};

export default TokenStatus;
