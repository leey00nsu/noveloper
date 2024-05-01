import NiceModal from '@ebay/nice-modal-react';
import { Button, Text } from '@mantine/core';
import { Timelines } from '@prisma/client';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import tw from '@/libs/tw';

import TimeLineModal from '../../modal/timeline/time-line-modal';
import TimeLineMenu from './time-line-menu';

interface TimeLineItemProps {
  timeline: Timelines;
  selectedTimelineId: string;
  selectTimelineId: (timelineId: string) => void;
}

const TimeLineItemSkeleton = () => {
  return <ThemeSkeleton ignoreTheme className="h-9" />;
};

const TimeLineItem = ({
  timeline,
  selectTimelineId,
  selectedTimelineId,
}: TimeLineItemProps) => {
  const openModal = () => {
    NiceModal.show(TimeLineModal, {
      selectedTimeline: timeline,
    });
  };

  return (
    <Button
      onClick={() => selectTimelineId(timeline.id)}
      variant="transparent"
      justify="space-between"
      color="white"
      rightSection={
        selectedTimelineId === timeline.id && (
          <TimeLineMenu openModal={openModal} />
        )
      }
      className={tw(
        'px-md hover:bg-gray-800',
        selectedTimelineId === timeline.id && 'bg-gray-800',
      )}
    >
      <Text component="span" truncate className="text-start">
        {timeline.title}
      </Text>
    </Button>
  );
};

TimeLineItem.Skeleton = TimeLineItemSkeleton;

export default TimeLineItem;
