import { SimpleGrid, SimpleGridProps } from '@mantine/core';

import Card from './card';

const CardListSkeleton = () => {
  return (
    <SimpleGrid
      cols={{
        xs: 1,
        lg: 2,
      }}
    >
      <Card.Skeleton />
      <Card.Skeleton />
    </SimpleGrid>
  );
};

interface CardListProps extends SimpleGridProps {
  showSkeleton?: boolean;
  children?: React.ReactNode;
}

const CardList = ({ showSkeleton, children, ...props }: CardListProps) => {
  if (showSkeleton) return <CardListSkeleton />;

  return (
    <SimpleGrid
      cols={{
        xs: 1,
        lg: 2,
      }}
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};

CardList.Skeleton = CardListSkeleton;

export default CardList;
