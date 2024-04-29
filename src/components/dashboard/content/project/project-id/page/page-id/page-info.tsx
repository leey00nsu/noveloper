'use client';

import { notifications } from '@mantine/notifications';
import { useParams, useRouter } from 'next/navigation';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import {
  useDeletePage,
  useGetPageById,
  useUpdatePage,
} from '@/hooks/page/use-page-service';

import PageInfoForm from './page-info-form';

const PageInfo = () => {
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
    deletePage({
      projectId: projectId as string,
      pageId: Number(pageId),
    });
  }

  if (!page) return null;

  return (
    <ContentWrapper showLoader={isUpdatePending || isDeletePending}>
      <PageInfoForm
        page={page}
        onNext={updatePage}
        isSubmitting={isUpdatePending || isFetching}
        removeHandler={removeHandler}
      />
    </ContentWrapper>
  );
};

export default PageInfo;
