'use client';

import { Button, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import tw from '@/libs/tw';

const EditHistory = () => {
  const [selectedHistory, setSelectedHistory] = useState('');

  const MOCK_HISTORY = [
    { label: '작품 정보 수정' },
    { label: '인물 정보 수정' },
    { label: '회차 정보 수정' },
    { label: '배경 정보 수정 배경 정보 수정 배경 정보 수정' },
  ];

  return (
    <Stack className="p-sm ">
      <Text className="px-md text-sm font-bold text-gray-600">수정 목록</Text>
      {MOCK_HISTORY.map((history) => (
        <Button
          onClick={() => setSelectedHistory(history.label)}
          key={history.label}
          variant="transparent"
          justify="space-between"
          color="white"
          rightSection={selectedHistory === history.label && <FaTrash />}
          className={tw(
            'px-md hover:bg-gray-800',
            selectedHistory === history.label && 'bg-gray-800',
          )}
        >
          <Text component="span" truncate className="text-start">
            {history.label}
          </Text>
        </Button>
      ))}
    </Stack>
  );
};

export default EditHistory;
