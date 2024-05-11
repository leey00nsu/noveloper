import { Group, Text } from '@mantine/core';
import Link from 'next/link';

interface LogoProps {
  color: 'white' | 'black';
}

const Logo = ({ color }: LogoProps) => {
  return (
    <Link href="/">
      <Group gap="xs" c={color}>
        {/* TODO: 아이콘 추가 */}
        <Text size="md" className="font-bold">
          Noveloper
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
