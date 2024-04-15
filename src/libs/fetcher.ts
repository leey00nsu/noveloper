import { ApiResponse } from '@/types/api';

import { convertDateObject } from './convert-date-object';

interface FetcherProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit;
}

export const fetcher = async <T>({
  url,
  method = 'GET',
  headers,
  body,
}: FetcherProps) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  const data: ApiResponse<T> = await response.json();

  const converted = convertDateObject(data.data);

  return {
    ...data,
    data: converted,
  };
};
