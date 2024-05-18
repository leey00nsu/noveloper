'use client';

import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import PageFilterButton from './page-filter-button';
import PageListRefreshButton from './page-list-refresh-button';
import PageSearchInput from './page-search-input';

const PageNavigation = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <Group>
      <PageSearchInput />
      <PageListRefreshButton />
      <PageFilterButton />
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
