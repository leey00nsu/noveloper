import { NextResponse } from 'next/server';

import { generateMessage } from '@/services/openai/generate-message';

import { catchResponseError } from '@/libs/response-catch-error';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(
    generateMessage(body.content, body.prompt),
  );

  return NextResponse.json(response, {
    status: response.status,
  });
}
