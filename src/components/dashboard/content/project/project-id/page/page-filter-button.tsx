'use client';

import { useState } from 'react';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

const FILTERS = ['페이지 제목', '시간'];

const PageFilterButton = () => {
  const [currentFilter, setCurrentFilter] = useState(FILTERS[0]);
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>('asc');

  const changeFilterHandler = (filter: string) => {
    setCurrentFilter(filter);
  };

  const toggleOrderHandler = () => {
    setCurrentOrder(currentOrder === 'asc' ? 'desc' : 'asc');
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
