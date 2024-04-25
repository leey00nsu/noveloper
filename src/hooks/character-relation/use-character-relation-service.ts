import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  FindOrInsertRelationRequest,
  FindOrInsertRelationResponse,
} from '@/types/character-relation';

export const characterQueryKeys = {
  relation: (projectId: string) => ['relation', projectId],
};

export const useGetCharacterRelation = (
  request: FindOrInsertRelationRequest,
) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<FindOrInsertRelationResponse>({
    queryKey: characterQueryKeys.relation(request.projectId),
    queryFn: () =>
      fetcher({ url: `/api/relation?id=${request.projectId}`, method: 'GET' }),
  });

  return { relation: result?.data, isLoading, isFetching };
};
