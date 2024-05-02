'use client';

import { parseDate } from '@/libs/parse-date';

import { useGetProjects } from '@/hooks/project/use-project-service';
import useFilter from '@/hooks/use-filter';

import { PROJECT_ORDER_BY, ProjectOrderBy } from '@/types/project';

import Card from '../common/card/card';
import CardList from '../common/card/card-list';

const ProjectCardList = () => {
  const { currentFilter, currentOrder } = useFilter<ProjectOrderBy>({
    filters: PROJECT_ORDER_BY,
  });

  const { projects, isFetching } = useGetProjects({
    orderBy: currentFilter,
    order: currentOrder,
  });

  return (
    <CardList showSkeleton={isFetching}>
      {projects?.length === 0 && (
        <Card title="프로젝트가 없습니다.">
          <Card.Text>새로운 프로젝트를 생성해보세요.</Card.Text>
        </Card>
      )}
      {projects?.map((project) => (
        <Card
          title={project.title}
          href={`/dashboard/project/${project.id}`}
          key={project.id}
        >
          <Card.Text>{project.author}</Card.Text>
          <Card.Text>{project.synopsis}</Card.Text>
          <Card.Text>{project.janres.join(', ')}</Card.Text>
          <Card.Text className="font-light">
            {parseDate(project.createdAt)} 에 생성됨
          </Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default ProjectCardList;
