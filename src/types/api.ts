export interface ApiResponse<T> {
  data: T;
  success: boolean;
  status: number;
  message: string;
}
