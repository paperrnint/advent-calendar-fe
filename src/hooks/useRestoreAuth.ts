import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { getCurrentUser } from '@/lib/api/auth';
import { authLoadingAtom, userAtom } from '@/stores/authStore';

export const useRestoreAuth = () => {
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: async () => {
      try {
        const { data } = await getCurrentUser();
        return data;
      } catch (error) {
        // 401 오류 - 로그인 되지 않음 (정상)
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
    enabled: typeof window !== 'undefined', // SSR 일 때 실행 안 함
  });

  useEffect(() => {
    setLoading(isLoading);

    if (data) {
      setUser({
        uuid: data.uuid,
        name: data.name,
        color: data.color,
        isAuthenticated: true,
      });
    } else if (!isLoading && (isError || data === null)) {
      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
    }
  }, [data, isLoading, isError, setUser, setLoading]);

  return {
    isLoading,
    isAuthenticated: data !== null && !isError,
  };
};
