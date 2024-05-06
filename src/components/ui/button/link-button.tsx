import { Button, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { MdArrowOutward } from 'react-icons/md';

interface LinkButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const LinkButton = ({ href, label, icon }: LinkButtonProps) => {
  return (
    <Button
      href={href}
      component={Link}
      size="lg"
      variant="light"
      justify="space-between"
      leftSection={icon}
      rightSection={<MdArrowOutward />}
    >
      <Text className="text-center">{label}</Text>
    </Button>
  );
};

export default LinkButton;
