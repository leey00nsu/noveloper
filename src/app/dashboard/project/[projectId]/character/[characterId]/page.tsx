import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import CharacterInfo from '@/components/dashboard/content/project/project-id/character/character-id/character-info';

import { getCharacterById } from '@/services/supabase/character/get-character-by-id';

import { characterQueryKeys } from '@/hooks/character/use-character-service';

import { GetCharacterResponse } from '@/types/character';

export default async function Character({
  params,
}: {
  params: { projectId: string; characterId: string };
}) {
  const queryClient = new QueryClient();

  // character 데이터를 미리 가져와서 쿼리 캐시에 저장합니다.
  // 만약 데이터가 없다면 /dashboard 페이지로 리다이렉트합니다.
  try {
    if (!params.projectId || !params.characterId) {
      throw new Error('프로젝트ID 또는 캐릭터ID가 없습니다.');
    }

    await queryClient.fetchQuery<GetCharacterResponse>({
      queryKey: characterQueryKeys.character(
        params.projectId,
        Number(params.characterId),
      ),
      queryFn: async () => {
        const data = await getCharacterById({
          projectId: params.projectId,
          characterId: Number(params.characterId),
        });
        return data;
      },
    });
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterInfo />;
    </HydrationBoundary>
  );
}
