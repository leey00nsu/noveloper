'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';
import RemoveModal from '@/components/dashboard/modal/remove/remove-modal';

import {
  useDeletePage,
  useGetPageById,
  useUpdatePage,
} from '@/hooks/page/use-page-service';
import useModal from '@/hooks/use-modal';

import PageInfoForm from './page-info-form';

const PageInfo = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { projectId, pageId } = useParams();
  const router = useRouter();

  const { page, isFetching } = useGetPageById({
    projectId: projectId as string,
    pageId: Number(pageId),
  });

  const { mutate: updatePage, isPending: isUpdatePending } = useUpdatePage({
    onSuccess: (response) => {
      notifications.show({
        title: '페이지 업데이트 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '페이지 업데이트 실패',
        message: response.message,
      });
    },
  });

  const { mutate: deletePage, isPending: isDeletePending } = useDeletePage({
    onSuccess: (response) => {
      router.push(`/dashboard/project/${projectId}/page`);

      notifications.show({
        title: '페이지 삭제 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: '페이지 삭제 실패',
        message: response.message,
      });
    },
  });

  const removeHandler = () => {
    closeModal();
    deletePage({
      projectId: projectId as string,
      pageId: Number(pageId),
    });
  };

  if (!page) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <RemoveModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        remove={removeHandler}
        title={page.title}
      />
      <PageInfoForm
        page={page}
        onNext={updatePage}
        isSubmitting={isUpdatePending || isFetching}
        openModal={openModal}
      />
    </ContentWrapper>
  );
};

export default PageInfo;
