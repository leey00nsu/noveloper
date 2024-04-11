'use client';

import { Title } from '@mantine/core';
import { useParams } from 'next/navigation';

import { useGetProjectById } from '@/hooks/project/use-project-service';

import ContentWrapper from '../../common/content-wrapper';

const ProjectHome = () => {
  const { projectId } = useParams();

  const { project } = useGetProjectById(projectId as string);

  return (
    <ContentWrapper>
      <Title order={2} className="mt-sm text-center">
        {project?.title}
      </Title>
    </ContentWrapper>
  );
};

export default ProjectHome;
