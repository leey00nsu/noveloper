import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  FindOrInsertRelationRequest,
  FindOrInsertRelationResponse,
  UpdateCharacterRelationRequest,
  UpdateCharacterRelationResponse,
} from '@/types/character-relation';

import { timelineQueryKeys } from '../timeline/use-timeline-service';

export const characterRelationQueryKeys = {
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
    queryKey: characterRelationQueryKeys.relation(request.projectId),
    queryFn: () =>
      fetcher({ url: `/api/relation?id=${request.projectId}`, method: 'GET' }),
  });

  return { relation: result?.data, isLoading, isFetching };
};

interface UseUpdateCharacterRelationProps {
  onMutate: () => void;
  onSuccess: (response: UpdateCharacterRelationResponse) => void;
  onError: (response: UpdateCharacterRelationResponse) => void;
}

export const useUpdateCharacterRelation = ({
  onMutate,
  onSuccess,
  onError,
}: UseUpdateCharacterRelationProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    UpdateCharacterRelationResponse,
    DefaultError,
    UpdateCharacterRelationRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/relation`,
        method: 'PATCH',
        body: JSON.stringify(request),
      }),
    onMutate() {
      onMutate();
    },
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // character,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterRelationQueryKeys.relation(
            response.data.projectId,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timeline(response.data.projectId),
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};
