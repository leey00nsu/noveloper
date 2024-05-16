import { Users } from '@prisma/client';
import { z } from 'zod';

import { ApiResponse } from './api';

export const SignInWithEmailSchema = z.object({
  email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상 입력해주세요.' })
    .max(50, { message: '비밀번호는 50자 이하로 입력해주세요.' }),
});

export const SignUpWithEmailSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상 입력해주세요.' })
      .max(50, { message: '비밀번호는 50자 이하로 입력해주세요.' }),
    passwordConfirm: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상 입력해주세요.' })
      .max(50, { message: '비밀번호는 50자 이하로 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export interface SignInWithEmailForm
  extends z.infer<typeof SignInWithEmailSchema> {}
export interface SignInWithEmailRequest extends SignInWithEmailForm {}
export interface SignInWithEmailResponse extends ApiResponse<null> {}

export interface SignUpWithEmailForm
  extends z.infer<typeof SignUpWithEmailSchema> {}

export interface SignUpWithEmailRequest extends SignUpWithEmailForm {}
export interface SignUpWithEmailResponse extends ApiResponse<null> {}

export interface GetUserResponse extends ApiResponse<Users> {}

export interface UseTokenRequest {
  usage: number;
}
export interface UseTokenResponse extends ApiResponse<Users> {}
