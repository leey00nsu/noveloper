'use client';

import {
  Button,
  Center,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import { signInWithGithub } from '@/services/supabase/user/sign-in-with-github';

const SignInForm = () => {
  return (
    <Center className="h-full">
      <Stack className="p-8">
        <Title order={2} className="mb-8 text-center">
          Welcome back to Noveloper!
        </Title>

        <TextInput
          label="이메일 주소"
          placeholder="noveloper@gmail.com"
          size="md"
        />
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          size="md"
          className="mt-md"
        />
        <Button
          radius="xl"
          variant="outline"
          color="gray.9"
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
            href="/auth/signup"
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
    </Center>
  );
};

export default SignInForm;
