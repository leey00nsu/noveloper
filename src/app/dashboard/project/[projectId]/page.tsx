import ProjectHome from '@/components/dashboard/content/project/project-home';
import { getProjectById } from '@/services/supabase/get-project-by-id';
import { ProjectResponse } from '@/types/project';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const queryClient = new QueryClient();

  // project 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    if (!params.projectId) {
      throw new Error('프로젝트ID가 없습니다.');
    }

    await queryClient.fetchQuery<ProjectResponse>({
      queryKey: ['project', params.projectId],
      queryFn: async () => {
        const data = await getProjectById(params.projectId);
        return data;
      },
    });
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectHome />;
    </HydrationBoundary>
  );
}
