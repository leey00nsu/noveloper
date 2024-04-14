import { useQuery } from '@tanstack/react-query';

import { GetUserResponse } from '@/types/user';

export const userQueryKeys = {
  user: ['user'],
};

export const useGetUser = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetUserResponse>({
    queryKey: userQueryKeys.user,
    queryFn: async () => {
      const response = await fetch(`/api/user`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { user: result?.data, isLoading, isFetching };
};
