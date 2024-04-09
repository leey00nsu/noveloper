import prisma from '@/libs/prisma';
import { User } from '@supabase/supabase-js';

export const findOrInsertUser = async (user: User) => {
  try {
    const userData = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userData) {
      await prisma.users.create({
        data: {
          id: user.id,
          user_name: user.user_metadata.full_name,
          token: 0,
          plan_id: 0,
        },
      });
    }
  } catch (error) {
    return { error: true };
  }

  return { error: false };
};
