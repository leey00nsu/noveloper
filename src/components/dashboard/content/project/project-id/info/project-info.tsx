'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import {
  useDeleteProject,
  useGetProjectById,
  useUpdateProject,
} from '@/hooks/project/use-project-service';
import useModal from '@/hooks/use-modal';

import ContentWrapper from '../../../common/wrapper/content-wrapper';
import ProjectInfoForm from './project-info-form';

const ProjectInfo = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { projectId } = useParams();
  const router = useRouter();

  const { project, isFetching } = useGetProjectById(projectId as string);

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
        router.push('/dashboard');

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
    closeModal();
    deleteProject({
      projectId: projectId as string,
    });
  };

  if (!project) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <RemoveModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        remove={removeHandler}
        title={project.title}
      />
      <ProjectInfoForm
        project={project}
        onNext={updateProject}
        isSubmitting={isUpdatePending || isFetching}
        openModal={openModal}
      />
    </ContentWrapper>
  );
};

export default ProjectInfo;
