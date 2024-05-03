'use client';

import { useParams, useRouter } from 'next/navigation';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useFilter from '@/hooks/use-search-filter';

import { CHARACTER_ORDER_BY, CharacterOrderBy } from '@/types/character';

const FILTERS = [
  {
    label: '이름',
    value: 'name',
  },
  {
    label: '시간',
    value: 'createdAt',
  },
];

const CharacterFilterButton = () => {
  const { projectId } = useParams();
  const router = useRouter();
  const { currentFilter, currentOrder } = useFilter<CharacterOrderBy>({
    filters: CHARACTER_ORDER_BY,
  });

  const changeFilterHandler = (filter: string) => {
    router.push(
      `/dashboard/project/${projectId}/character?order-by=${filter}&order=${currentOrder}`,
    );
  };

  const toggleOrderHandler = () => {
    const order = currentOrder === 'asc' ? 'desc' : 'asc';

    router.push(
      `/dashboard/project/${projectId}/character?order-by=${currentFilter}&order=${order}`,
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

export default CharacterFilterButton;
