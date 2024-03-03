import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

const Logo = () => {
  return (
    <Link href="/">
      <Group gap="xs">
        <FaBook size={24} />
        <Text size="md" fw={600}>
          Noveloper
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
