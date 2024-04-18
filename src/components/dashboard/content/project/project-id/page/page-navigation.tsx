'use client';

import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import SearchInput from '@/components/ui/input/search-input';

import PageListRefreshButton from './page-list-refresh-button';

const PageNavigation = () => {
  const { projectId } = useParams();

  return (
    <Group>
      <SearchInput placeholder="페이지를 검색해보세요." />
      <PageListRefreshButton />
      <Button
        component={Link}
        href={`/dashboard/project/${projectId}/page/new`}
      >
        새로운 페이지 생성
      </Button>
    </Group>
  );
};

export default PageNavigation;
