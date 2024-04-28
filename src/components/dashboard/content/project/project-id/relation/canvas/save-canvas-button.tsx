'use client';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';
import { AiOutlineSave } from 'react-icons/ai';
import { useEdges, useNodes } from 'reactflow';

import { useUpdateCharacterRelation } from '@/hooks/character-relation/use-character-relation-service';

const SaveCanvasButton = () => {
  const { projectId } = useParams();
  const edges = useEdges();
  const nodes = useNodes();

  const { mutate, isPending } = useUpdateCharacterRelation({
    onMutate: () => {
      notifications.hide('relation-save');
      notifications.show({
        loading: true,
        id: 'relation-save',
        title: '관계도를 저장중입니다.',
        message: '저장 중...',
        autoClose: false,
      });
    },
    onSuccess: (response) => {
      notifications.update({
        loading: false,
        id: 'relation-save',
        title: '관계도가 저장되었습니다.',
        message: response.message,
        autoClose: true,
      });
    },
    onError: () => {},
  });

  return (
    <Button
      variant="default"
      title="save"
      disabled={isPending}
      onClick={() =>
        mutate({
          projectId: projectId as string,
          nodes,
          edges,
        })
      }
      rightSection={<AiOutlineSave />}
    >
      저장
    </Button>
  );
};

export default SaveCanvasButton;
