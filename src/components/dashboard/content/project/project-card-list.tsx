'use client';

import { useGetProjects } from '@/hooks/project/use-project-service';

import Card from '../common/card/card';
import CardList from '../common/card/card-list';

const ProjectCardList = () => {
  const { projects, isFetching } = useGetProjects();

  return (
    <CardList showSkeleton={isFetching}>
      {projects?.map((project) => (
        <Card
          title={project.title}
          href={`/dashboard/project/${project.id}`}
          key={project.id}
        >
          <Card.Text>{project.author}</Card.Text>
          <Card.Text>{project.synopsis}</Card.Text>
          <Card.Text>{project.janres.join(', ')}</Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default ProjectCardList;
