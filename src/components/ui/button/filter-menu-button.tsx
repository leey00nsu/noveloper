'use client';

import { Button, Menu, Switch } from '@mantine/core';
import { IoFilter } from 'react-icons/io5';
import { TbCheck } from 'react-icons/tb';

import { Order } from '@/types/api';

interface FilterMenuButtonProps {
  filters: { label: string; value: string }[];
  currentFilter: string;
  currentOrder: Order;
  onChageFilter: (filter: string) => void;
  onToggleOrder: () => void;
}

const FilterMenuButton = ({
  filters,
  currentFilter,
  currentOrder,
  onChageFilter,
  onToggleOrder,
}: FilterMenuButtonProps) => {
  const clickFilterHanlder = (filter: string) => {
    onChageFilter(filter);
  };

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Button leftSection={<IoFilter />}>필터</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Switch
            checked={currentOrder === 'asc'}
            onChange={onToggleOrder}
            labelPosition="left"
            label="오름차순"
          />
        </Menu.Label>

        {filters.map((filter) => (
          <Menu.Item
            key={filter.value}
            onClick={() => clickFilterHanlder(filter.value)}
            rightSection={currentFilter === filter.value ? <TbCheck /> : null}
          >
            {filter.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterMenuButton;
