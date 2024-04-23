import {
  ActionIcon,
  Group,
  Card as MantineCard,
  CardProps as MantineCardProps,
  Stack,
  Text,
  TextProps,
} from '@mantine/core';
import Link from 'next/link';
import { FaEllipsis } from 'react-icons/fa6';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import tw from '@/libs/tw';

interface CardProps extends MantineCardProps {
  href?: string;
  title: string;
  children?: React.ReactNode;
}

const CardSkeleton = () => {
  return (
    <MantineCard withBorder className="h-40">
      <Group wrap="nowrap" justify="space-between">
        <ThemeSkeleton className="h-4" />
        <ActionIcon color="gray" variant="subtle">
          <FaEllipsis />
        </ActionIcon>
      </Group>

      <ThemeSkeleton className="h-full" />
    </MantineCard>
  );
};

interface CardTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const CardText = ({ children, className, ...props }: CardTextProps) => {
  return (
    <Text truncate="end" className={tw('text-sm', className)} {...props}>
      {children}
    </Text>
  );
};

const Card = ({ title, href, children, ...props }: CardProps) => {
  return (
    <MantineCard
      component={href ? Link : undefined}
      href={href ?? ''}
      withBorder
      className="h-40"
      classNames={{
        root: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      }}
      {...props}
    >
      <Group wrap="nowrap" justify="space-between">
        <Text truncate="end">{title}</Text>
        <ActionIcon color="gray" variant="subtle">
          <FaEllipsis />
        </ActionIcon>
      </Group>

      <Stack className="gap-1">{children}</Stack>
    </MantineCard>
  );
};

Card.Text = CardText;
Card.Skeleton = CardSkeleton;

export default Card;
