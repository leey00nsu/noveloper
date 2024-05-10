import { Stack } from '@mantine/core';

import About from './about';
import Hero from './hero';
import Relation from './relation';

const Landing = () => {
  return (
    <Stack className="gap-0">
      <Hero />
      <About />
      <Relation />
    </Stack>
  );
};

export default Landing;
