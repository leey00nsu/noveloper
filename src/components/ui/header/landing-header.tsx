import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

import Logo from '../logo/logo';

const LandingHeader = () => {
  return (
    <header>
      <Container h={60}>
        <div className="flex h-full items-center justify-between">
          <Logo />
          <Group visibleFrom="xs">
            <Link href="/about">서비스 소개</Link>
            <Link href="/pricing">요금제</Link>
          </Group>
          <Group>
            <Button variant="default">로그인</Button>
          </Group>
        </div>
      </Container>
    </header>
  );
};

export default LandingHeader;
