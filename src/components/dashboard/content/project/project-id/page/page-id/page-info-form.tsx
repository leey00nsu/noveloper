'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { Pages } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '@/components/dashboard/content/common/form/form-input';

import {
  CreatePageRequest,
  CreatePageSchema,
  UpdatePageRequest,
} from '@/types/page';

import Editor from '../editor/editor';

interface PageInfoFormProps {
  page: Pages;
  onNext: (data: UpdatePageRequest) => void;
  isSubmitting: boolean;
}

const PageInfoForm = ({ page, isSubmitting, onNext }: PageInfoFormProps) => {
  const { pageId } = useParams();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreatePageRequest>({
    resolver: zodResolver(CreatePageSchema),
    defaultValues: {
      title: page.title,
      content: page.content,
    },
  });

  useEffect(() => {
    reset(page);
  }, [page, reset]);

  const submitHandler: SubmitHandler<CreatePageRequest> = (data) => {
    onNext({ ...data, pageId: Number(pageId) });
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

      <Controller
        defaultValue={{}}
        control={control}
        name="content"
        render={({ field }) => (
          <Editor onChange={field.onChange} content={page.content} />
        )}
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

export default PageInfoForm;
