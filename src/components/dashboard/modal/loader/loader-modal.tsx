'use client';

import { Loader, Modal } from '@mantine/core';

interface LoaderModalProps {
  showLoader: boolean;
}

const LoaderModal = ({ showLoader }: LoaderModalProps) => {
  return (
    <Modal
      centered
      size="auto"
      opened={showLoader}
      onClose={() => {}}
      withCloseButton={false}
    >
      <Loader color="blue" type="dots" />
    </Modal>
  );
};

export default LoaderModal;
