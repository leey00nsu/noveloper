'use client';

import { ActionIcon } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { IoMdRefresh } from 'react-icons/io';

import { characterQueryKeys } from '@/hooks/character/use-character-service';

const CharacterListRefreshButton = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: characterQueryKeys.characters(projectId as string),
    });
  };

  return (
    <ActionIcon className="h-full" onClick={refreshHandler}>
      <IoMdRefresh />
    </ActionIcon>
  );
};

export default CharacterListRefreshButton;
