import LinkButton from '@/components/ui/button/link-button';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';
import { Stack, Text, Title } from '@mantine/core';
import { BsFolderPlus, BsLightbulb } from 'react-icons/bs';



const Home = () => {
  const MOCK_CONTENTS = [
    { label: '사용 가이드', icon: <BsLightbulb />, href: '/dashboard/guide' },
    {
      label: '새로운 프로젝트 생성',
      icon: <BsFolderPlus />,
      href: '/dashboard/project',
    },
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
            <LinkButton
              key={content.label}
              href={content.href}
              label={content.label}
              icon={content.icon}
            />
          ))}
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default Home;
