'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export const NavigationBlockerContext = createContext<
  [isBlocked: boolean, setBlocked: Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export function NavigationBlockerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useState(false);
  return (
    <NavigationBlockerContext.Provider value={state}>
      {children}
    </NavigationBlockerContext.Provider>
  );
}

export function useIsBlocked() {
  const [isBlocked] = useContext(NavigationBlockerContext);
  return isBlocked;
}

export function Blocker() {
  const [isBlocked, setBlocked] = useContext(NavigationBlockerContext);

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
}

export function BlockBrowserNavigation() {
  const isBlocked = useIsBlocked();

  useEffect(() => {
    if (isBlocked) {
      const showModal = (event: BeforeUnloadEvent) => {
        event.preventDefault();
      };

      window.addEventListener('beforeunload', showModal);
      return () => {
        window.removeEventListener('beforeunload', showModal);
      };
    }

    return () => {};
  }, [isBlocked]);

  return null;
}

// https://github.com/vercel/next.js/discussions/41934
