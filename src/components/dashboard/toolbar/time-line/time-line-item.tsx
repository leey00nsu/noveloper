import { Button, Text } from '@mantine/core';
import { Histories } from '@prisma/client';
import { FaTrash } from 'react-icons/fa';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import tw from '@/libs/tw';

interface TimeLineItemProps {
  history: Histories;
  selectedHistory: string;
  selectHistory: (historyId: string) => void;
}

const TimeLineItemSkeleton = () => {
  return <ThemeSkeleton ignoreTheme className="h-9" />;
};

const TimeLineItem = ({
  history,
  selectHistory,
  selectedHistory,
}: TimeLineItemProps) => {
  return (
    <Button
      onClick={() => selectHistory(history.id)}
      key={history.id}
      variant="transparent"
      justify="space-between"
      color="white"
      rightSection={selectedHistory === history.id && <FaTrash />}
      className={tw(
        'px-md hover:bg-gray-800',
        selectedHistory === history.id && 'bg-gray-800',
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