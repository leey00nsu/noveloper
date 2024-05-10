import { Stack } from '@mantine/core';

import About from './about';
import Hero from './hero';

const Landing = () => {
  return (
    <Stack className="gap-0">
      <Hero />
      <About />
    </Stack>
  );
};

export default Landing;
