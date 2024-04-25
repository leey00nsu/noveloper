import { CharacterRelations } from '@prisma/client';
import { Edge, Node } from 'reactflow';

import { ApiResponse } from './api';

export interface ParsedCharacterRelations
  extends Omit<CharacterRelations, 'nodes' | 'edges'> {
  nodes: Node[];
  edges: Edge[];
}

export interface FindOrInsertRelationRequest {
  projectId: string;
}
export interface FindOrInsertRelationResponse
  extends ApiResponse<ParsedCharacterRelations> {}
