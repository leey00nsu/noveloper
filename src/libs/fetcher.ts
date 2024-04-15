import { ApiResponse } from '@/types/api';

import { convertDateObject } from './convert-date-object';

interface FetcherProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit;
}

/**
 * 해당 url로 method 방식의 요청을 보내고 응답을 Promise로 반환합니다.
 * @param url   요청을 보낼 url
 * @param method    요청 방식 (GET, POST, PUT, DELETE, PATCH)
 * @param headers   요청 헤더
 * @param body    요청 바디
 * @returns
 */
export const fetcher = async <T>({
  url,
  method = 'GET',
  headers,
  body,
}: FetcherProps): Promise<ApiResponse<T>> => {
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
