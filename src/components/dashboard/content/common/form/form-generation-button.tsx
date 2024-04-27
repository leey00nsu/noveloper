import { ActionIcon, Tooltip } from '@mantine/core';
import { IoSparklesSharp } from 'react-icons/io5';

interface FormGenerationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isPending?: boolean;
}

const FormGenerationButton = ({
  onClick,
  disabled,
  isPending,
}: FormGenerationButtonProps) => {
  return (
    <Tooltip label={disabled ? '내용이 없습니다.' : 'AI 생성'}>
      <ActionIcon
        variant="transparent"
        loading={isPending}
        disabled={disabled}
        className="hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onClick}
      >
        <IoSparklesSharp className="text-blue-300" />
      </ActionIcon>
    </Tooltip>
  );
};

export default FormGenerationButton;
