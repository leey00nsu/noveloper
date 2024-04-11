'use client';

import { useGetProjects } from '@/hooks/project/use-project-service';
import { SimpleGrid } from '@mantine/core';

import ProjectCard from './project-card';

const ProjectListSkeleton = () => {
  return (
    <SimpleGrid
      cols={{
        xs: 1,
        lg: 2,
      }}
    >
      <ProjectCard.Skeleton />
      <ProjectCard.Skeleton />
    </SimpleGrid>
  );
};

const ProjectList = () => {
  const { projects, isFetching } = useGetProjects();

  if (isFetching) return <ProjectListSkeleton />;

  return (
    <SimpleGrid
      cols={{
        xs: 1,
        lg: 2,
      }}
    >
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
};

export default ProjectList;
