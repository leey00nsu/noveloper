'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Title } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '@/components/ui/form/form-input';

import {
  SignUpWithEmailForm,
  SignUpWithEmailRequest,
  SignUpWithEmailSchema,
} from '@/types/user';

interface SignUpFormProps {
  onNext: (data: SignUpWithEmailRequest) => void;
  errorMessage?: string;
}

const SignUpForm = ({ onNext, errorMessage }: SignUpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpWithEmailForm>({
    resolver: zodResolver(SignUpWithEmailSchema),
  });

  const submitHandler: SubmitHandler<SignUpWithEmailForm> = (data) => {
    const newUser = {
      ...data,
    };

    onNext(newUser);
  };

  return (
    <Stack component="form" className="w-[500px] p-8">
      <Title order={2} className="mb-8 text-center">
        회원가입
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
        errorMessage={errors.password?.message}
      />

      <FormInput
        isPassword
        control={control}
        name="passwordConfirm"
        label="비밀번호 확인"
        description="비밀번호를 한번 더 입력해주세요."
        placeholder="********"
        errorMessage={errors.passwordConfirm?.message}
      />

      <Button
        onClick={handleSubmit(submitHandler)}
        fullWidth
        size="lg"
        className="mt-md"
      >
        회원가입
      </Button>
    </Stack>
  );
};

export default SignUpForm;
