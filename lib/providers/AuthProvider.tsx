'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HOME_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTES, REGISTRATION_ROUTE } from '@/lib/constants';
import { User } from '@/lib/types/user';
import { getLoggedInUser, logoutAccount } from '@/lib/actions/auth.actions';
import useAnalytics from '@/lib/hooks/useAnalytics';
import { isErrorResponse } from '@/lib/utils';

interface AuthContextType {
  isLoading: boolean;
  user?: User;
  setUser?: (user: User) => void;
  me: () => void;
  logout: (location?: string) => void;
  error: string | null;
}

const noop = () => {};

const initialAuthContext: AuthContextType = {
  isLoading: false,
  user: undefined,
  setUser: noop,
  logout: noop,
  me: noop,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(initialAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { trackEvent } = useAnalytics();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const me = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getLoggedInUser();
      if (response.success) {
        const user = response.data;
        setUser(user);
        if (!user.completed) {
          if (pathName !== REGISTRATION_ROUTE) {
            router.push(REGISTRATION_ROUTE);
          }
        } else if (user.completed && PUBLIC_ROUTES.includes(pathName)) {
          router.push(HOME_ROUTE);
        }
      } else if (isErrorResponse(response)) {
        setError(response.message);
      }
    } catch (error) {
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [pathName, router]);

  useEffect(() => {
    setIsLoading(true);
    me()
      .then(r => r)
      .finally(() => setIsLoading(false));
  }, [me]);

  const logout = useCallback(
    async (location?: string) => {
      trackEvent({ action: 'button_logout', event_category: 'button_click', value: { buttonName: 'Logout', user_id: user?.userId } });
      const response = await logoutAccount();
      if (response.success) {
        setUser(undefined);
        setError(null);
        if (location) router.push(location);
        return router.push(LOGIN_ROUTE);
      } else if (isErrorResponse(response)) {
        setError(response.message);
      }
    },
    [router, trackEvent, user?.userId],
  );
  const memoizedAuthValues = useMemo(
    () => ({
      isLoading: isLoading,
      user,
      setUser,
      logout,
      error,
      me,
    }),
    [isLoading, setUser, logout, user, error, me],
  );

  return <AuthContext.Provider value={memoizedAuthValues}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
