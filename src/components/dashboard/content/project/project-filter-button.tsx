'use client';

import { useRouter } from 'next/navigation';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useFilter from '@/hooks/use-filter';

import { PROJECT_ORDER_BY, ProjectOrderBy } from '@/types/project';

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
  const router = useRouter();
  const { currentFilter, currentOrder } = useFilter<ProjectOrderBy>({
    filters: PROJECT_ORDER_BY,
  });

  const changeFilterHandler = (filter: string) => {
    router.push(`/dashboard/project?order-by=${filter}&order=${currentOrder}`);
  };

  const toggleOrderHandler = () => {
    const order = currentOrder === 'asc' ? 'desc' : 'asc';

    router.push(`/dashboard/project?order-by=${currentFilter}&order=${order}`);
  };

  return (
    <FilterMenuButton
      filters={FILTERS}
      currentFilter={currentFilter}
      currentOrder={currentOrder}
      onChageFilter={changeFilterHandler}
      onToggleOrder={toggleOrderHandler}
    />
  );
};

export default ProjectFilterButton;
