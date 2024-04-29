'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, Text } from '@mantine/core';
import { Histories } from '@prisma/client';

import { parseDate } from '@/libs/parse-date';

interface TimeLineModalProps {
  selectedHistory?: Histories;
}

const TimeLineModal = NiceModal.create(
  ({ selectedHistory }: TimeLineModalProps) => {
    const modal = useModal();
    if (!selectedHistory) return null;

    const contents = selectedHistory.content.split('\\n');
    const time = parseDate(selectedHistory.createdAt, 'ko');

    return (
      <Modal.Root
        size="80%"
        centered
        opened={modal.visible}
        onClose={() => modal.hide}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
            <Modal.Title>
              <Text className="text-xl font-bold">{selectedHistory.title}</Text>
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
