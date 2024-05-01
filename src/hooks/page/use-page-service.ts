import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  CreatePageRequest,
  CreatePageResponse,
  DeletePageRequest,
  DeletePageResponse,
  GetPageRequest,
  GetPageResponse,
  GetPagesRequest,
  GetPagesResponse,
  UpdatePageRequest,
  UpdatePageResponse,
} from '@/types/page';

import { timelineQueryKeys } from '../timeline/use-timeline-service';
import { userQueryKeys } from '../user/use-user-service';

export const pageQueryKeys = {
  pages: (projectId: string) => ['page', projectId],
  page: (projectId: string, pageId: number) => ['page', projectId, pageId],
};

interface UseCreatePageProps {
  onSuccess: (response: CreatePageResponse) => void;
  onError: (response: CreatePageResponse) => void;
}

export const useCreatePage = ({ onSuccess, onError }: UseCreatePageProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    CreatePageResponse,
    DefaultError,
    CreatePageRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/page`,
        method: 'POST',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // user,page,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.user,
        });
        queryClient.invalidateQueries({
          queryKey: pageQueryKeys.pages(response.data.projectId),
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

interface UseUpdatePageProps {
  onSuccess: (response: UpdatePageResponse) => void;
  onError: (response: UpdatePageResponse) => void;
}

export const useUpdatePage = ({ onSuccess, onError }: UseUpdatePageProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    UpdatePageResponse,
    DefaultError,
    UpdatePageRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/page`,
        method: 'PATCH',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: pageQueryKeys.pages(response.data.projectId),
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
interface UseDeletePageProps {
  onSuccess: (response: DeletePageResponse) => void;
  onError: (response: DeletePageResponse) => void;
}

export const useDeletePage = ({ onSuccess, onError }: UseDeletePageProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    DeletePageResponse,
    DefaultError,
    DeletePageRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/page`,
        method: 'DELETE',
        body: JSON.stringify(request),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: pageQueryKeys.pages(response.data.projectId),
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

export const useGetPages = (request: GetPagesRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetPagesResponse>({
    queryKey: pageQueryKeys.pages(request.projectId),
    queryFn: () =>
      fetcher({ url: `/api/page?id=${request.projectId}`, method: 'GET' }),
  });

  return { pages: result?.data, isLoading, isFetching };
};

export const useGetPageById = (request: GetPageRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetPageResponse>({
    queryKey: pageQueryKeys.page(request.projectId, request.pageId),
    enabled: !!request.projectId && !!request.pageId,
    queryFn: () =>
      fetcher({
        url: `/api/page?id=${request.projectId}&pageId=${request.pageId}`,
        method: 'GET',
      }),
  });

  return { page: result?.data, isLoading, isFetching };
};
