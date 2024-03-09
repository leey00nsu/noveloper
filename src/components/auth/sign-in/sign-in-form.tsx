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
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const SignInForm = () => {
  return (
    <Center className="h-[calc(100vh-60px)] ">
      <Stack p={30}>
        <Title order={2} ta="center" mb={30}>
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
          mt="md"
          size="md"
        />
        <Button
          radius="xl"
          variant="outline"
          color="gray.9"
          fullWidth
          mt="md"
          size="lg"
        >
          로그인
        </Button>

        <Text ta="center" mt="md">
          계정이 없으신가요?{' '}
          <Text
            component={Link}
            href="/auth/signup"
            ta="center"
            mt="md"
            fw={700}
          >
            가입하기
          </Text>
        </Text>

        <Divider my="xs" label="또는" labelPosition="center" />

        <Button
          onClick={() => signIn('github')}
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
