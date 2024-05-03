'use client';

import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';

import SearchInput from '@/components/ui/input/search-input';

import useSearchFilter from '@/hooks/use-search-filter';

import { CharacterOrderBy, CharacterOrderBySchema } from '@/types/character';

const CharacterSearchInput = () => {
  const { currentSearch, changeSearch } = useSearchFilter<CharacterOrderBy>({
    filterSchema: CharacterOrderBySchema,
  });
  const [value, setValue] = useDebouncedState(currentSearch, 400);

  useEffect(() => {
    changeSearch(value);
  }, [changeSearch, value]);

  return (
    <SearchInput
      defaultValue={currentSearch}
      placeholder="인물을 검색해보세요."
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
    />
  );
};

export default CharacterSearchInput;
