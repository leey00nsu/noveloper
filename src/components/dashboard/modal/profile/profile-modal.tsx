'use client';

import { Modal, Tabs, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegCreditCard, FaRegUser } from 'react-icons/fa';

import PlanTab from './plan-tab';
import ProfileTab from './profile-tab';

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const MOCK_BUTTONS = [
    { label: '프로필', icon: <FaRegUser /> },
    { label: '플랜', icon: <FaRegCreditCard /> },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  }, []);

  return (
    <Modal.Root
      size="80%"
      centered
      opened={isOpen}
      onClose={() => router.back()}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="border-b-2 border-gray-300 dark:border-gray-700 ">
          <Modal.Title>
            <Text className="text-xl font-bold">프로필</Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className="overflow-hidden p-md">
          <Tabs
            color="gray"
            variant="pills"
            defaultValue="프로필"
            orientation="vertical"
            classNames={{
              root: 'gap-md flex-col lg:flex-row',
              tab: 'data-[active]:bg-gray-300 data-[active]:dark:bg-gray-700',
              panel: 'grow',
              tabLabel: 'text-foreground',
              tabSection: 'text-foreground',
            }}
          >
            <Tabs.List>
              {MOCK_BUTTONS.map((button) => (
                <Tabs.Tab
                  value={button.label}
                  key={button.label}
                  leftSection={button.icon}
                >
                  {button.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value="프로필">
              <ProfileTab />
            </Tabs.Panel>

            <Tabs.Panel value="플랜">
              <PlanTab />
            </Tabs.Panel>
          </Tabs>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ProfileModal;
