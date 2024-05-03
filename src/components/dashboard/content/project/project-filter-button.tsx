'use client';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useSearchFilter from '@/hooks/use-search-filter';

import { ProjectOrderBy, ProjectOrderBySchema } from '@/types/project';

const FILTERS = [
  {
    label: '프로젝트 이름',
    value: 'title',
  },
  {
    label: '작가 이름',
    value: 'author',
  },
  {
    label: '시간',
    value: 'createdAt',
  },
];

const ProjectFilterButton = () => {
  const { currentFilter, currentOrder, changeFilter, toggleOrder } =
    useSearchFilter<ProjectOrderBy>({
      filterSchema: ProjectOrderBySchema,
    });

  return (
    <FilterMenuButton
      filters={FILTERS}
      currentFilter={currentFilter}
      currentOrder={currentOrder}
      onChageFilter={changeFilter}
      onToggleOrder={toggleOrder}
    />
  );
};

export default ProjectFilterButton;
