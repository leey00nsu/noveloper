import { Title } from '@mantine/core';
import { Projects } from '@prisma/client';

import ContentWrapper from '../common/content-wrapper';

interface ProjectHomeProps {
  project: Projects;
}

const ProjectHome = ({ project }: ProjectHomeProps) => {
  return (
    <ContentWrapper>
      <Title order={2} className="mt-sm text-center">
        {project.title}
      </Title>
    </ContentWrapper>
  );
};

export default ProjectHome;
