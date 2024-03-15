import { Box, Button, Center, Stack, Text, Title } from '@mantine/core';
import { BsFolderPlus, BsLightbulb } from 'react-icons/bs';
import { MdArrowOutward } from 'react-icons/md';

const Home = () => {
  const MOCK_CONTENTS = [
    { label: '사용 가이드', icon: <BsLightbulb /> },
    { label: '새로운 소설 생성', icon: <BsFolderPlus /> },
  ];

  return (
    <Box className="h-full w-[800px]">
      <Center className="h-full w-full">
        <Stack>
          <Title order={2} className="mt-sm text-center">
            Noveloper에 오신 것을 환영합니다!
          </Title>

          <Text className="text-center text-gray-600">
            Noveloper와 함께 소설을 쓰고 관리해보세요.
          </Text>

          <Stack className="gap-sm">
            {MOCK_CONTENTS.map((content) => (
              <Button
                key={content.label}
                size="lg"
                variant="light"
                justify="space-between"
                leftSection={content.icon}
                rightSection={<MdArrowOutward />}
              >
                <Text className="text-center">{content.label}</Text>
              </Button>
            ))}
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
