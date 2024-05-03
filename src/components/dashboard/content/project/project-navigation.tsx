import { Button, Group } from '@mantine/core';
import Link from 'next/link';

import ProjectFilterButton from './project-filter-button';
import ProjectListRefreshButton from './project-list-refresh-button';
import ProjectSearchInput from './project-search-input';

const ProjectNavigation = () => {
  return (
    <Group>
      <ProjectSearchInput />
      <ProjectListRefreshButton />
      <ProjectFilterButton />
      <Button component={Link} href="/dashboard/project/new">
        새로운 프로젝트 생성
      </Button>
    </Group>
  );
};

export default ProjectNavigation;
