'use client';

import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';
import useFunnel from '@/hooks/use-funnel';
import { Box, Center } from '@mantine/core';

import CreatingSuccess from './creating-success';
import NewProjectForm from './new-project-form';

const NewProject = () => {
  const { Funnel, setStep } = useFunnel(['form', 'success']);

  return (
    <Box className="h-full w-full p-sm">
      <ThemeScrollArea className="h-full" scrollbars="y">
        <Center className="h-full w-full">
          <Funnel>
            <Funnel.Step name="form">
              <NewProjectForm onNext={() => setStep('success')} />
            </Funnel.Step>
            <Funnel.Step name="success">
              <CreatingSuccess />
            </Funnel.Step>
          </Funnel>
        </Center>
      </ThemeScrollArea>
    </Box>
  );
};

export default NewProject;
