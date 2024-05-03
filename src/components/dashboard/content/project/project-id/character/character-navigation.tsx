'use client';

import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import CharacterFilterButton from './character-filter-button';
import CharacterListRefreshButton from './character-list-refresh-button';
import CharacterSearchInput from './character-search-input';

const CharacterNavigation = () => {
  const { projectId } = useParams();

  return (
    <Group>
      <CharacterSearchInput />
      <CharacterListRefreshButton />
      <CharacterFilterButton />
      <Button
        component={Link}
        href={`/dashboard/project/${projectId}/character/new`}
      >
        새로운 인물 생성
      </Button>
    </Group>
  );
};

export default CharacterNavigation;
