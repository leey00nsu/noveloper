import { usePathname, useSearchParams } from 'next/navigation';
import { ZodSchema } from 'zod';

import { OrderSchema } from '@/types/api';

interface UseSearchFilterProps {
  filterSchema: ZodSchema;
}

/**
 * 현재 url 쿼리스트링에서 현재 필터, 정렬 순서, 검색어를 zod를 통해 유효성을 체크한 후 반환합니다.
 * filter, order, search를 변경할 수 있는 함수를 반환합니다.
 * @param filters
 * @returns
 */
const useSearchFilter = <T>({ filterSchema }: UseSearchFilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = filterSchema.parse(searchParams.get('order-by'));
  const currentOrder = OrderSchema.parse(searchParams.get('order'));
  const currentSearch = searchParams.get('search') || '';

  const changeFilter = (filter: string) => {
    const newFilter = filterSchema.parse(filter);

    if (newFilter === currentFilter) return;

    window.history.replaceState(
      {},
      '',
      `${pathname}?order-by=${newFilter}&order=${currentOrder}&search=${currentSearch}`,
    );
  };

  const toggleOrder = () => {
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

    window.history.replaceState(
      {},
      '',
      `${pathname}?order-by=${currentFilter}&order=${newOrder}&search=${currentSearch}`,
    );
  };

  const changeSearch = (search: string) => {
    if (search === currentSearch) return;

    window.history.replaceState(
      {},
      '',
      `${pathname}?order-by=${currentFilter}&order=${currentOrder}&search=${search}`,
    );
  };

  return {
    currentFilter: currentFilter as T,
    currentOrder,
    currentSearch,
    changeFilter,
    toggleOrder,
    changeSearch,
  };
};

export default useSearchFilter;
