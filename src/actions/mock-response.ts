import { DefaultResponse } from '@/types/action';

export default async function mockResponse(
  { success, message }: DefaultResponse,
  duration: number = 2000,
) {
  const response = await new Promise<DefaultResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        success,
        message,
      });
    }, duration);
  });

  return response;
}
