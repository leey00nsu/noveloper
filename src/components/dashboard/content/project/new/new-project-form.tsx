import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

import ConfirmModal from '@/components/dashboard/modal/confirm/confirm-modal';
import FormInput from '@/components/ui/form/form-input';

import usePreventNavigation from '@/hooks/navigation/use-prevent-navigation';

import {
  CreateProjectForm,
  CreateProjectRequest,
  CreateProjectSchema,
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

interface NewProjectFormProps {
  onNext: (data: CreateProjectRequest) => void;
}

const NewProjectForm = ({ onNext }: NewProjectFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const submitHandler: SubmitHandler<CreateProjectForm> = (data) => {
    const newProject = {
      ...data,
    };

    NiceModal.show(ConfirmModal, {
      confirm: () => onNext(newProject),
      title: '프로젝트 생성',
      contents: ['프로젝트를 생성하시겠습니까?', '50토큰이 소모됩니다.'],
      label: { confirm: '생성', cancel: '취소' },
    });
  };

  usePreventNavigation();

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>프로젝트의 기본정보를 입력해주세요</Title>

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

      <Stack align="center">
        <Button onClick={handleSubmit(submitHandler)}>프로젝트 생성</Button>
      </Stack>
    </Stack>
  );
};

export default NewProjectForm;
