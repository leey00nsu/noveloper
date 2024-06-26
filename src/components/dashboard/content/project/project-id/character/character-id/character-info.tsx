'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import {
  useDeleteCharacter,
  useGetCharacterById,
  useUpdateCharacter,
} from '@/hooks/character/use-character-service';

import CharacterInfoForm from './character-info-form';

const CharacterInfo = () => {
  const router = useRouter();
  const { projectId, characterId } = useParams<{
    projectId: string;
    characterId: string;
  }>();

  const { character, isFetching } = useGetCharacterById({
    projectId,
    characterId: Number(characterId),
  });

  const { mutate: updateCharacter, isPending: isUpdatePending } =
    useUpdateCharacter({
      onSuccess: (response) => {
        notifications.show({
          title: '인물 업데이트 성공',
          message: response.message,
        });
      },
      onError: (response) => {
        notifications.show({
          color: 'red',
          title: '인물 업데이트 실패',
          message: response.message,
        });
      },
    });

  const { mutate: deleteCharacter, isPending: isDeletePending } =
    useDeleteCharacter({
      onSuccess: (response) => {
        router.replace(`/dashboard/project/${projectId}/character`);

        notifications.show({
          title: '인물 삭제 성공',
          message: response.message,
        });
      },
      onError: (response) => {
        notifications.show({
          color: 'red',
          title: '인물 삭제 실패',
          message: response.message,
        });
      },
    });

  const removeHandler = () => {
    deleteCharacter({
      projectId: projectId as string,
      characterId: Number(characterId),
    });
  };

  if (!character) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <CharacterInfoForm
        character={character}
        onNext={updateCharacter}
        isSubmitting={isUpdatePending || isFetching}
        removeHandler={removeHandler}
      />
    </ContentWrapper>
  );
};

export default CharacterInfo;
