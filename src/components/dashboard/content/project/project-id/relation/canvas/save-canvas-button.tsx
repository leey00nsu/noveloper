'use client';

import { notifications } from '@mantine/notifications';
import { useParams } from 'next/navigation';
import { FaSave } from 'react-icons/fa';
import { ControlButton, useEdges, useNodes } from 'reactflow';

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
      });
    },
    onSuccess: (response) => {
      notifications.update({
        loading: false,
        id: 'relation-save',
        title: '관계도가 저장되었습니다.',
        message: response.message,
      });
    },
    onError: () => {},
  });

  return (
    <ControlButton
      title="save"
      disabled={isPending}
      onClick={() =>
        mutate({
          projectId: projectId as string,
          nodes,
          edges,
        })
      }
    >
      <FaSave className="text-black" />
    </ControlButton>
  );
};

export default SaveCanvasButton;
