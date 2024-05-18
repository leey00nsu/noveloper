import { Button, Text } from '@mantine/core';

import { Link } from '../navigation/link';

interface AccordianButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

const AccordianButton = ({
  label,
  href,
  icon,
  className,
}: AccordianButtonProps) => {
  return (
    <Button
      component={Link}
      href={href}
      leftSection={icon}
      variant="transparent"
      justify="flex-start"
      color="white"
      radius="sm"
      className="px-md hover:bg-gray-800 "
    >
      <Text component="span" truncate className={className}>
        {label}
      </Text>
    </Button>
  );
};

export default AccordianButton;
