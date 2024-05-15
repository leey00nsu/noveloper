'use client';

import { useRouter } from 'next/navigation';

import AppWrapper from '@/components/ui/wrapper/app-wrapper';

import { useSignInWithEmail } from '@/hooks/user/use-user-service';

import SignInForm from './sign-in-form';

const SignIn = () => {
  const router = useRouter();
  const { mutate, errorMessage, isPending } = useSignInWithEmail({
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: () => {},
  });

  return (
    <AppWrapper showLoader={isPending}>
      <SignInForm onNext={mutate} errorMessage={errorMessage} />
    </AppWrapper>
  );
};

export default SignIn;
