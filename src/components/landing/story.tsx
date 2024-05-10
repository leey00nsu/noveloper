import { Box, Center, Group, Stack, Text, Title } from '@mantine/core';
import story from '@public/story.webp';

import FadeImage from '../ui/image/fade-image';

const Story = () => {
  return (
    <Box className="h-[400px] ">
      <Center className="h-full w-full ">
        <Group
          className="h-full w-full max-w-[75em]"
          wrap="nowrap"
          justify="space-between"
        >
          <Box className="relative hidden h-full w-full max-w-[500px] overflow-hidden rounded-2xl xl:block ">
            {/* TODO: 이미지 교체 */}
            <FadeImage
              src={story}
              alt="story"
              fill
              className="object-contain"
            />
          </Box>
          <Stack className="w-full gap-sm">
            <Stack className="w-full text-center xl:text-end">
              <Title order={3} className="text-xl sm:text-3xl">
                스토리 작성, 관리도 AI와 함께
              </Title>
            </Stack>

            <Stack className="w-full text-center xl:text-end">
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                AI와 함께 페이지를 작성하고 스토리를 관리해보세요.
              </Text>
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                작성한 내용을 쉽게 txt, pdf로 내보낼 수 있습니다.
              </Text>
            </Stack>
          </Stack>
        </Group>
      </Center>
    </Box>
  );
};

export default Story;
