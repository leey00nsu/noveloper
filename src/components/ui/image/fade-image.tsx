'use client';

import Image, { ImageProps } from 'next/image';

import tw from '@/libs/tw';

const FadeImage = ({ className, ...props }: ImageProps) => {
  return (
    <Image
      sizes="100vw"
      className={tw(className, 'opacity-0 transition-opacity duration-500')}
      onLoad={(image) => image.currentTarget.classList.remove('opacity-0')}
      {...props}
    />
  );
};

export default FadeImage;
