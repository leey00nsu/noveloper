import { Box, SegmentedControl, useMantineColorScheme } from '@mantine/core';

const ThemeSwitch = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return (
    <Box className="p-sm">
      <SegmentedControl
        onChange={(value) => setColorScheme(value as any)}
        fullWidth
        value={colorScheme}
        classNames={{
          root: 'bg-gray-800',
          indicator: 'bg-gray-700',
          label: 'text-white hover:text-white',
        }}
        data={[
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ]}
      />
    </Box>
  );
};

export default ThemeSwitch;
