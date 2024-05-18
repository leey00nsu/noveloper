'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';

import CreatingSuccess from '@/components/dashboard/content/common/success/creating-success';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { useCreateCharacter } from '@/hooks/character/use-character-service';
import useFunnel from '@/hooks/use-funnel';

import NewCharacterForm from './new-character-form';

const NewCharacter = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { Funnel, setStep } = useFunnel(['form', 'success']);
  const { mutate, isPending } = useCreateCharacter({
    onSuccess: (response) => {
      setStep('success');

      notifications.show({
        title: '인물 생성 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '인물 생성 실패',
        message: response.message,
      });
    },
  });

  return (
    <ContentWrapper showLoader={isPending}>
      <Funnel>
        <Funnel.Step name="form">
          <NewCharacterForm onNext={mutate} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <CreatingSuccess
            title="인물이 생성되었습니다."
            projectId={projectId}
          />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewCharacter;
