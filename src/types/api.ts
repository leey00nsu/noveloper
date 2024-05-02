export interface ApiResponse<T> {
  data: T;
  success: boolean;
  status: number;
  message: string;
}

export const ORDER = ['asc', 'desc'] as const;
export type Order = (typeof ORDER)[number];
