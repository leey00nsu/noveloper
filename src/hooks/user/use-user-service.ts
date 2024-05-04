import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import { GetUserResponse } from '@/types/user';

export const userQueryKeys = {
  all: ['user'],
  user: ['user'],
};

export const useGetUser = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetUserResponse>({
    queryKey: userQueryKeys.user,
    queryFn: () => fetcher({ url: `/api/user`, method: 'GET' }),
  });

  return { user: result?.data, isLoading, isFetching };
};
