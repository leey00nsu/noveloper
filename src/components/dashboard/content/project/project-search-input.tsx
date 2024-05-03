'use client';

import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';

import SearchInput from '@/components/ui/input/search-input';

import useSearchFilter from '@/hooks/use-search-filter';

import { ProjectOrderBy, ProjectOrderBySchema } from '@/types/project';

const ProjectSearchInput = () => {
  const { currentSearch, changeSearch } = useSearchFilter<ProjectOrderBy>({
    filterSchema: ProjectOrderBySchema,
  });
  const [value, setValue] = useDebouncedState(currentSearch, 400);

  useEffect(() => {
    changeSearch(value);
  }, [changeSearch, value]);

  return (
    <SearchInput
      defaultValue={currentSearch}
      placeholder="프로젝트를 검색해보세요."
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
    />
  );
};

export default ProjectSearchInput;
