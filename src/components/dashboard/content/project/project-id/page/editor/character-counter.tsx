import { Text } from '@mantine/core';

interface CharacterCounterProps {
  value: number;
  maxValue: number;
}

const CharacterCounter = ({ value, maxValue }: CharacterCounterProps) => {
  return (
    <Text className="text-xs">
      {value} / {maxValue}
    </Text>
  );
};

export default CharacterCounter;
