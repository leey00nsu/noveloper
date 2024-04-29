'use client';

import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Stack, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Pages } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import FormGenerationButton from '@/components/dashboard/content/common/form/form-generation-button';
import FormInput from '@/components/dashboard/content/common/form/form-input';
import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import { useGenerateMessage } from '@/hooks/openai/use-ai-service';
import { useGetProjectById } from '@/hooks/project/use-project-service';

import {
  CreatePageRequest,
  CreatePageSchema,
  UpdatePageRequest,
} from '@/types/page';

import { PROMPTS } from '@/constants/openai/prompt';

import Editor from '../editor/editor';

interface PageInfoFormProps {
  page: Pages;
  onNext: (data: UpdatePageRequest) => void;
  isSubmitting: boolean;
  removeHandler: () => void;
}

const PageInfoForm = ({
  page,
  isSubmitting,
  onNext,
  removeHandler,
}: PageInfoFormProps) => {
  const [contentText, setContentText] = useState('');
  const { projectId, pageId } = useParams();
  const { project } = useGetProjectById(projectId as string);

  const {
    getValues,
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreatePageRequest>({
    resolver: zodResolver(CreatePageSchema),
    defaultValues: {
      title: page.title,
      summary: page.summary,
      content: page.content,
    },
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

  useEffect(() => {
    reset(page);
  }, [page, reset]);

  const submitHandler: SubmitHandler<CreatePageRequest> = (data) => {
    onNext({ ...data, pageId: Number(pageId) });
  };

  const openRemoveModal = () => {
    NiceModal.show(RemoveModal, {
      remove: removeHandler,
      title: '페이지 삭제',
      contents: ['페이지를 삭제하시겠습니까?', '되돌릴 수 없습니다.'],
      label: { remove: '삭제', cancel: '취소' },
    });
  };

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>페이지 정보</Title>

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
            content={page.content}
            title={project?.title}
            author={project?.author}
            subTitle={getValues('title')}
          />
        )}
      />

      <Group justify="center">
        <Button
          disabled={!isDirty || isSubmitting}
          onClick={handleSubmit(submitHandler)}
        >
          변경된 내용 저장
        </Button>
        <Button color="red" onClick={openRemoveModal}>
          페이지 삭제
        </Button>
      </Group>
    </Stack>
  );
};

export default PageInfoForm;
