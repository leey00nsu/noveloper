'use client';

import { Stack, Table, Text, Title } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import { parseDate } from '@/libs/parse-date';

import { useGetHistoriesByDate } from '@/hooks/history/use-history-service';

import ContentWrapper from '../../../common/wrapper/content-wrapper';

const ProjectTimelineSkeleton = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm ">
        <ThemeSkeleton className="h-6" />
        <ThemeSkeleton className="h-6" />

        <ThemeSkeleton className="grow" />
      </Stack>
    </ContentWrapper>
  );
};

const ProjectTimeline = () => {
  const { projectId, date } = useParams();
  const router = useRouter();

  const { histories, isFetching } = useGetHistoriesByDate({
    projectId: projectId as string,
    date: date as string,
  });

  useEffect(() => {
    if (isFetching) return;

    if (!histories) {
      router.push(`/dashboard/project/${projectId}`);
    }
  }, [histories, projectId, router, isFetching]);

  if (!histories || isFetching) return <ProjectTimelineSkeleton />;

  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm ">
        <Title order={2}>{date}</Title>
        <Text>{histories.length} 개의 타임라인이 있습니다.</Text>

        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>시간</Table.Th>
              <Table.Th>제목</Table.Th>
              <Table.Th>내용</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {histories.map((history) => (
              <Table.Tr key={history.id}>
                <Table.Td>{parseDate(history.createdAt, 'ko')}</Table.Td>
                <Table.Td>{history.title}</Table.Td>
                <Table.Td>{history.content.split('\\n').join(' ')}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </ContentWrapper>
  );
};

export default ProjectTimeline;
