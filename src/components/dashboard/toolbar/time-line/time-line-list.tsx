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
  const { projectId } = useParams();

  const { histories, isLoading: isHistoriesLoading } = useGetHistories();
  const {
    histories: filteredHistories,
    isLoading: isFilteredHistoriesLoading,
  } = useGetHistoriesById(projectId as string);
  const [selectedHistory, setSelectedHistory] = useState('');

  const selectHistory = (historyId: string) => {
    setSelectedHistory(historyId);
  };

  const showingHistories = projectId ? filteredHistories : histories;

  if (isHistoriesLoading || isFilteredHistoriesLoading) {
    return <TimeLineListSkeleton />;
  }

  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      {showingHistories?.map((history) => (
        <TimeLineItem
          history={history}
          key={history.id}
          selectHistory={selectHistory}
          selectedHistory={selectedHistory}
        />
      ))}
    </Stack>
  );
};

export default TimeLineList;
