// src/hooks/useRestoreAuth.ts
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { getCurrentUser } from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';

export const useRestoreAuth = () => {
  const setUser = useSetAtom(userAtom);

  const { data, isLoading, isError, isFetching } = useQuery({
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
    // 로딩이 완료된 후에만 상태 업데이트
    if (!isLoading && !isFetching) {
      if (data) {
        setUser({
          uuid: data.uuid,
          name: data.name,
          color: data.color,
          isAuthenticated: true,
        });
      } else {
        setUser({
          uuid: null,
          name: null,
          color: null,
          isAuthenticated: false,
        });
      }
    }
  }, [data, isLoading, isFetching, isError, setUser]);

  return {
    isLoading: isLoading || isFetching,
    isAuthenticated: data !== null && !isError,
  };
};
