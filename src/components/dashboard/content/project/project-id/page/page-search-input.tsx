'use client';

import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';

import SearchInput from '@/components/ui/input/search-input';

import useSearchFilter from '@/hooks/use-search-filter';

import { PageOrderBy, PageOrderBySchema } from '@/types/page';

const PageSearchInput = () => {
  const { currentSearch, changeSearch } = useSearchFilter<PageOrderBy>({
    filterSchema: PageOrderBySchema,
  });
  const [value, setValue] = useDebouncedState(currentSearch, 400);

  useEffect(() => {
    changeSearch(value);
  }, [changeSearch, value]);

  return (
    <SearchInput
      defaultValue={currentSearch}
      placeholder="페이지를 검색해보세요."
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
    />
  );
};

export default PageSearchInput;
