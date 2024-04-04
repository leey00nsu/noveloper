import { DefaultResponse } from './action';

export interface CreateProjectRequest {
  name: string;
  author: string;
  janres: string[];
  synopsis: string;
}

export interface CreateProjectResponse extends DefaultResponse {}
