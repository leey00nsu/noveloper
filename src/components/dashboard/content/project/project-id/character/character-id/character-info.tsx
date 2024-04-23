'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import {
  useGetCharacterById,
  useUpdateCharacter,
} from '@/hooks/character/use-character-service';

import CharacterInfoForm from './character-info-form';

const CharacterInfo = () => {
  const { projectId, characterId } = useParams();
  const { character, isFetching } = useGetCharacterById({
    projectId: projectId as string,
    characterId: Number(characterId),
  });

  const { mutate, isPending } = useUpdateCharacter({
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

  if (!character) return null;

  return (
    <ContentWrapper showLoader={isPending}>
      <CharacterInfoForm
        character={character}
        onNext={mutate}
        isSubmitting={isPending || isFetching}
      />
    </ContentWrapper>
  );
};

export default CharacterInfo;
