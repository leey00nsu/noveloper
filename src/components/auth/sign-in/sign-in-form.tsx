'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';

import FormInput from '@/components/ui/form/form-input';

import { signInWithGithub } from '@/services/supabase/user/sign-in-with-github';

import {
  SignInWithEmailForm,
  SignInWithEmailRequest,
  SignInWithEmailSchema,
} from '@/types/user';

interface SignInFormProps {
  onNext: (data: SignInWithEmailRequest) => void;
  errorMessage?: string;
}

const SignInForm = ({ onNext, errorMessage }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInWithEmailForm>({
    resolver: zodResolver(SignInWithEmailSchema),
  });

  const submitHandler: SubmitHandler<SignInWithEmailForm> = (data) => {
    const newUser = {
      ...data,
    };

    onNext(newUser);
  };

  return (
    <Stack component="form" className="w-[500px] p-8">
      <Title order={2} className="mb-8 text-center">
        Noveloper에 오신 것을 환영합니다!
      </Title>

      <FormInput
        control={control}
        name="email"
        label="이메일 주소"
        description="이메일을 입력해주세요."
        placeholder="noveloper@gmail.com"
        errorMessage={errorMessage || errors.email?.message}
      />

      <FormInput
        isPassword
        control={control}
        name="password"
        label="비밀번호"
        description="비밀번호를 입력해주세요."
        placeholder="********"
        errorMessage={errorMessage || errors.password?.message}
      />

      <Button
        onClick={handleSubmit(submitHandler)}
        fullWidth
        size="lg"
        className="mt-md"
      >
        로그인
      </Button>

      <Text className="mt-md text-center">
        계정이 없으신가요?{' '}
        <Text
          component={Link}
          href="/auth/sign-up"
          className="mt-md text-center font-bold"
        >
          가입하기
        </Text>
      </Text>

      <Divider label="또는" labelPosition="center" className="my-xs" />

      <Button
        onClick={signInWithGithub}
        radius="xl"
        leftSection={<FaGithub />}
        variant="outline"
        color="gray.9"
        fullWidth
        size="lg"
      >
        Github로 로그인
      </Button>
    </Stack>
  );
};

export default SignInForm;
