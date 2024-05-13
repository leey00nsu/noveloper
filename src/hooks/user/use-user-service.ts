import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  GetUserResponse,
  SignInWithEmailRequest,
  SignInWithEmailResponse,
  SignUpWithEmailRequest,
  SignUpWithEmailResponse,
} from '@/types/user';

export const userQueryKeys = {
  all: ['user'],
  user: ['user'],
};

interface UseSignUpWithEmailProps {
  onSuccess: (response: SignUpWithEmailResponse) => void;
  onError: (response: SignUpWithEmailResponse) => void;
}

export const useSignUpWithEmail = ({
  onSuccess,
  onError,
}: UseSignUpWithEmailProps) => {
  const { data, mutate, isPending } = useMutation<
    SignUpWithEmailResponse,
    DefaultError,
    SignUpWithEmailRequest
  >({
    mutationFn: (user) =>
      fetcher({
        url: `/api/user/sign-up`,
        method: 'POST',
        body: JSON.stringify(user),
      }),

    onSuccess(response) {
      if (response.success) {
        onSuccess(response);
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return {
    mutate,
    isPending,
    errorMessage: !data?.success ? data?.message : '',
  };
};

interface UseSignInWithEmailProps {
  onSuccess: (response: SignInWithEmailResponse) => void;
  onError: (response: SignInWithEmailResponse) => void;
}

export const useSignInWithEmail = ({
  onSuccess,
  onError,
}: UseSignInWithEmailProps) => {
  const { data, mutate, isPending } = useMutation<
    SignInWithEmailResponse,
    DefaultError,
    SignInWithEmailRequest
  >({
    mutationFn: (user) =>
      fetcher({
        url: `/api/user/sign-in`,
        method: 'POST',
        body: JSON.stringify(user),
      }),

    onSuccess(response) {
      if (response.success) {
        onSuccess(response);
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return {
    mutate,
    isPending,
    errorMessage: !data?.success ? data?.message : '',
  };
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
