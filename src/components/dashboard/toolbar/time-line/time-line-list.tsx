'use client';

import { Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  useGetTimelines,
  useGetTimelinesById,
} from '@/hooks/timeline/use-timeline-service';

import TimeLineItem from './time-line-item';

const TimeLineListSkeleton = () => {
  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>

      <TimeLineItem.Skeleton />
      <TimeLineItem.Skeleton />
    </Stack>
  );
};

const TimeLineList = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState('');
  const { projectId } = useParams();

  const { timelines, isLoading: isTimelinesLoading } = useGetTimelines();
  const {
    timelines: filteredTimelines,
    isLoading: isFilteredTimelinesLoading,
  } = useGetTimelinesById({ projectId: projectId as string });

  const selectTimelineId = (timelineId: string) => {
    setSelectedTimelineId(timelineId);
  };

  const showingTimelines = projectId
    ? filteredTimelines?.toReversed()
    : timelines?.toReversed();

  if (isTimelinesLoading || isFilteredTimelinesLoading) {
    return <TimeLineListSkeleton />;
  }

  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      {showingTimelines?.map((timeline) => (
        <TimeLineItem
          key={timeline.id}
          timeline={timeline}
          selectTimelineId={selectTimelineId}
          selectedTimelineId={selectedTimelineId}
        />
      ))}
    </Stack>
  );
};

export default TimeLineList;
