import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteUser } from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';

export const useDeleteUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setUser({
        uuid: null,
        email: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      queryClient.clear();
      router.push('/');
      toast.success('계정 삭제가 완료되었습니다');
    },
    onError: (error: Error) => {
      toast.error(error.message || '계정 삭제 중 오류가 발생했어요');
    },
  });
};
