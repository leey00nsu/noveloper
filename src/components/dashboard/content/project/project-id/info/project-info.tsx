'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import {
  useDeleteProject,
  useGetProjectById,
  useUpdateProject,
} from '@/hooks/project/use-project-service';

import ProjectInfoForm from './project-info-form';

const ProjectInfo = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { project, isFetching } = useGetProjectById(projectId);

  const { mutate: updateProject, isPending: isUpdatePending } =
    useUpdateProject({
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

  const { mutate: deleteProject, isPending: isDeletePending } =
    useDeleteProject({
      onSuccess: (response) => {
        router.replace('/dashboard');

        notifications.show({
          title: '프로젝트 삭제 성공',
          message: response.message,
        });
      },
      onError: (response) => {
        notifications.show({
          color: 'red',
          title: '프로젝트 삭제 실패',
          message: response.message,
        });
      },
    });

  const removeHandler = () => {
    deleteProject({
      projectId,
    });
  };

  if (!project) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <ProjectInfoForm
        project={project}
        onNext={updateProject}
        isSubmitting={isUpdatePending || isFetching}
        removeHandler={removeHandler}
      />
    </ContentWrapper>
  );
};

export default ProjectInfo;
