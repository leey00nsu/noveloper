'use client';

import { Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  useGetHistories,
  useGetHistoriesById,
} from '@/hooks/history/use-history-service';

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
  const [selectedHistoryId, setSelectedHistoryId] = useState('');
  const { projectId } = useParams();

  const { histories, isLoading: isHistoriesLoading } = useGetHistories();
  const {
    histories: filteredHistories,
    isLoading: isFilteredHistoriesLoading,
  } = useGetHistoriesById({ projectId: projectId as string });

  const selectHistoryId = (historyId: string) => {
    setSelectedHistoryId(historyId);
  };

  const showingHistories = projectId
    ? filteredHistories?.toReversed()
    : histories?.toReversed();

  if (isHistoriesLoading || isFilteredHistoriesLoading) {
    return <TimeLineListSkeleton />;
  }

  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      {showingHistories?.map((history) => (
        <TimeLineItem
          key={history.id}
          history={history}
          selectHistoryId={selectHistoryId}
          selectedHistoryId={selectedHistoryId}
        />
      ))}
    </Stack>
  );
};

export default TimeLineList;
