import { Stack, Title } from '@mantine/core';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import ProjectCardList from './project-card-list';
import ProjectNavigation from './project-navigation';

const ProjectList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <Title order={2}>프로젝트 목록</Title>
        <ProjectNavigation />
        <ProjectCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default ProjectList;
