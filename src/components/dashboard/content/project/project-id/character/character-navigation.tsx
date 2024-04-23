'use client';

import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import SearchInput from '@/components/ui/input/search-input';

import CharacterListRefreshButton from './character-list-refresh-button';

const CharacterNavigation = () => {
  const { projectId } = useParams();

  return (
    <Group>
      <SearchInput placeholder="인물을 검색해보세요." />
      <CharacterListRefreshButton />
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
