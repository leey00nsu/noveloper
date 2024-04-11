import { Button, Group, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import ContentWrapper from '../common/content-wrapper';
import ProjectList from './project-list';
import ProjectListRefreshButton from './project-list-refresh-button';

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
          <ProjectListRefreshButton />
          <Button component={Link} href="/dashboard/new-project">
            새로운 프로젝트 생성
          </Button>
        </Group>

        <ProjectList />
      </Stack>
    </ContentWrapper>
  );
};

export default Project;
