import { Stack, Text, Title } from '@mantine/core';

const SignUpSuccess = () => {
  return (
    <Stack component="form" className="w-[500px] p-8">
      <Title order={2} className="mb-8 text-center">
        회원가입이 완료되었습니다.
      </Title>

      <Text className="text-center text-base font-medium">
        이메일 인증을 완료해주세요.
      </Text>
    </Stack>
  );
};

export default SignUpSuccess;
