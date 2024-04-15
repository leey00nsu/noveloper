'use client';

import { Modal, Text } from '@mantine/core';
import { Histories } from '@prisma/client';

interface TimeLineModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedHistory?: Histories;
}

const TimeLineModal = ({
  isOpen,
  closeModal,
  selectedHistory,
}: TimeLineModalProps) => {
  const contents = selectedHistory?.content.split('\\n');

  return (
    <Modal.Root size="80%" centered opened={isOpen} onClose={closeModal}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
          <Modal.Title>
            <Text className="text-xl font-bold">{selectedHistory?.title}</Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className="overflow-hidden p-md">
          {contents?.map((content) => <Text key={content}>{content}</Text>)}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default TimeLineModal;
