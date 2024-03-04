import { Box, Button, Center, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';

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
        <Stack hiddenFrom="xl" gap={30}>
          <Stack>
            <Text ta="center" className="text-5xl" fw={700}>
              AI 기반 소설 창작 플랫폼
            </Text>
            <Text ta="center" className="text-5xl" fw={700}>
              Noveloper
            </Text>
          </Stack>

          <Stack>
            <Text size="xl" c="gray.9" fw={500}>
              AI와 함께하는 소설 쓰기, 당신의 이야기를 더욱 특별하게
              만들어보세요.
            </Text>
          </Stack>

          <Group justify="center">
            <Button radius="xl" variant="outline" color="gray.9" size="lg">
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
              <Text className="text-5xl" fw={700}>
                AI 기반 소설 창작 플랫폼
              </Text>
              <Text className="text-5xl" fw={700}>
                Noveloper
              </Text>
            </Stack>

            <Stack>
              <Text size="xl" c="gray.9" fw={500}>
                AI와 함께하는 소설 쓰기, 당신의 이야기를 더욱 특별하게
                만들어보세요.
              </Text>
            </Stack>

            <Group>
              <Button radius="xl" variant="outline" color="gray.9" size="lg">
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
