'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';
import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import {
  useDeleteCharacter,
  useGetCharacterById,
  useUpdateCharacter,
} from '@/hooks/character/use-character-service';
import useModal from '@/hooks/use-modal';

import CharacterInfoForm from './character-info-form';

const CharacterInfo = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { projectId, characterId } = useParams();

  const { character, isFetching } = useGetCharacterById({
    projectId: projectId as string,
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
        router.push(`/dashboard/project/${projectId}/character`);

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
    closeModal();
    deleteCharacter({
      projectId: projectId as string,
      characterId: Number(characterId),
    });
  };

  if (!character) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <RemoveModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        remove={removeHandler}
        title={character.name}
      />
      <CharacterInfoForm
        character={character}
        onNext={updateCharacter}
        isSubmitting={isUpdatePending || isFetching}
        openModal={openModal}
      />
    </ContentWrapper>
  );
};

export default CharacterInfo;
