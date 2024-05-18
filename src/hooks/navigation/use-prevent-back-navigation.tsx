import { useEffect, useRef } from 'react';

import { useIsBlocked } from '@/components/ui/navigation/navigation-block';

export function usePreventBackNavigation(handler: (event: Event) => void) {
  const isBlocked = useIsBlocked();
  const enabled = typeof handler === 'function';

  // Persist handler in ref
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (enabled && isBlocked) {
      window.history.pushState(null, '', '');

      const listener = (event: PopStateEvent) => {
        handlerRef.current(event);
        window.history.pushState(null, '', window.location.href);
        return false;
      };

      window.addEventListener('popstate', listener);
      return () => {
        window.removeEventListener('popstate', listener);
      };
    }

    return () => {};
  }, [enabled, isBlocked]);

  return null;
}
