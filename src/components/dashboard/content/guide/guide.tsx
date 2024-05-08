'use client';

import { Stack, Title } from '@mantine/core';
import { BsDiagram3, BsPersonGear, BsVectorPen } from 'react-icons/bs';
import { FaRegFolderOpen } from 'react-icons/fa';

import LinkButton from '@/components/ui/button/link-button';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

const GUIDE_CONTENTS = [
  {
    label: '프로젝트 생성하기',
    icon: <FaRegFolderOpen />,
    href: `/dashboard/guide/add-project`,
  },
  {
    label: '인물 생성하기',
    icon: <BsPersonGear />,
    href: `/dashboard/guide/add-character`,
  },
  {
    label: '인물 관계도 설정하기',
    icon: <BsDiagram3 />,
    href: `/dashboard/guide/relation`,
  },
  {
    label: '페이지 생성하기',
    icon: <BsVectorPen />,
    href: `/dashboard/guide/add-page`,
  },
];

const Guide = () => {
  return (
    <ContentWrapper>
      <Stack className="w-full max-w-xl">
        <Title order={2} className="mt-sm text-center">
          가이드
        </Title>

        <Stack className="gap-sm">
          {GUIDE_CONTENTS.map((content) => (
            <LinkButton
              key={content.label}
              href={content.href}
              label={content.label}
              icon={content.icon}
            />
          ))}
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default Guide;
