'use client';

import NiceModal from '@ebay/nice-modal-react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import ConfirmModal from '@/components/dashboard/modal/confirm/confirm-modal';

import { useIsBlocked } from './navigation-block';

/**
 * Next.js 의 next/link 컴포넌트를 감싸는 커스텀 Link 컴포넌트
 * navigation block을 사용하여 페이지 이동을 막을 수 있음
 */
export function Link({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const isBlocked = useIsBlocked();

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();

        if (isBlocked) {
          NiceModal.show(ConfirmModal, {
            confirm: () => {
              startTransition(() => {
                const url = href.toString();
                if (replace) {
                  router.replace(url);
                } else {
                  router.push(url);
                }
              });
            },
            title: '페이지를 떠나시겠습니까?',
            contents: ['모든 작업이 사라집니다.'],
            label: { confirm: '떠나기', cancel: '취소' },
          });

          return;
        }

        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
