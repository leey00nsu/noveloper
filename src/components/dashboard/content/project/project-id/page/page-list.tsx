import { Stack, Title } from '@mantine/core';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import PageCardList from './page-card-list';
import PageNavigation from './page-navigation';

const PageList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <Title order={2}>페이지 목록</Title>
        <PageNavigation />
        <PageCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default PageList;
