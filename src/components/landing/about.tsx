import { Box, Center, Group, Stack, Text, Title } from '@mantine/core';
import dashboard from '@public/dashboard.webp';

import FadeImage from '../ui/image/fade-image';

const About = () => {
  return (
    <Box className="h-[800px] ">
      <Center className="h-full w-full p-20">
        <Group
          className="h-full w-full max-w-[75em]"
          wrap="nowrap"
          justify="space-between"
        >
          <Box className="relative hidden h-full w-full max-w-[500px] overflow-hidden rounded-2xl xl:block ">
            {/* TODO: 이미지 교체 */}
            <FadeImage
              src={dashboard}
              alt="dashboard"
              fill
              className="object-contain"
            />
          </Box>
          <Stack className="w-full gap-sm">
            <Stack className="w-full text-center xl:text-end">
              <Title order={2} className="text-3xl sm:text-5xl">
                AI 기반 소설 창작 플랫폼
              </Title>
            </Stack>

            <Stack className="w-full text-center xl:text-end">
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                Noveloper는 AI 기반 소설 창작 플랫폼입니다.
              </Text>
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                창작 과정을 더욱 효율적으로 이끌어낼 수 있는 대시보드를
                제공합니다
              </Text>
            </Stack>
          </Stack>
        </Group>
      </Center>
    </Box>
  );
};

export default About;
