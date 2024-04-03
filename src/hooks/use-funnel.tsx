import React, { useState } from 'react';

/**
 * 해당 단계의 컴포넌트를 렌더링 하는 Funnel 패턴을 사용할 수 있게 해주는 Hook입니다.
 * @param steps Funnel의 단계를 나타내는 문자열 배열입니다. 초기값은 첫 번째 단계입니다.
 * @returns Funnel 컴포넌트와 현재 단계를 나타내는 step, 그리고 단계를 변경하는 setStep을 반환합니다.
 */
const useFunnel = <T extends string>(steps: T[]) => {
  const [step, setStep] = useState<T>(steps[0]);

  const Step = ({ name, children }: { name: T; children: React.ReactNode }) => {
    return name === step ? children : null;
  };

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    return children;
  };

  Funnel.Step = Step;

  return { Funnel, step, setStep };
};

export default useFunnel;
