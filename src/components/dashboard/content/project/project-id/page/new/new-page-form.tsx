'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '@/components/dashboard/content/common/form/form-input';

import { CreatePageRequest, CreatePageSchema } from '@/types/page';

import Editor from './editor/editor';

interface NewPageFormProps {
  onNext: (data: CreatePageRequest) => void;
}

const NewPageForm = ({ onNext }: NewPageFormProps) => {
  const { projectId } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePageRequest>({
    resolver: zodResolver(CreatePageSchema),
  });

  const submitHandler: SubmitHandler<CreatePageRequest> = (data) => {
    onNext({ ...data, projectId: projectId as string });
  };

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>페이지 내용을 입력해주세요</Title>

      <FormInput
        control={control}
        name="title"
        label="페이지 제목"
        description="페이지 제목은 1자 이상 50자 이하로 입력해주세요."
        placeholder="페이지 제목을 입력해주세요."
        errorMessage={errors.title?.message}
      />

      <Controller
        defaultValue={{}}
        control={control}
        name="content"
        render={({ field }) => <Editor onChange={field.onChange} />}
      />

      <Stack align="center">
        <Button onClick={handleSubmit(submitHandler)}>페이지 추가</Button>
      </Stack>
    </Stack>
  );
};

export default NewPageForm;
