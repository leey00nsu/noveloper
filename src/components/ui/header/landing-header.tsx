import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

import Logo from '../logo/logo';

const LandingHeader = () => {
  return (
    <Container className="h-[60px]" size="lg">
      <Group justify="space-between" align="center" className="h-full">
        <Logo color="black" />
        <Group>
          <Button component={Link} href="/auth/sign-in" color="gray.9">
            로그인
          </Button>
        </Group>
      </Group>
    </Container>
  );
};

export default LandingHeader;
