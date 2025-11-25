import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { writeLetter } from '@/lib/api/letter';
import { WriteLetterRequest } from '@/types/api';

interface Props {
  uuid: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const useWriteLetter = ({ uuid, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: WriteLetterRequest) => writeLetter(uuid, data),
    onSuccess: () => {
      toast.success('편지를 성공적으로 전송했어요');

      queryClient.invalidateQueries({ queryKey: ['letters', uuid] });
      queryClient.invalidateQueries({ queryKey: ['letterCount', uuid] });

      onSuccess?.();
      onClose?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || '편지를 보내는 중 오류가 발생했어요');
    },
  });

  return {
    sendLetterMutation: mutate,
    isPending,
  };
};
