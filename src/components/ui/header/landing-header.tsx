import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

import Logo from '../logo/logo';

const LandingHeader = () => {
  return (
    <Container className="h-[60px]" size="lg">
      <Group justify="space-between" align="center" className="h-full">
        <Logo color="black" />
        <Group visibleFrom="xs">
          <Link href="/about">서비스 소개</Link>
          <Link href="/pricing">요금제</Link>
        </Group>
        <Group>
          <Button
            component={Link}
            href="/auth/signin"
            radius="xl"
            variant="outline"
            color="gray.9"
          >
            로그인
          </Button>
        </Group>
      </Group>
    </Container>
  );
};

export default LandingHeader;
