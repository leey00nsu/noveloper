import { Button } from '@mantine/core';
import { IoMdRefresh } from 'react-icons/io';

interface RefreshButtonProps {
  onClick: () => void;
}

const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  return (
    <Button leftSection={<IoMdRefresh />} onClick={onClick}>
      새로고침
    </Button>
  );
};

export default RefreshButton;
