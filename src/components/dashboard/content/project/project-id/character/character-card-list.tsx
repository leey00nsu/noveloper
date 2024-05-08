'use client';

import { useParams } from 'next/navigation';

import Card from '@/components/ui/card/card';
import CardList from '@/components/ui/card/card-list';

import { parseDate } from '@/libs/parse-date';

import { useGetCharacters } from '@/hooks/character/use-character-service';
import useSearchFilter from '@/hooks/use-search-filter';

import { CharacterOrderBy, CharacterOrderBySchema } from '@/types/character';

const CharacterCardList = () => {
  const { projectId } = useParams();
  const { currentFilter, currentOrder, currentSearch } =
    useSearchFilter<CharacterOrderBy>({
      filterSchema: CharacterOrderBySchema,
    });

  const { characters, isFetching } = useGetCharacters({
    projectId: projectId as string,
    orderBy: currentFilter,
    order: currentOrder,
    search: currentSearch,
  });

  const isNotFound = currentSearch && characters?.length === 0;
  const isNoData = !currentSearch && characters?.length === 0;

  return (
    <CardList showSkeleton={isFetching}>
      {isNotFound && (
        <Card title="검색 결과가 없습니다.">
          <Card.Text>새로운 인물을 생성해보세요.</Card.Text>
        </Card>
      )}
      {isNoData && (
        <Card title="인물이 없습니다.">
          <Card.Text>새로운 인물을 생성해보세요.</Card.Text>
        </Card>
      )}
      {characters?.map((character) => (
        <Card
          title={character.name}
          href={`/dashboard/project/${projectId}/character/${character.id}`}
          key={character.id}
        >
          <Card.Text>{character.name}</Card.Text>
          <Card.Text>{character.description}</Card.Text>
          <Card.Text className="font-light">
            {parseDate(character.updatedAt)} 에 마지막으로 수정됨
          </Card.Text>
          <Card.Text className="font-light">
            {parseDate(character.createdAt)} 에 생성됨
          </Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default CharacterCardList;
