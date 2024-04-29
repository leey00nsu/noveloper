'use client';

import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Stack, Title } from '@mantine/core';
import { Characters } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '@/components/dashboard/content/common/form/form-input';
import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import {
  CreateCharacterRequest,
  CreateCharacterSchema,
  UpdateCharacterRequest,
} from '@/types/character';

interface CharacterInfoFormProps {
  character: Characters;
  onNext: (data: UpdateCharacterRequest) => void;
  isSubmitting: boolean;
  removeHandler: () => void;
}

const CharacterInfoForm = ({
  character,
  isSubmitting,
  onNext,
  removeHandler,
}: CharacterInfoFormProps) => {
  const { characterId } = useParams();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateCharacterRequest>({
    resolver: zodResolver(CreateCharacterSchema),
    defaultValues: {
      name: character.name,
      age: character.age,
      description: character.description,
    },
  });

  const openRemoveModal = () => {
    NiceModal.show(RemoveModal, {
      remove: removeHandler,
      title: '인물 삭제',
      contents: ['인물을 삭제하시겠습니까?', '되돌릴 수 없습니다.'],
      label: { remove: '삭제', cancel: '취소' },
    });
  };

  const submitHandler: SubmitHandler<CreateCharacterRequest> = (data) => {
    onNext({ ...data, characterId: Number(characterId) });
  };

  useEffect(() => {
    reset(character);
  }, [character, reset]);

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>인물 정보</Title>

      <FormInput
        control={control}
        name="name"
        label="이름"
        description="이름은 1자 이상 50자 이하로 입력해주세요."
        placeholder="이름을 입력해주세요."
        errorMessage={errors.name?.message}
      />
      <FormInput
        control={control}
        name="age"
        label="나이"
        description="나이를 입력해주세요."
        placeholder="나이를 입력해주세요."
        errorMessage={errors.age?.message}
      />
      <FormInput
        control={control}
        name="description"
        label="설명"
        description="설명은 1자 이상 50자 이하로 입력해주세요."
        placeholder="설명을 입력해주세요."
        errorMessage={errors.description?.message}
      />

      <Group justify="center">
        <Button
          disabled={!isDirty || isSubmitting}
          onClick={handleSubmit(submitHandler)}
        >
          변경된 내용 저장
        </Button>
        <Button color="red" onClick={openRemoveModal}>
          캐릭터 삭제
        </Button>
      </Group>
    </Stack>
  );
};

export default CharacterInfoForm;
