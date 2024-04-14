import { Box, Progress, Text } from '@mantine/core';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import { useGetUser } from '@/hooks/user/use-user-service';

import { PLANS } from '@/constants/plan/plan';

const TokenStatusSkeleton = () => {
  return (
    <Box className="px-md">
      <Text className="text-sm font-bold text-gray-600">토큰</Text>
      <ThemeSkeleton ignoreTheme className="h-6" />
      <ThemeSkeleton ignoreTheme className="mt-md h-3" />
    </Box>
  );
};

const TokenStatus = () => {
  const { user } = useGetUser();

  if (!user) return <TokenStatusSkeleton />;

  return (
    <Box className="px-md">
      <Text className="text-sm font-bold text-gray-600">토큰</Text>
      <Text className="text-base text-white">
        {user.token} / {PLANS[user.plan_id].token}
      </Text>
      <Progress
        value={(user.token / PLANS[user.plan_id].token) * 100}
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
