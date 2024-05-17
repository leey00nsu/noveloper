import { Stack, Title } from '@mantine/core';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import CharacterCardList from './character-card-list';
import CharacterNavigation from './character-navigation';

const CharacterList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <Title order={2}>인물 목록</Title>
        <CharacterNavigation />
        <CharacterCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default CharacterList;
