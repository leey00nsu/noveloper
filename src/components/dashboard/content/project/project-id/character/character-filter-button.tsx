'use client';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useSearchFilter from '@/hooks/use-search-filter';

import { CharacterOrderBy, CharacterOrderBySchema } from '@/types/character';

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
  const { currentFilter, currentOrder, changeFilter, toggleOrder } =
    useSearchFilter<CharacterOrderBy>({
      filterSchema: CharacterOrderBySchema,
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

export default CharacterFilterButton;
