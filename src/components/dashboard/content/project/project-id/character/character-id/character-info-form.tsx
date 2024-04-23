'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { Characters } from '@prisma/client';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '@/components/dashboard/content/common/form/form-input';

import {
  CreateCharacterRequest,
  CreateCharacterSchema,
  UpdateCharacterRequest,
} from '@/types/character';

interface CharacterInfoFormProps {
  character: Characters;
  onNext: (data: UpdateCharacterRequest) => void;
  isSubmitting: boolean;
}

const CharacterInfoForm = ({
  character,
  isSubmitting,
  onNext,
}: CharacterInfoFormProps) => {
  const { characterId } = useParams();

  const {
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

  const submitHandler: SubmitHandler<CreateCharacterRequest> = (data) => {
    onNext({ ...data, characterId: Number(characterId) });
  };

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

      <Stack align="center">
        <Button
          disabled={!isDirty || isSubmitting}
          onClick={handleSubmit(submitHandler)}
        >
          변경된 내용 저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default CharacterInfoForm;
