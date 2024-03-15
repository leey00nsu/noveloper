import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

interface LogoProps {
  color: 'white' | 'black';
}

const Logo = ({ color }: LogoProps) => {
  return (
    <Link href="/">
      <Group gap="xs" c={color}>
        <FaBook size={24} />
        <Text size="md" fw={600}>
          Noveloper
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
