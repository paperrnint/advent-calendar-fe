import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { logout } from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      queryClient.clear();
      router.push('/');
      toast.success('로그아웃 완료!');
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error(error.message || '로그아웃 중 오류가 발생했어요');

      setUser({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      queryClient.clear();
      router.push('/');
    },
  });
};
