import { ApiResponse } from '@/types/api';

export default async function mockResponse(
  { success, message }: ApiResponse<null>,
  duration: number = 2000,
) {
  const response = await new Promise<ApiResponse<null>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: null,
        status: success ? 200 : 400,
        success,
        message,
      });
    }, duration);
  });

  return response;
}
