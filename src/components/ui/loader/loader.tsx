import {
  Loader as MantineLoader,
  LoaderProps as MantineLoaderProps,
} from '@mantine/core';

interface LoaderProps extends MantineLoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ fullScreen, ...props }: LoaderProps) => {
  if (fullScreen)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <MantineLoader {...props} />
      </div>
    );

  return <MantineLoader {...props} />;
};

export default Loader;
