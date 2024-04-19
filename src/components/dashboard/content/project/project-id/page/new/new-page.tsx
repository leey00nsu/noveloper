'use client';

import { notifications } from '@mantine/notifications';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import { useCreatePage } from '@/hooks/page/use-page-service';
import useFunnel from '@/hooks/use-funnel';

import CreatingSuccess from './creating-success';
import NewPageForm from './new-page-form';

const NewPage = () => {
  const { Funnel, setStep } = useFunnel(['form', 'success']);
  const { mutate, isPending } = useCreatePage({
    onSuccess: (response) => {
      setStep('success');

      notifications.show({
        title: '페이지 생성 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '페이지 생성 실패',
        message: response.message,
      });
    },
  });

  return (
    <ContentWrapper showLoader={isPending}>
      <Funnel>
        <Funnel.Step name="form">
          <NewPageForm onNext={mutate} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <CreatingSuccess />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewPage;
