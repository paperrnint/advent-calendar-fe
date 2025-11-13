import { registerUser } from '@/lib/api/auth';
import { authErrorAtom, authLoadingAtom, userAtom } from '@/stores/authStore';
import { UserRegisterRequest } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useRegisterUser = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setError = useSetAtom(authErrorAtom);

  return useMutation({
    mutationFn: (userData: UserRegisterRequest) => {
      setLoading(true);
      setError(null);
      return registerUser(userData);
    },
    onSuccess: (response, userData) => {
      setUser({
        uuid: response.data.uuid,
        name: userData.name,
        color: userData.color,
        isAuthenticated: true,
      });

      router.push(`/${response.data.uuid}`);
      toast.success('회원가입이 완료되었어요');
    },
    onError: (error: Error) => {
      console.error(error);
      setError(error.message);
      toast.error(error.message || '회원가입 중 오류가 발생했어요');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
