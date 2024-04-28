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
  GetCharacterRequest,
  GetCharacterResponse,
  GetCharactersRequest,
  GetCharactersResponse,
  UpdateCharacterRequest,
  UpdateCharacterResponse,
} from '@/types/character';

import { characterRelationQueryKeys } from '../character-relation/use-character-relation-service';
import { historyQueryKeys } from '../history/use-history-service';

export const characterQueryKeys = {
  characters: (projectId: string) => ['characters', projectId],
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

        // character,relation,history 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterQueryKeys.characters(response.data.projectId),
        });
        queryClient.invalidateQueries({
          queryKey: characterRelationQueryKeys.relation(
            response.data.projectId,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.histories,
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.history(response.data.projectId),
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

        // 변경한 project,history 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: characterQueryKeys.character(
            response.data.projectId,
            response.data.id,
          ),
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.histories,
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.history(response.data.projectId),
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
    queryKey: characterQueryKeys.characters(request.projectId),
    queryFn: () =>
      fetcher({ url: `/api/character?id=${request.projectId}`, method: 'GET' }),
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