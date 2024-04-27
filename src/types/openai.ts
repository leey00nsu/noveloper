import { ApiResponse } from './api';

export interface GenerateMessageRequest {
  content: string;
  prompt: string;
}
export interface GenerateMessageResponse extends ApiResponse<string> {}
