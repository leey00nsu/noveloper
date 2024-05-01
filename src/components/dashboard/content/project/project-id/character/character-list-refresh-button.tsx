'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import RefreshButton from '@/components/ui/button/refresh-button';

import { characterQueryKeys } from '@/hooks/character/use-character-service';

const CharacterListRefreshButton = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: characterQueryKeys.characters(projectId as string),
    });
  };

  return <RefreshButton onClick={refreshHandler} />;
};

export default CharacterListRefreshButton;
