import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import PageList from '@/components/dashboard/content/project/project-id/page/page-list';

import { getPages } from '@/services/supabase/page/get-projects';

import { pageQueryKeys } from '@/hooks/page/use-page-service copy';

import { GetPagesResponse } from '@/types/page';

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const queryClient = new QueryClient();

  // page 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    if (!params.projectId) {
      throw new Error('프로젝트ID가 없습니다.');
    }

    await queryClient.fetchQuery<GetPagesResponse>({
      queryKey: pageQueryKeys.pages(params.projectId),
      queryFn: async () => {
        const data = await getPages({
          projectId: params.projectId,
        });
        return data;
      },
    });
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageList />;
    </HydrationBoundary>
  );
}
