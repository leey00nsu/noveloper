import { Button, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { BsFolderPlus, BsLightbulb } from 'react-icons/bs';
import { MdArrowOutward } from 'react-icons/md';

import ContentWrapper from '../common/content-wrapper';

const Home = () => {
  const MOCK_CONTENTS = [
    { label: '사용 가이드', icon: <BsLightbulb /> },
    { label: '새로운 소설 생성', icon: <BsFolderPlus /> },
  ];

  return (
    <ContentWrapper>
      <Stack className="w-full max-w-xl">
        <Title order={2} className="mt-sm text-center">
          Noveloper에 오신 것을 환영합니다!
        </Title>

        <Text className="text-center text-gray-600">
          Noveloper와 함께 소설을 쓰고 관리해보세요.
        </Text>

        <Stack className="gap-sm">
          {MOCK_CONTENTS.map((content) => (
            <Button
              href="/dashboard/guide"
              component={Link}
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
    </ContentWrapper>
  );
};

export default Home;
