import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import CharacterList from '@/components/dashboard/content/project/project-id/character/character-list';

import { getCharacters } from '@/services/supabase/character/get-characters';

import { characterQueryKeys } from '@/hooks/character/use-character-service';

import { OrderSchema } from '@/types/api';
import {
  CharacterOrderBySchema,
  GetCharactersResponse,
} from '@/types/character';

export default async function Character({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: {
    'order-by': string;
    order: string;
    search: string;
  };
}) {
  const queryClient = new QueryClient();

  const orderBy = CharacterOrderBySchema.parse(searchParams['order-by']);
  const order = OrderSchema.parse(searchParams.order);
  const search = searchParams.search || '';

  // character 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    if (!params.projectId) {
      throw new Error('프로젝트ID가 없습니다.');
    }

    await queryClient.fetchQuery<GetCharactersResponse>({
      queryKey: characterQueryKeys.charactersWithFilter(
        params.projectId,
        orderBy,
        order,
        search,
      ),
      queryFn: async () => {
        const data = await getCharacters({
          projectId: params.projectId,
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
      <CharacterList />;
    </HydrationBoundary>
  );
}
