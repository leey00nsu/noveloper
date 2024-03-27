'use client';

import { Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  }, []);

  return (
    <Modal centered opened={isOpen} onClose={() => router.back()}>
      Modal!
    </Modal>
  );
};

export default Page;
