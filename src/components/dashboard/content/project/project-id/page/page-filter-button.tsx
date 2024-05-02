'use client';

import { useParams, useRouter } from 'next/navigation';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useFilter from '@/hooks/use-filter';

import { PAGE_ORDER_BY, PageOrderBy } from '@/types/page';

const FILTERS = [
  {
    label: '제목',
    value: 'title',
  },
  {
    label: '시간',
    value: 'createdAt',
  },
];

const PageFilterButton = () => {
  const { projectId } = useParams();
  const router = useRouter();
  const { currentFilter, currentOrder } = useFilter<PageOrderBy>({
    filters: PAGE_ORDER_BY,
  });

  const changeFilterHandler = (filter: string) => {
    router.push(
      `/dashboard/project/${projectId}/page?order-by=${filter}&order=${currentOrder}`,
    );
  };

  const toggleOrderHandler = () => {
    const order = currentOrder === 'asc' ? 'desc' : 'asc';

    router.push(
      `/dashboard/project/${projectId}/page?order-by=${currentFilter}&order=${order}`,
    );
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

export default PageFilterButton;
