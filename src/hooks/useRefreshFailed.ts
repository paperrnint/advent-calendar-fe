import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { userAtom } from '@/stores/authStore';

export const useRefreshFailed = () => {
  const [user, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const router = useRouter();
  const prevAuthRef = useRef(user.isAuthenticated);

  useEffect(() => {
    prevAuthRef.current = user.isAuthenticated;
  }, [user.isAuthenticated]);

  useEffect(() => {
    const handleRefreshFailed = () => {
      // unknown 상태면 아직 초기 로딩 중이므로 무시
      if (prevAuthRef.current === 'unknown') {
        return;
      }

      // 이미 로그아웃 상태면 무시
      if (prevAuthRef.current === false) {
        return;
      }

      // 로그인 상태(true)일 때만 처리
      if (prevAuthRef.current === true) {
        setUser({
          uuid: null,
          email: null,
          name: null,
          color: null,
          isAuthenticated: false,
        });

        queryClient.clear();
        router.push('/');
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:refresh-failed', handleRefreshFailed);

      return () => {
        window.removeEventListener('auth:refresh-failed', handleRefreshFailed);
      };
    }
  }, [queryClient, router, setUser]);
};
