import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

import Logo from '../logo/logo';

const LandingHeader = () => {
  return (
    <header>
      <Container h={60} size="lg">
        <Group justify="space-between" align="center" className="h-full">
          <Logo />
          <Group visibleFrom="xs">
            <Link href="/about">서비스 소개</Link>
            <Link href="/pricing">요금제</Link>
          </Group>
          <Group>
            <Button radius="xl" variant="outline" color="gray.9">
              로그인
            </Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
};

export default LandingHeader;
