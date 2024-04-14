interface FetcherProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit;
}

export const fetcher = async ({
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

  const data = await response.json();

  return data;
};
