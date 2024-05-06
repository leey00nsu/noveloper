'use client';

import { useParams } from 'next/navigation';

import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { useGetCharacterRelation } from '@/hooks/character-relation/use-character-relation-service';

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
