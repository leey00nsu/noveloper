import { ScrollArea, ScrollAreaProps } from '@mantine/core';

import tw from '@/libs/tw';

interface ThemeScrollAreaProps extends ScrollAreaProps {
  children: React.ReactNode;
  ignoreTheme?: boolean;
}

const ThemeScrollArea = ({
  children,
  ignoreTheme,
  ...props
}: ThemeScrollAreaProps) => {
  return (
    <ScrollArea
      classNames={{
        scrollbar: tw(ignoreTheme && '!bg-gray-900'),
        thumb: tw(ignoreTheme && '!bg-white/40'),
        viewport: '[&>div]:!block [&>div]:h-full', // https://github.com/mantinedev/mantine/issues/4941
      }}
      {...props}
    >
      {children}
    </ScrollArea>
  );
};

export default ThemeScrollArea;
