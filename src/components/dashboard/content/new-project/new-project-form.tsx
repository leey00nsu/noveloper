import {
  Button,
  Stack,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';

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

const MOCK_FORM = {
  name: '',
  author: '',
  janres: [],
  synopsis: '',
};

interface NewProjectFormProps {
  onNext: Function;
}

const NewProjectForm = ({ onNext }: NewProjectFormProps) => {
  const submitHandler = () => {
    onNext(MOCK_FORM);
  };

  return (
    <Stack className="h-full w-full p-sm">
      <Title order={2}>작품의 기본정보를 입력해주세요</Title>

      <Stack>
        <TextInput
          withAsterisk
          label="작품 제목"
          description="작품 제목은 1자 이상 50자 이하로 입력해주세요."
          placeholder="작품 제목을 입력해주세요."
        />
        <TextInput
          withAsterisk
          label="작가 이름"
          description="작가 이름은 1자 이상 50자 이하로 입력해주세요."
          placeholder="작가 이름을 입력해주세요."
        />
        <TagsInput
          withAsterisk
          label="장르"
          placeholder="장르를 선택하거나 입력해주세요."
          data={MOCK_JANRES}
        />
        <Textarea
          withAsterisk
          label="시놉시스"
          autosize
          description="시놉시스는 1자 이상 200자 이하로 입력해주세요."
          placeholder="시놉시스를 입력해주세요."
        />
      </Stack>

      <Stack align="center">
        <Button onClick={submitHandler}>작품 생성</Button>
      </Stack>
    </Stack>
  );
};

export default NewProjectForm;
