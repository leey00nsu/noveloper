'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';

import ContentWrapper from '@/components/dashboard/content/common/wrapper/content-wrapper';

import { useGetPageById, useUpdatePage } from '@/hooks/page/use-page-service';

import PageInfoForm from './page-info-form';

const PageInfo = () => {
  const { projectId, pageId } = useParams();
  const { page, isFetching } = useGetPageById({
    projectId: projectId as string,
    pageId: Number(pageId),
  });

  const { mutate, isPending } = useUpdatePage({
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

  if (!page) return null;

  return (
    <ContentWrapper showLoader={isPending}>
      <PageInfoForm
        page={page}
        onNext={mutate}
        isSubmitting={isPending || isFetching}
      />
    </ContentWrapper>
  );
};

export default PageInfo;
