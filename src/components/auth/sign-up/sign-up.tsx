'use client';

import { useRouter } from 'next/navigation';

import LoaderModal from '@/components/ui/loader/loader-modal';

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
    <>
      <LoaderModal showLoader={isPending} />
      <SignUpForm onNext={mutate} errorMessage={errorMessage} />
    </>
  );
};

export default SignUp;
