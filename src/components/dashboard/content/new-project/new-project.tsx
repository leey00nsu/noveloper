'use client';

import { useCreateProject } from '@/hooks/project/use-project-service';
import useFunnel from '@/hooks/use-funnel';
import { notifications } from '@mantine/notifications';

import ContentWrapper from '../common/content-wrapper';
import CreatingSuccess from './creating-success';
import NewProjectForm from './new-project-form';

const NewProject = () => {
  const { Funnel, setStep } = useFunnel(['form', 'success']);
  const { mutate, isPending } = useCreateProject({
    onSuccess: (response) => {
      setStep('success');

      notifications.show({
        title: '프로젝트 생성 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '프로젝트 생성 실패',
        message: response.message,
      });
    },
  });

  return (
    <ContentWrapper showLoader={isPending}>
      <Funnel>
        <Funnel.Step name="form">
          <NewProjectForm onNext={mutate} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <CreatingSuccess />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewProject;
