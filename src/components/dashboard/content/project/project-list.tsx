import { getProjects } from '@/services/supabase/get-projects';
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

const ProjectList = async () => {
  const { data: projects } = await getProjects();

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

ProjectList.Skeleton = ProjectListSkeleton;

export default ProjectList;
