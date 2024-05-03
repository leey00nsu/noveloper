import { NextRequest, NextResponse } from 'next/server';

import { createCharacter } from '@/services/supabase/character/create-character';
import { deleteCharacter } from '@/services/supabase/character/delete-character';
import { getCharacterById } from '@/services/supabase/character/get-character-by-id';
import { getCharacters } from '@/services/supabase/character/get-characters';
import { updateCharacter } from '@/services/supabase/character/update-character';

import { catchResponseError } from '@/libs/response-catch-error';

import { OrderSchema } from '@/types/api';
import { CharacterOrderBySchema } from '@/types/character';

export async function POST(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(createCharacter(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(updateCharacter(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const response = await catchResponseError(deleteCharacter(body));

  return NextResponse.json(response, {
    status: response.status,
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const projectId = params.get('id');
  const characterId = Number(params.get('characterId'));
  const orderBy = CharacterOrderBySchema.parse(params.get('order-by'));
  const order = OrderSchema.parse(params.get('order'));
  const search = params.get('search') || '';

  if (projectId && characterId) {
    const response = await catchResponseError(
      getCharacterById({
        projectId,
        characterId,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }

  if (projectId && orderBy && order) {
    const response = await catchResponseError(
      getCharacters({
        projectId,
        orderBy,
        order,
        search,
      }),
    );

    return NextResponse.json(response, {
      status: response.status,
    });
  }
}
