'use client';

import { useRouter } from 'next/navigation';

import AppWrapper from '@/components/ui/wrapper/app-wrapper';

import { useSignUpWithEmail } from '@/hooks/user/use-user-service';

import SignUpForm from './sign-up-form';

const SignUp = () => {
  const router = useRouter();
  const { mutate, isPending, errorMessage } = useSignUpWithEmail({
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: () => {},
  });

  return (
    <AppWrapper showLoader={isPending}>
      <SignUpForm onNext={mutate} errorMessage={errorMessage} />
    </AppWrapper>
  );
};

export default SignUp;
