import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Stack, Title } from '@mantine/core';
import { Projects } from '@prisma/client';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import {
  CreateProjectForm,
  CreateProjectSchema,
  UpdateProjectRequest,
} from '@/types/project';

import FormInput from '../../../common/form/form-input';

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
  isSubmitting: boolean;
  project: Projects;
  onNext: (data: UpdateProjectRequest) => void;
  removeHandler: () => void;
}

const ProjectInfoForm = ({
  isSubmitting,
  project,
  onNext,
  removeHandler,
}: ProjectInfoFormProps) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: project.title,
      author: project.author,
      janres: project.janres,
      synopsis: project.synopsis,
    },
  });

  useEffect(() => {
    reset(project);
  }, [project, reset]);

  const openRemoveModal = () => {
    NiceModal.show(RemoveModal, {
      remove: removeHandler,
      title: '프로젝트 삭제',
      contents: ['프로젝트를 삭제하시겠습니까?', '되돌릴 수 없습니다.'],
      label: { remove: '삭제', cancel: '취소' },
    });
  };

  const submitHandler: SubmitHandler<CreateProjectForm> = (data) => {
    const newProject = {
      ...data,
      projectId: project.id,
    };

    onNext(newProject);
  };

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>프로젝트 정보</Title>

      <Stack>
        <FormInput
          control={control}
          name="title"
          label="프로젝트 제목"
          description="프로젝트 제목은 1자 이상 50자 이하로 입력해주세요."
          placeholder="프로젝트 제목을 입력해주세요."
          errorMessage={errors.title?.message}
        />
        <FormInput
          control={control}
          name="author"
          label="작가 이름"
          description="작가 이름은 1자 이상 50자 이하로 입력해주세요."
          placeholder="작가 이름을 입력해주세요."
          errorMessage={errors.author?.message}
        />
        <FormInput
          isTag
          data={MOCK_JANRES}
          control={control}
          name="janres"
          label="장르"
          description="장르는 1개 이상 선택해주세요."
          placeholder="장르를 선택하거나 입력해주세요."
          errorMessage={errors.janres?.message}
        />
        <FormInput
          control={control}
          name="synopsis"
          label="시놉시스"
          description="시놉시스는 1자 이상 200자 이하로 입력해주세요."
          placeholder="시놉시스를 입력해주세요."
          errorMessage={errors.synopsis?.message}
        />
      </Stack>

      <Group justify="center">
        <Button
          disabled={!isDirty || isSubmitting}
          onClick={handleSubmit(submitHandler)}
        >
          변경된 내용 저장
        </Button>
        <Button color="red" onClick={openRemoveModal}>
          프로젝트 삭제
        </Button>
      </Group>
    </Stack>
  );
};

export default ProjectInfoForm;
