import { ActionIcon, Box, Container, Group } from '@mantine/core';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import Logo from '../logo/logo';

const AppFooter = () => {
  return (
    <Box className="mt-xl  w-full border-t border-gray-300 bg-gray-50 py-10">
      <Container className="h-[60px]" size="lg">
        <Group justify="space-between" align="center" className="h-full">
          <Logo color="black" />
          <Group>
            <ActionIcon
              component={Link}
              size="lg"
              href="https://github.com/leey00nsu"
              radius="xl"
              variant="subtle"
              color="gray.9"
            >
              <FaGithub />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default AppFooter;
