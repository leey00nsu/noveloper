'use client';

import { SimpleGrid } from '@mantine/core';

import { useGetProjects } from '@/hooks/project/use-project-service';

import ProjectCard from './project-card';

const ProjectCardListSkeleton = () => {
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

const ProjectCardList = () => {
  const { projects, isFetching } = useGetProjects();

  if (isFetching) return <ProjectCardListSkeleton />;

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

export default ProjectCardList;
