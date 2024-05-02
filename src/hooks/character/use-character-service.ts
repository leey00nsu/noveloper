import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  CreateCharacterRequest,
  CreateCharacterResponse,
  DeleteCharacterRequest,
  DeleteCharacterResponse,
  GetCharacterRequest,
  GetCharacterResponse,
  GetCharactersRequest,
  GetCharactersResponse,
  UpdateCharacterRequest,
  UpdateCharacterResponse,
} from '@/types/character';

import { characterRelationQueryKeys } from '../character-relation/use-character-relation-service';
import { timelineQueryKeys } from '../timeline/use-timeline-service';

export const characterQueryKeys = {
  characters: (projectId: string) => ['character', projectId],
  charactersWithFilter: (projectId: string, orderBy: string, order: string) => [
    'character',
    projectId,
    orderBy,
    order,
  ],
  character: (projectId: string, characterId: number) => [
    'character',
    projectId,
    characterId,
  ],
};

interface UseCreateCharacterProps {
  onSuccess: (response: CreateCharacterResponse) => void;
  onError: (response: CreateCharacterResponse) => void;
}

export const useCreateCharacter = ({
  onSuccess,
  onError,
}: UseCreateCharacterProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    CreateCharacterResponse,
    DefaultError,
    CreateCharacterRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/character`,
        method: 'POST',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // character,relation,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterQueryKeys.characters(response.data.projectId),
        });
        queryClient.invalidateQueries({
          queryKey: characterRelationQueryKeys.relation(
            response.data.projectId,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

interface UseUpdateCharacterProps {
  onSuccess: (response: UpdateCharacterResponse) => void;
  onError: (response: UpdateCharacterResponse) => void;
}

export const useUpdateCharacter = ({
  onSuccess,
  onError,
}: UseUpdateCharacterProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    UpdateCharacterResponse,
    DefaultError,
    UpdateCharacterRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/character`,
        method: 'PATCH',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,relation,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterQueryKeys.characters(response.data.projectId),
        });
        queryClient.invalidateQueries({
          queryKey: characterRelationQueryKeys.relation(
            response.data.projectId,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

interface UseDeleteCharacterProps {
  onSuccess: (response: DeleteCharacterResponse) => void;
  onError: (response: DeleteCharacterResponse) => void;
}

export const useDeleteCharacter = ({
  onSuccess,
  onError,
}: UseDeleteCharacterProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    DeleteCharacterResponse,
    DefaultError,
    DeleteCharacterRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/character`,
        method: 'DELETE',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,relation,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterQueryKeys.characters(response.data.projectId),
        });
        queryClient.invalidateQueries({
          queryKey: characterRelationQueryKeys.relation(
            response.data.projectId,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

export const useGetCharacters = (request: GetCharactersRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetCharactersResponse>({
    queryKey: characterQueryKeys.charactersWithFilter(
      request.projectId,
      request.orderBy,
      request.order,
    ),
    queryFn: () =>
      fetcher({
        url: `/api/character?id=${request.projectId}&order-by=${request.orderBy}&order=${request.order}`,
        method: 'GET',
      }),
  });

  return { characters: result?.data, isLoading, isFetching };
};

export const useGetCharacterById = (request: GetCharacterRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetCharacterResponse>({
    queryKey: characterQueryKeys.character(
      request.projectId,
      request.characterId,
    ),
    enabled: !!request.projectId && !!request.characterId,
    queryFn: () =>
      fetcher({
        url: `/api/character?id=${request.projectId}&characterId=${request.characterId}`,
        method: 'GET',
      }),
  });

  return { character: result?.data, isLoading, isFetching };
};
