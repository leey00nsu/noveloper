'use client';

import AppWrapper from '@/components/ui/wrapper/app-wrapper';

import useFunnel from '@/hooks/use-funnel';
import { useSignUpWithEmail } from '@/hooks/user/use-user-service';

import SignUpForm from './sign-up-form';
import SignUpSuccess from './sign-up-success';

const SignUp = () => {
  const { Funnel, setStep } = useFunnel(['form', 'success']);

  const { mutate, isPending, errorMessage } = useSignUpWithEmail({
    onSuccess: () => {
      setStep('success');
    },
    onError: () => {},
  });

  return (
    <AppWrapper showLoader={isPending}>
      <Funnel>
        <Funnel.Step name="form">
          <SignUpForm onNext={mutate} errorMessage={errorMessage} />
        </Funnel.Step>
        <Funnel.Step name="success">
          <SignUpSuccess />
        </Funnel.Step>
      </Funnel>
    </AppWrapper>
  );
};

export default SignUp;
