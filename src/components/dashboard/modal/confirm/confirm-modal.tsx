'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface ConfirmModalProps {
  confirm: (...args: any) => any;
  title: string;
  contents: string[];
  label: {
    confirm: string;
    cancel: string;
  };
}

const ConfirmModal = NiceModal.create(
  ({ confirm, title, contents, label }: ConfirmModalProps) => {
    const modal = useModal();

    return (
      <Modal.Root centered opened={modal.visible} onClose={() => modal.hide()}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
            <Modal.Title>
              <Text className="text-xl font-bold">{title}</Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="overflow-hidden p-md">
            <Stack align="center">
              {contents?.map((content) => (
                <Text key={content} className="w-full break-words">
                  {content}
                </Text>
              ))}
              <Group>
                <Button variant="default" onClick={() => modal.hide()}>
                  {label.cancel}
                </Button>
                <Button
                  onClick={() => {
                    modal.hide();
                    confirm();
                  }}
                >
                  {label.confirm}
                </Button>
              </Group>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    );
  },
);

export default ConfirmModal;
