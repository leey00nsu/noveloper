import { Stack } from '@mantine/core';

import About from './about';
import Hero from './hero';
import Relation from './relation';
import Story from './story';

const Landing = () => {
  return (
    <Stack className="gap-0">
      <Hero />
      <About />
      <Relation />
      <Story />
    </Stack>
  );
};

export default Landing;
