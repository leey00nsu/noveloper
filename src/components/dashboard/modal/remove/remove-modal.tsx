'use client';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface RemoveModalProps {
  isOpen: boolean;
  closeModal: () => void;
  remove: () => void;
  title: string;
}

const RemoveModal = ({
  isOpen,
  closeModal,
  remove,
  title,
}: RemoveModalProps) => {
  return (
    <Modal.Root centered opened={isOpen} onClose={closeModal}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
          <Modal.Title>
            <Text className="text-xl font-bold">{title} 삭제</Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className="overflow-hidden p-md">
          <Stack align="center">
            <Text className="w-full break-words">
              {title}을(를) 정말로 삭제할까요?
            </Text>
            <Group>
              <Button variant="default" onClick={closeModal}>
                취소
              </Button>
              <Button color="red" onClick={remove}>
                삭제
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RemoveModal;
