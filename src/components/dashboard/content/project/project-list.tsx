'use client';

import useGetProjects from '@/hooks/project/use-get-projects';
import { SimpleGrid } from '@mantine/core';

import ProjectCard from './project-card';

const ProjectList = () => {
  const { projects } = useGetProjects();

  return (
    <SimpleGrid
      cols={{
        xs: 1,
        lg: 2,
      }}
    >
      {!projects && <ProjectCard.Skeleton />}
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
};

export default ProjectList;
