'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';

import CreatingSuccess from '@/components/dashboard/content/common/success/creating-success';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { useCreatePage } from '@/hooks/page/use-page-service';
import useFunnel from '@/hooks/use-funnel';

import NewPageForm from './new-page-form';

const NewPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { Funnel, setStep } = useFunnel(['form', 'success']);
  const { mutate: createPage, isPending } = useCreatePage({
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
          <NewPageForm onNext={createPage} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <CreatingSuccess
            title="페이지가 생성되었습니다."
            projectId={projectId}
          />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewPage;
