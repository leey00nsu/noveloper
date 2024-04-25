'use client';

import { useParams } from 'next/navigation';

import { useGetCharacterRelation } from '@/hooks/character-relation/use-character-relation-service';

import ContentWrapper from '../../../common/wrapper/content-wrapper';
import Canvas from './canvas/canvas';

const Relation = () => {
  const { projectId } = useParams();
  const { relation, isLoading } = useGetCharacterRelation({
    projectId: projectId as string,
  });

  return (
    <ContentWrapper showLoader={isLoading}>
      <Canvas defaultNodes={relation?.nodes} defaultEdges={relation?.edges} />
    </ContentWrapper>
  );
};

export default Relation;
