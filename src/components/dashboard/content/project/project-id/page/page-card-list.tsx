'use client';

import { useParams } from 'next/navigation';

import { parseDate } from '@/libs/parse-date';

import { useGetPages } from '@/hooks/page/use-page-service';

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
