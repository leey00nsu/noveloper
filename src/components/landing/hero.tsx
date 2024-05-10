import { Box, Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import grid from '@public/grid.webp';
import hero from '@public/hero.webp';
import Link from 'next/link';

import FadeImage from '../ui/image/fade-image';

const Hero = () => {
  return (
    <Box
      style={{
        backgroundImage:
          'linear-gradient(to top,rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7))',
      }}
      className="relative h-[800px] "
    >
      <FadeImage src={grid} alt="grid" fill className="-z-10 object-cover" />
      <Center className="h-full w-full p-20">
        <Group
          className="h-full w-full max-w-[75em]"
          wrap="nowrap"
          justify="space-between"
        >
          <Stack className="w-full gap-sm">
            <Stack className="w-full items-center xl:items-start">
              <Title order={2} className="text-3xl sm:text-5xl">
                AI 기반 소설 창작 플랫폼
              </Title>
              <Title order={2} className="text-3xl sm:text-5xl">
                Noveloper
              </Title>
            </Stack>

            <Stack className="w-full items-center xl:items-start">
              <Text className="text-base font-medium text-gray-900 sm:text-xl">
                AI와 함께하는 소설 쓰기, 당신의 이야기를 더욱 특별하게
                만들어보세요.
              </Text>
            </Stack>

            <Group className="w-full justify-center xl:justify-start">
              <Button
                component={Link}
                href="/auth/signin"
                radius="xl"
                variant="outline"
                color="gray.9"
                size="lg"
              >
                로그인
              </Button>
            </Group>
          </Stack>

          <Box className="relative hidden h-full w-full max-w-[500px] overflow-hidden rounded-2xl xl:block ">
            <FadeImage src={hero} alt="hero" fill className="object-cover" />
          </Box>
        </Group>
      </Center>
    </Box>
  );
};

export default Hero;
