'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR에서는 클라이언트에서 즉시 다시 가져오는 것을 피하기 위해
            // 일반적으로 0보다 큰 기본 staleTime을 설정합니다.
            // https://tanstack.com/query/latest/docs/framework/react/guides/ssr
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
