'use client';

import useFunnel from '@/hooks/use-funnel';

import ContentWrapper from '../common/content-wrapper';
import CreatingSuccess from './creating-success';
import NewProjectForm from './new-project-form';

const NewProject = () => {
  const { Funnel, setStep } = useFunnel(['form', 'success']);

  return (
    <ContentWrapper>
      <Funnel>
        <Funnel.Step name="form">
          <NewProjectForm onNext={() => setStep('success')} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <CreatingSuccess />
        </Funnel.Step>
      </Funnel>
    </ContentWrapper>
  );
};

export default NewProject;
