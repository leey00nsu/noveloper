import NiceModal from '@ebay/nice-modal-react';
import { Button, Text } from '@mantine/core';
import { Histories } from '@prisma/client';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import tw from '@/libs/tw';

import TimeLineModal from '../../modal/timeline/time-line-modal';
import TimeLineMenu from './time-line-menu';

interface TimeLineItemProps {
  history: Histories;
  selectedHistoryId: string;
  selectHistoryId: (historyId: string) => void;
}

const TimeLineItemSkeleton = () => {
  return <ThemeSkeleton ignoreTheme className="h-9" />;
};

const TimeLineItem = ({
  history,
  selectHistoryId,
  selectedHistoryId,
}: TimeLineItemProps) => {
  const openModal = () => {
    NiceModal.show(TimeLineModal, {
      selectedHistory: history,
    });
  };

  return (
    <Button
      onClick={() => selectHistoryId(history.id)}
      variant="transparent"
      justify="space-between"
      color="white"
      rightSection={
        selectedHistoryId === history.id && (
          <TimeLineMenu openModal={openModal} />
        )
      }
      className={tw(
        'px-md hover:bg-gray-800',
        selectedHistoryId === history.id && 'bg-gray-800',
      )}
    >
      <Text component="span" truncate className="text-start">
        {history.title}
      </Text>
    </Button>
  );
};

TimeLineItem.Skeleton = TimeLineItemSkeleton;

export default TimeLineItem;
