import { Button, Group, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';

import ContentWrapper from '../common/content-wrapper';
import ProjectList from './project-list';

const Project = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <Group>
          <TextInput
            leftSection={<FaSearch />}
            placeholder="프로젝트를 검색해보세요."
            className="grow"
          />
          <Button component={Link} href="/dashboard/new-project">
            새로운 프로젝트 생성
          </Button>
        </Group>

        <Suspense fallback={<ProjectList.Skeleton />}>
          <ProjectList />
        </Suspense>
      </Stack>
    </ContentWrapper>
  );
};

export default Project;
