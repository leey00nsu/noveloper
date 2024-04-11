import { CreateProjectRequest, CreateProjectSchema } from '@/types/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TagsInput, TextInput, Title } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
  onNext: Function;
}

const NewProjectForm = ({ onNext }: NewProjectFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectRequest>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const submitHandler: SubmitHandler<CreateProjectRequest> = (data) => {
    onNext(data);
  };

  return (
    <Stack component="form" className="h-full w-full p-sm">
      <Title order={2}>작품의 기본정보를 입력해주세요</Title>

      <Stack>
        <Controller
          defaultValue=""
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
          defaultValue=""
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
          defaultValue={[]}
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
          defaultValue=""
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
        <Button onClick={handleSubmit(submitHandler)}>작품 생성</Button>
      </Stack>
    </Stack>
  );
};

export default NewProjectForm;
