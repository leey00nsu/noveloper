'use client';

import Card from '@/components/ui/card/card';
import CardList from '@/components/ui/card/card-list';

import { parseDate } from '@/libs/parse-date';

import { useGetProjects } from '@/hooks/project/use-project-service';
import useSearchFilter from '@/hooks/use-search-filter';

import { ProjectOrderBy, ProjectOrderBySchema } from '@/types/project';

const ProjectCardList = () => {
  const { currentFilter, currentOrder, currentSearch } =
    useSearchFilter<ProjectOrderBy>({
      filterSchema: ProjectOrderBySchema,
    });

  const { projects, isFetching } = useGetProjects({
    orderBy: currentFilter,
    order: currentOrder,
    search: currentSearch,
  });

  const isNotFound = currentSearch && projects?.length === 0;
  const isNoData = !currentSearch && projects?.length === 0;

  return (
    <CardList showSkeleton={isFetching}>
      {isNotFound && (
        <Card title="검색 결과가 없습니다.">
          <Card.Text>새로운 프로젝트를 생성해보세요.</Card.Text>
        </Card>
      )}
      {isNoData && (
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
