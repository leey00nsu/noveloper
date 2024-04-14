import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TagsInput, TextInput, Title } from '@mantine/core';
import { Projects } from '@prisma/client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  CreateProjectRequest,
  CreateProjectSchema,
  UpdateProjectRequest,
} from '@/types/project';

const MOCK_JANRES = [
  '판타지',
  '로맨스',
  '스릴러',
  '미스터리',
  'SF',
  '역사',
  '드라마',
  '코미디',
  '액션',
  '모험',
  '공포',
];

interface ProjectInfoFormProps {
  project: Projects;
  onNext: (data: UpdateProjectRequest) => void;
}

const ProjectInfoForm = ({ project, onNext }: ProjectInfoFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateProjectRequest>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: project.title,
      author: project.author,
      janres: project.janres,
      synopsis: project.synopsis,
    },
  });

  const submitHandler: SubmitHandler<CreateProjectRequest> = (data) => {
    onNext({ projectId: project.id, ...data });
  };

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>작품 정보</Title>

      <Stack>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              {...field}
              withAsterisk
              label="작품 제목"
              description="작품 제목은 1자 이상 50자 이하로 입력해주세요."
              placeholder="작품 제목을 입력해주세요."
              error={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="author"
          render={({ field }) => (
            <TextInput
              {...field}
              withAsterisk
              label="작가 이름"
              description="작가 이름은 1자 이상 50자 이하로 입력해주세요."
              placeholder="작가 이름을 입력해주세요."
              error={errors.author?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="janres"
          render={({ field }) => (
            <TagsInput
              {...field}
              withAsterisk
              label="장르"
              placeholder="장르를 선택하거나 입력해주세요."
              data={MOCK_JANRES}
              error={errors.janres?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="synopsis"
          render={({ field }) => (
            <TextInput
              {...field}
              withAsterisk
              label="시놉시스"
              description="시놉시스는 1자 이상 200자 이하로 입력해주세요."
              placeholder="시놉시스를 입력해주세요."
              error={errors.synopsis?.message}
            />
          )}
        />
      </Stack>

      <Stack align="center">
        <Button disabled={!isDirty} onClick={handleSubmit(submitHandler)}>
          변경된 내용 저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProjectInfoForm;
