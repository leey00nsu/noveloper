import { Button, Group, Stack, TextInput } from '@mantine/core';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import ContentWrapper from '../common/content-wrapper';
import ProjectCardList from './project-card-list';
import ProjectListRefreshButton from './project-list-refresh-button';

const ProjectList = () => {
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
          <Button component={Link} href="/dashboard/project/new">
            새로운 프로젝트 생성
          </Button>
        </Group>

        <ProjectCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default ProjectList;
