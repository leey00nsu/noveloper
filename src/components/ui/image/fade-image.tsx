'use client';

import { ImgHTMLAttributes } from 'react';

import tw from '@/libs/tw';

const FadeImage = ({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      className={tw(className, 'opacity-0 transition-opacity duration-500')}
      onLoad={(image) => image.currentTarget.classList.remove('opacity-0')}
      {...props}
    />
  );
};

export default FadeImage;
