import { Box, Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <Box
      style={{
        backgroundImage:
          'linear-gradient(to top,rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8)),url(/grid.jpg)',
      }}
      className="h-[800px] bg-cover bg-center bg-no-repeat p-20"
    >
      <Center className="h-full w-full">
        <Stack hiddenFrom="xl" className="gap-8">
          <Stack>
            <Title order={2} className="text-center text-5xl">
              AI 기반 소설 창작 플랫폼
            </Title>
            <Title order={2} className="text-center text-5xl">
              Noveloper
            </Title>
          </Stack>

          <Stack>
            <Text className="text-xl font-medium text-gray-900">
              AI와 함께하는 소설 쓰기, 당신의 이야기를 더욱 특별하게
              만들어보세요.
            </Text>
          </Stack>

          <Group justify="center">
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

        <Group
          visibleFrom="xl"
          className="h-full w-full max-w-[75em]"
          wrap="nowrap"
          justify="space-between"
        >
          <Stack gap={30}>
            <Stack>
              <Title order={2} className="text-5xl">
                AI 기반 소설 창작 플랫폼
              </Title>
              <Title order={2} className="text-5xl">
                Noveloper
              </Title>
            </Stack>

            <Stack>
              <Text className="text-xl font-medium text-gray-900">
                AI와 함께하는 소설 쓰기, 당신의 이야기를 더욱 특별하게
                만들어보세요.
              </Text>
            </Stack>

            <Group>
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

          <Box className="relative h-full w-full max-w-[500px] overflow-hidden rounded-2xl">
            <Image src="/hero.webp" alt="Hero" fill />
          </Box>
        </Group>
      </Center>
    </Box>
  );
};

export default Hero;
