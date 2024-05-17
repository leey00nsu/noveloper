'use client';

import { Box, Stack, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { useGetTimelines } from '@/hooks/timeline/use-timeline-service';

import TimeLineItem from './time-line-item';

const TimeLineListSkeleton = () => {
  return (
    <>
      <TimeLineItem.Skeleton />
      <TimeLineItem.Skeleton />
      <TimeLineItem.Skeleton />
      <TimeLineItem.Skeleton />
      <TimeLineItem.Skeleton />
    </>
  );
};

const TimeLineList = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState('');
  const { projectId } = useParams<{ projectId: string }>();
  const { ref, inViewport } = useInViewport();

  const {
    timelines,
    isLoading: isTimelinesLoading,
    isFetching: isTimelinesFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetTimelines({
    projectId: projectId || '',
    cursor: 0,
  });

  const selectTimelineId = (timelineId: string) => {
    setSelectedTimelineId(timelineId);
  };

  useEffect(() => {
    if (!isTimelinesFetching && inViewport) {
      fetchNextPage();
    }
  }, [isTimelinesFetching, inViewport, fetchNextPage]);

  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      {isTimelinesFetching && !isTimelinesLoading && !isFetchingNextPage && (
        <TimeLineItem.Skeleton />
      )}
      {timelines?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.data?.map((timeline) => (
            <TimeLineItem
              key={timeline.id}
              timeline={timeline}
              selectTimelineId={selectTimelineId}
              selectedTimelineId={selectedTimelineId}
            />
          ))}
        </Fragment>
      ))}
      {(isTimelinesFetching || isFetchingNextPage) && <TimeLineListSkeleton />}
      <Box ref={ref} className="h-9" />
    </Stack>
  );
};

export default TimeLineList;
