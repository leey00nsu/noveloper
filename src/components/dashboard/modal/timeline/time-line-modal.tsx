'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, Text } from '@mantine/core';
import { Timelines } from '@prisma/client';
import { useEffect, useState } from 'react';

import { parseDate } from '@/libs/parse-date';

interface TimeLineModalProps {
  selectedTimeline?: Timelines;
}

const TimeLineModal = NiceModal.create(
  ({ selectedTimeline }: TimeLineModalProps) => {
    const [visible, setVisible] = useState(false);
    const modal = useModal();

    useEffect(() => {
      setTimeout(() => {
        setVisible(modal.visible);
      }, 0);
    }, [modal.visible]);

    if (!selectedTimeline) return null;

    const contents = selectedTimeline.content.split('\\n');
    const time = parseDate(selectedTimeline.createdAt, 'ko');

    return (
      <Modal.Root
        size="80%"
        centered
        opened={visible}
        onClose={() => modal.hide()}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
            <Modal.Title>
              <Text className="text-xl font-bold">
                {selectedTimeline.title}
              </Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="overflow-hidden p-md">
            <Text className="text-sm font-light">{time}</Text>
            {contents?.map((content) => <Text key={content}>{content}</Text>)}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    );
  },
);

export default TimeLineModal;
