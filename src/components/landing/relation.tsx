import { Box, Center, Group, Stack, Text, Title } from '@mantine/core';
import relation from '@public/relation.webp';

import FadeNextImage from '../ui/image/fade-next-image';

const Relation = () => {
  return (
    <Box className="h-[400px] ">
      <Center className="h-full w-full ">
        <Group
          className="h-full w-full max-w-[75em]"
          wrap="nowrap"
          justify="space-between"
        >
          <Stack className="w-full gap-sm">
            <Stack className="w-full text-center xl:text-start">
              <Title order={3} className="text-xl sm:text-3xl">
                쉽고 빠른 인물 설정
              </Title>
            </Stack>

            <Stack className="w-full text-center xl:text-start">
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                인물을 생성하고 관계를 설정하는 과정을 더욱 쉽고 빠르게 할 수
                있습니다.
              </Text>
            </Stack>
          </Stack>

          <Box className="relative hidden h-full w-full max-w-[500px] overflow-hidden rounded-2xl xl:block ">
            {/* TODO: 이미지 교체 */}
            <FadeNextImage
              src={relation}
              alt="relation"
              fill
              className="object-contain"
            />
          </Box>
        </Group>
      </Center>
    </Box>
  );
};

export default Relation;
