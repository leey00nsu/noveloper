'use client';

import { useRouter } from 'next/navigation';

import LoaderModal from '@/components/ui/loader/loader-modal';

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
    <>
      <LoaderModal showLoader={isPending} />
      <SignInForm onNext={mutate} errorMessage={errorMessage}/>
    </>
  );
};

export default SignIn;
