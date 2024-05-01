'use client';

import { useState } from 'react';

import FilterMenuButton from '@/components/ui/button/filter-menu-button';

const FILTERS = ['프로젝트 이름', '작가 이름', '시간'];

const ProjectFilterButton = () => {
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

export default ProjectFilterButton;
