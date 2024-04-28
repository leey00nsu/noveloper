'use client';

import { Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  useGetHistories,
  useGetHistoriesById,
} from '@/hooks/history/use-history-service';
import useModal from '@/hooks/use-modal';

import TimeLineModal from '../../modal/timeline/time-line-modal';
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
  const { isModalOpen, openModal, closeModal } = useModal();

  const { histories, isLoading: isHistoriesLoading } = useGetHistories();
  const {
    histories: filteredHistories,
    isLoading: isFilteredHistoriesLoading,
  } = useGetHistoriesById(projectId as string);

  const selectHistoryId = (historyId: string) => {
    setSelectedHistoryId(historyId);
  };

  const showingHistories = projectId
    ? filteredHistories?.toReversed()
    : histories?.toReversed();

  const selectedHistory = showingHistories?.find(
    (history) => history.id === selectedHistoryId,
  );

  if (isHistoriesLoading || isFilteredHistoriesLoading) {
    return <TimeLineListSkeleton />;
  }

  return (
    <Stack className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      <TimeLineModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedHistory={selectedHistory}
      />
      {showingHistories?.map((history) => (
        <TimeLineItem
          key={history.id}
          history={history}
          selectHistoryId={selectHistoryId}
          selectedHistoryId={selectedHistoryId}
          openModal={openModal}
        />
      ))}
    </Stack>
  );
};

export default TimeLineList;
