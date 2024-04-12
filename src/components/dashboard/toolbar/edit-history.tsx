'use client';

import { Button, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import tw from '@/libs/tw';

import { useGetHistories } from '@/hooks/history/use-history-service';

const EditHistory = () => {
  const { histories } = useGetHistories();
  const [selectedHistory, setSelectedHistory] = useState('');

  return (
    <Stack className="p-sm ">
      <Text className="px-md text-sm font-bold text-gray-600">타임라인</Text>
      {histories?.map((history) => (
        <Button
          onClick={() => setSelectedHistory(history.id)}
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
      ))}
    </Stack>
  );
};

export default EditHistory;
