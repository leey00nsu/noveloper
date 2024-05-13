import { createClient } from '@/libs/supabase/server';

import { SignInWithEmailForm } from '@/types/user';

export const signInWithEmail = async (request: SignInWithEmailForm) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: request.email,
    password: request.password,
  });

  if (!data || error) {
    if (error?.status === 400) {
      return {
        data: null,
        success: false,
        status: 400,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      };
    }

    throw new Error('로그인 도중 오류가 발생했습니다.');
  }

  return {
    data: data.user,
    success: true,
    status: 200,
    message: '로그인 되었습니다.',
  };
};
