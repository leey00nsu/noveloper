import { Stack } from '@mantine/core';

import ContentWrapper from '../common/wrapper/content-wrapper';
import ProjectCardList from './project-card-list';
import ProjectNavigation from './project-navigation';

const ProjectList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <ProjectNavigation />
        <ProjectCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default ProjectList;
