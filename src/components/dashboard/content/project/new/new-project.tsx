'use client';

import { notifications } from '@mantine/notifications';
import { useState } from 'react';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { useCreateProject } from '@/hooks/project/use-project-service';
import useFunnel from '@/hooks/use-funnel';

import CreatingSuccess from '../../common/success/creating-success';
import NewProjectForm from './new-project-form';

const NewProject = () => {
  const [projectId, setProjectId] = useState('');
  const { Funnel, setStep } = useFunnel(['form', 'success']);
  const { mutate, isPending } = useCreateProject({
    onSuccess: (response) => {
      setProjectId(response.data.id);
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
          <CreatingSuccess
            projectId={projectId}
            title="프로젝트가 생성되었습니다."
          />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewProject;
