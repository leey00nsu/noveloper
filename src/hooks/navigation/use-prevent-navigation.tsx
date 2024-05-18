import NiceModal from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import ConfirmModal from '@/components/dashboard/modal/confirm/confirm-modal';
import { NavigationBlockerContext } from '@/components/ui/navigation/navigation-block';

import { usePreventBackNavigation } from './use-prevent-back-navigation';

/**
 * 페이지 이동(뒤로가기,새로고침) 을 막는 hook
 * @param to 확인 후 이동할 경로
 * @returns
 */
const usePreventNavigation = (to?: string) => {
  const router = useRouter();
  const [isBlocked, setBlocked] = useContext(NavigationBlockerContext);

  usePreventBackNavigation(() => {
    NiceModal.show(ConfirmModal, {
      confirm: () => (to ? router.push(to) : window.history.go(-2)),
      title: '페이지를 떠나시겠습니까?',
      contents: ['모든 작업이 사라집니다.'],
      label: { confirm: '떠나기', cancel: '취소' },
    });
  });

  useEffect(() => {
    setBlocked(() => {
      return true;
    });
    return () => {
      setBlocked(() => {
        return false;
      });
    };
  }, [isBlocked, setBlocked]);

  return null;
};

export default usePreventNavigation;
