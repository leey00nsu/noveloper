'use client';

import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import ConfirmModal from '@/components/dashboard/modal/confirm/confirm-modal';
import FormInput from '@/components/ui/form/form-input';

import usePreventNavigation from '@/hooks/navigation/use-prevent-navigation';

import {
  CreateCharacterForm,
  CreateCharacterRequest,
  CreateCharacterSchema,
} from '@/types/character';

interface NewCharacterFormProps {
  onNext: (data: CreateCharacterRequest) => void;
}

const NewCharacterForm = ({ onNext }: NewCharacterFormProps) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharacterForm>({
    resolver: zodResolver(CreateCharacterSchema),
  });

  const submitHandler: SubmitHandler<CreateCharacterForm> = (data) => {
    const newCharacter = {
      ...data,
      projectId,
    };

    NiceModal.show(ConfirmModal, {
      confirm: () => onNext(newCharacter),
      title: '캐릭터 생성',
      contents: ['캐릭터를 생성하시겠습니까?'],
      label: { confirm: '생성', cancel: '취소' },
    });
  };

  usePreventNavigation();

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>인물 정보를 입력해주세요</Title>

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

      <Stack align="center">
        <Button onClick={handleSubmit(submitHandler)}>인물 추가</Button>
      </Stack>
    </Stack>
  );
};

export default NewCharacterForm;
