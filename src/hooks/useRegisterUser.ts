import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { registerUser } from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';
import { UserRegisterRequest } from '@/types/api';

export const useRegisterUser = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: (userData: UserRegisterRequest) => {
      return registerUser(userData);
    },
    onSuccess: (response) => {
      setUser({
        uuid: response.data.uuid,
        email: response.data.email,
        name: response.data.name,
        color: response.data.color,
        isAuthenticated: true,
      });

      router.push(`/${response.data.uuid}`);
      toast.success('회원가입이 완료되었어요');
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error(error.message || '회원가입 중 오류가 발생했어요');
    },
  });
};
