import { Button, Stack } from '@mantine/core';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import Editor from './editor';

const NewPage = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <Editor />
        <Stack align="center">
          <Button>페이지 추가</Button>
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default NewPage;
