import { ScrollArea as MantineScrollArea } from '@mantine/core';

const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineScrollArea
      className="h-full"
      scrollbars="y"
      classNames={{
        scrollbar: '!bg-gray-900',
        thumb: '!bg-white/40',
        viewport: '[&>div]:!block [&>div]:h-full', // https://github.com/mantinedev/mantine/issues/4941
      }}
    >
      {children}
    </MantineScrollArea>
  );
};

export default ScrollArea;
