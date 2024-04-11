import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import ProjectList from '@/components/dashboard/content/project/project-list';

import { getProjects } from '@/services/supabase/get-projects';

import { projectQueryKeys } from '@/hooks/project/use-project-service';

import { ProjectsResponse } from '@/types/project';

export default async function Page() {
  const queryClient = new QueryClient();

  // project 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    await queryClient.fetchQuery<ProjectsResponse>({
      queryKey: projectQueryKeys.projects,
      queryFn: async () => {
        const data = await getProjects();

        return data;
      },
    });
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectList />;
    </HydrationBoundary>
  );
}
