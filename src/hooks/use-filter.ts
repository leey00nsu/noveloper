import { useSearchParams } from 'next/navigation';

import { ORDER, Order } from '@/types/api';

interface UseFilterProps {
  filters: readonly string[];
}

/**
 * 현재 url 쿼리스트링에서 현재 필터와 정렬 순서를 반환합니다.
 * 만약 없거나, 잘못된 값이라면 filters 배열의 첫번째 값과 ORDER 배열의 첫번째 값을 반환합니다.
 * @param filters
 * @returns currentFilter, currentOrder
 */
const useFilter = <T>({ filters }: UseFilterProps) => {
  const searchParams = useSearchParams();

  let currentFilter = searchParams.get('order-by') || filters[0];
  let currentOrder = searchParams.get('order') || ORDER[0];

  if (!filters.includes(currentFilter)) {
    [currentFilter] = filters;
  }

  if (!ORDER.includes(currentOrder as Order)) {
    [currentOrder] = ORDER;
  }

  return {
    currentFilter: currentFilter as T,
    currentOrder: currentOrder as Order,
  };
};

export default useFilter;
