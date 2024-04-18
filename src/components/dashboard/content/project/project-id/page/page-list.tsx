import { Stack } from '@mantine/core';

import ContentWrapper from '../../../common/wrapper/content-wrapper';
import PageCardList from './page-card-list';
import PageNavigation from './page-navigation';

const PageList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <PageNavigation />
        <PageCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default PageList;
