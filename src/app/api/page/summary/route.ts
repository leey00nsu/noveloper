import { NextResponse } from 'next/server';

import { createMessage } from '@/services/openai/createMessage';

import { catchResponseError } from '@/libs/response-catch-error';

import { PROMPTS } from '@/constants/openai/prompt';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(
    createMessage(body.content, PROMPTS.createSummary),
  );

  return NextResponse.json(response, {
    status: response.status,
  });
}
