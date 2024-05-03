'use client';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

import useSearchFilter from '@/hooks/use-search-filter';

import { PageOrderBy, PageOrderBySchema } from '@/types/page';

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
  const { currentFilter, currentOrder, changeFilter, toggleOrder } =
    useSearchFilter<PageOrderBy>({
      filterSchema: PageOrderBySchema,
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

export default PageFilterButton;
