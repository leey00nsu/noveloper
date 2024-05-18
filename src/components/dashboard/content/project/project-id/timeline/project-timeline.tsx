'use client';

import { Stack, Table, Text, Title } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { parseDate } from '@/libs/parse-date';

import { useGetTimelinesByDate } from '@/hooks/timeline/use-timeline-service';

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
  const { projectId, date } = useParams<{ projectId: string; date: string }>();
  const router = useRouter();

  const { timelines, isFetching } = useGetTimelinesByDate({
    projectId,
    date,
  });

  useEffect(() => {
    if (isFetching) return;

    if (!timelines) {
      router.push(`/dashboard/project/${projectId}`);
    }
  }, [timelines, projectId, router, isFetching]);

  if (!timelines || isFetching) return <ProjectTimelineSkeleton />;

  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm ">
        <Title order={2}>{date}</Title>
        <Text>{timelines.length} 개의 타임라인이 있습니다.</Text>

        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>시간</Table.Th>
              <Table.Th>제목</Table.Th>
              <Table.Th>내용</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {timelines.map((history) => (
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
