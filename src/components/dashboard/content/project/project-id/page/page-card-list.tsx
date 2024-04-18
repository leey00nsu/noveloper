'use client';

import { useParams } from 'next/navigation';

import { useGetPages } from '@/hooks/page/use-page-service copy';

import Card from '../../../common/card/card';
import CardList from '../../../common/card/card-list';

const PageCardList = () => {
  const { projectId } = useParams();
  const { pages, isFetching } = useGetPages({
    projectId: projectId as string,
  });

  return (
    <CardList showSkeleton={isFetching}>
      {pages?.map((page) => (
        <Card
          title={page.title}
          href={`/dashboard/${projectId}/page/${page.id}`}
          key={page.id}
        >
          <Card.Text>{page.title}</Card.Text>
          <Card.Text>{page.createdAt.toISOString()}</Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default PageCardList;
