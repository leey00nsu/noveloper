'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';

import {
  useGetProjectById,
  useUpdateProject,
} from '@/hooks/project/use-project-service';

import ContentWrapper from '../../../common/wrapper/content-wrapper';
import ProjectInfoForm from './project-info-form';

const ProjectInfo = () => {
  const { projectId } = useParams();
  const { project } = useGetProjectById(projectId as string);

  const { mutate, isPending } = useUpdateProject({
    onSuccess: (response) => {
      notifications.show({
        title: '프로젝트 업데이트 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '프로젝트 업데이트 실패',
        message: response.message,
      });
    },
  });

  if (!project) return null;

  return (
    <ContentWrapper showLoader={isPending}>
      <ProjectInfoForm project={project} onNext={mutate} />
    </ContentWrapper>
  );
};

export default ProjectInfo;
