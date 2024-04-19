import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import PageInfo from '@/components/dashboard/content/project/project-id/page/page-id/page-info';

import { getPageById } from '@/services/supabase/page/get-page-by-id';

import { pageQueryKeys } from '@/hooks/page/use-page-service';

import { GetPageResponse } from '@/types/page';

export default async function Page({
  params,
}: {
  params: { projectId: string; pageId: string };
}) {
  const queryClient = new QueryClient();

  // page 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    if (!params.projectId || !params.pageId) {
      throw new Error('프로젝트ID 또는 페이지ID가 없습니다.');
    }

    await queryClient.fetchQuery<GetPageResponse>({
      queryKey: pageQueryKeys.page(params.projectId, Number(params.pageId)),
      queryFn: async () => {
        const data = await getPageById({
          projectId: params.projectId,
          pageId: Number(params.pageId),
        });
        return data;
      },
    });
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageInfo />;
    </HydrationBoundary>
  );
}
