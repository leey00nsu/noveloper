'use client';

import { Text } from '@mantine/core';
import { useParams } from 'next/navigation';

import Card from '@/components/ui/card/card';
import CardList from '@/components/ui/card/card-list';

import { parseDate } from '@/libs/parse-date';

import { useGetPages } from '@/hooks/page/use-page-service';
import useSearchFilter from '@/hooks/use-search-filter';

import { PageOrderBy, PageOrderBySchema } from '@/types/page';

const PageCardList = () => {
  const { projectId } = useParams();
  const { currentFilter, currentOrder, currentSearch } =
    useSearchFilter<PageOrderBy>({
      filterSchema: PageOrderBySchema,
    });

  const { pages, isFetching } = useGetPages({
    projectId: projectId as string,
    orderBy: currentFilter,
    order: currentOrder,
    search: currentSearch,
  });

  const isNotFound = currentSearch && pages?.length === 0;
  const isNoData = !currentSearch && pages?.length === 0;

  return (
    <CardList showSkeleton={isFetching}>
      {isNotFound && <Text>검색 결과가 없습니다.</Text>}
      {isNoData && (
        <Card title="페이지가 없습니다.">
          <Card.Text>새로운 페이지를 생성해보세요.</Card.Text>
        </Card>
      )}
      {pages?.map((page) => (
        <Card
          title={page.title}
          href={`/dashboard/project/${projectId}/page/${page.id}`}
          key={page.id}
        >
          <Card.Text>{page.summary}</Card.Text>
          <Card.Text className="font-light">
            {parseDate(page.updatedAt)} 에 마지막으로 수정됨
          </Card.Text>
          <Card.Text className="font-light">
            {parseDate(page.createdAt)} 에 생성됨
          </Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default PageCardList;
