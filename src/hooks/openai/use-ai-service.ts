import { DefaultError, useMutation } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  GenerateMessageRequest,
  GenerateMessageResponse,
} from '@/types/openai';

interface UseGenerateMessageProps {
  onSuccess: (response: GenerateMessageResponse) => void;
  onError: (response: GenerateMessageResponse) => void;
}

export const useGenerateMessage = ({
  onSuccess,
  onError,
}: UseGenerateMessageProps) => {
  const { mutate, isPending } = useMutation<
    GenerateMessageResponse,
    DefaultError,
    GenerateMessageRequest
  >({
    mutationFn: (request) =>
      fetcher({
        url: `/api/ai`,
        method: 'POST',
        body: JSON.stringify(request),
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

  return { mutate, isPending };
};
