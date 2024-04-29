'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import FormGenerationButton from '@/components/dashboard/content/common/form/form-generation-button';
import FormInput from '@/components/dashboard/content/common/form/form-input';

import { useGenerateMessage } from '@/hooks/openai/use-ai-service';
import { useGetProjectById } from '@/hooks/project/use-project-service';

import { CreatePageRequest, CreatePageSchema } from '@/types/page';

import { PROMPTS } from '@/constants/openai/prompt';

import Editor from '../editor/editor';

interface NewPageFormProps {
  onNext: (data: CreatePageRequest) => void;
}

const NewPageForm = ({ onNext }: NewPageFormProps) => {
  const [contentText, setContentText] = useState('');
  const { projectId } = useParams();
  const { project } = useGetProjectById(projectId as string);

  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePageRequest>({
    resolver: zodResolver(CreatePageSchema),
  });

  const { mutate, isPending } = useGenerateMessage({
    onSuccess: (response) => {
      setValue('summary', response.data, { shouldDirty: true });

      notifications.show({
        title: '요약 생성 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '요약 생성 실패',
        message: response.message,
      });
    },
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

      <FormInput
        disabled={isPending}
        control={control}
        isTextarea
        name="summary"
        label="페이지 요약"
        description="페이지 요약은 1자 이상 100자 이하로 입력해주세요."
        placeholder="페이지 요약을 입력해주세요."
        errorMessage={errors.summary?.message}
        leftSection={
          <FormGenerationButton
            disabled={contentText.length === 0}
            isPending={isPending}
            onClick={() =>
              mutate({
                content: contentText,
                prompt: PROMPTS.generateSummaryInOneSentence,
              })
            }
          />
        }
      />

      <Controller
        defaultValue={{}}
        control={control}
        name="content"
        render={({ field }) => (
          <Editor
            onTextChange={(text) => setContentText(text)}
            onChange={field.onChange}
            title={project?.title}
            author={project?.author}
            subTitle={getValues('title')}
          />
        )}
      />

      <Stack align="center">
        <Button onClick={handleSubmit(submitHandler)}>페이지 추가</Button>
      </Stack>
    </Stack>
  );
};

export default NewPageForm;
