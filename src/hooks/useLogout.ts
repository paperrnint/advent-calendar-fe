import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { logout } from '@/lib/api/auth';
import { authErrorAtom, authLoadingAtom, userAtom } from '@/stores/authStore';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setError = useSetAtom(authErrorAtom);

  return useMutation({
    mutationFn: () => {
      setLoading(true);
      setError(null);
      return logout();
    },
    onSuccess: () => {
      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      queryClient.invalidateQueries({ queryKey: ['auth'] }); // 캐시된 쿼리 무효화
      router.push('/');
      toast.success('로그아웃 완료!');
    },
    onError: (error: Error) => {
      console.error(error);
      setError(error.message);
      toast.error(error.message || '로그아웃 중 오류가 발생했어요');

      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      router.push('/');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
