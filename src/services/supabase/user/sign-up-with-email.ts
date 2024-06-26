import { createClient } from '@/libs/supabase/server';

import { SignUpWithEmailForm } from '@/types/user';

export const signUpWithEmail = async (request: SignUpWithEmailForm) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: request.email,
    password: request.password,
  });

  if (!data || error) {
    if (error?.code === 'user_already_exists') {
      return {
        data: null,
        success: false,
        status: 409,
        message: '이미 존재하는 사용자입니다.',
      };
    }

    throw new Error('이메일로 회원가입하는 도중 오류가 발생했습니다.');
  }

  if (data.user?.identities?.length === 0) {
    return {
      data: null,
      success: false,
      status: 409,
      message: '이미 존재하는 사용자입니다.',
    };
  }

  return {
    data: null,
    success: true,
    status: 201,
    message: '인증 이메일을 확인해주세요.',
  };
};
