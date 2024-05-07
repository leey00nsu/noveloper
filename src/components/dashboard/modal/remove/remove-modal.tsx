'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

interface RemoveModalProps {
  remove: (...args: any) => any;
  title: string;
  contents: string[];
  label: {
    remove: string;
    cancel: string;
  };
}

const RemoveModal = NiceModal.create(
  ({ remove, title, contents, label }: RemoveModalProps) => {
    const [visible, setVisible] = useState(false);
    const modal = useModal();

    useEffect(() => {
      setTimeout(() => {
        setVisible(modal.visible);
      }, 0);
    }, [modal.visible]);

    return (
      <Modal.Root centered opened={visible} onClose={() => modal.hide()}>
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
                  color="red"
                  onClick={() => {
                    modal.hide();
                    remove();
                  }}
                >
                  {label.remove}
                </Button>
              </Group>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    );
  },
);

export default RemoveModal;
