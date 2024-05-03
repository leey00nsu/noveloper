import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import ProjectList from '@/components/dashboard/content/project/project-list';

import { getProjects } from '@/services/supabase/project/get-projects';

import { projectQueryKeys } from '@/hooks/project/use-project-service';

import { OrderSchema } from '@/types/api';
import { GetProjectsResponse, ProjectOrderBySchema } from '@/types/project';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    'order-by': string;
    order: string;
    search: string;
  };
}) {
  const queryClient = new QueryClient();

  const orderBy = ProjectOrderBySchema.parse(searchParams['order-by']);
  const order = OrderSchema.parse(searchParams.order);
  const search = searchParams.search || '';

  // project 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    await queryClient.fetchQuery<GetProjectsResponse>({
      queryKey: projectQueryKeys.projectsWithFilter(orderBy, order, search),
      queryFn: async () => {
        const data = await getProjects({
          orderBy,
          order,
          search,
        });

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
