import { z } from 'zod';

export interface ApiResponse<T> {
  data: T;
  nextCursor?: number;
  success: boolean;
  status: number;
  message: string;
}

export const OrderSchema = z.enum(['asc', 'desc']).catch('asc');
export type Order = z.infer<typeof OrderSchema>;
