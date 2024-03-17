import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge';

const tw = (...inputs: ClassNameValue[]) => {
  return twMerge(twJoin(inputs));
};

export default tw;
