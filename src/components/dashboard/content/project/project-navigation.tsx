import { Button, Group } from '@mantine/core';
import Link from 'next/link';

import SearchInput from '@/components/ui/input/search-input';

import ProjectListRefreshButton from './project-list-refresh-button';

const ProjectNavigation = () => {
  return (
    <Group>
      <SearchInput placeholder="프로젝트를 검색해보세요." />
      <ProjectListRefreshButton />
      <Button component={Link} href="/dashboard/project/new">
        새로운 프로젝트 생성
      </Button>
    </Group>
  );
};

export default ProjectNavigation;
