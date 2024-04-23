'use client';

import { notifications } from '@mantine/notifications';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import { useCreateCharacter } from '@/hooks/character/use-character-service';
import useFunnel from '@/hooks/use-funnel';

import CreatingSuccess from './creating-success';
import NewCharacterForm from './new-character-form';

const NewCharacter = () => {
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
          <CreatingSuccess />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewCharacter;
