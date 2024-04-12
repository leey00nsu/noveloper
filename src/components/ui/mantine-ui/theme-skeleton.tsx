import { Skeleton, SkeletonProps } from '@mantine/core';

import tw from '@/libs/tw';

interface ThemeSkeletonProps extends SkeletonProps {
  ignoreTheme?: boolean;
}

const ThemeSkeleton = ({ ignoreTheme, ...props }: ThemeSkeletonProps) => {
  return (
    <Skeleton
      classNames={{
        root: tw(ignoreTheme && 'after:bg-[#424242] before:bg-[#242424]'),
      }}
      {...props}
    />
  );
};

export default ThemeSkeleton;
