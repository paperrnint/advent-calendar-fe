import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { userAtom } from '@/stores/authStore';

export const useRefreshFailed = () => {
  const [user, setUser] = useAtom(userAtom);
  // const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const handleRefreshFailed = () => {
      if (!user.isAuthenticated) {
        return;
      }

      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      queryClient.clear(); // 캐시된 쿼리 무효화
      router.push('/');
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:refresh-failed', handleRefreshFailed);

      return () => {
        window.removeEventListener('auth:refresh-failed', handleRefreshFailed);
      };
    }
  }, [queryClient, router, setUser, user.isAuthenticated]);
};
