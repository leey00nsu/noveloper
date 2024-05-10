'use client';

import {
  Button,
  MantineProvider as OriginalProvider,
  createTheme,
} from '@mantine/core';

import { pretendard } from './font-provider';

const theme = createTheme({
  fontFamily: pretendard.style.fontFamily,
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: 'outline',
        radius: 'xl',
      },
    }),
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  lineHeights: {
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.75rem',
    xl: '1.75rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
});

const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  return <OriginalProvider theme={theme}>{children}</OriginalProvider>;
};

export default MantineProvider;
