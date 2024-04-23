import { Stack } from '@mantine/core';

import ContentWrapper from '../../../common/wrapper/content-wrapper';
import CharacterCardList from './character-card-list';
import CharacterNavigation from './character-navigation';

const CharacterList = () => {
  return (
    <ContentWrapper>
      <Stack className="h-full w-full p-sm">
        <CharacterNavigation />
        <CharacterCardList />
      </Stack>
    </ContentWrapper>
  );
};

export default CharacterList;
