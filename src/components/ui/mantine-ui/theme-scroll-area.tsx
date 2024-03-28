import { ScrollArea, ScrollAreaProps } from '@mantine/core';

interface ThemeScrollAreaProps extends ScrollAreaProps {
  children: React.ReactNode;
}

const ThemeScrollArea = ({ children, ...props }: ThemeScrollAreaProps) => {
  return (
    <ScrollArea
      classNames={{
        scrollbar: '!bg-gray-900',
        thumb: '!bg-white/40',
        viewport: '[&>div]:!block [&>div]:h-full', // https://github.com/mantinedev/mantine/issues/4941
      }}
      {...props}
    >
      {children}
    </ScrollArea>
  );
};

export default ThemeScrollArea;
