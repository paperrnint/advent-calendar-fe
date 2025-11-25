import { useQuery } from '@tanstack/react-query';

import { getLetters } from '@/lib/api/letter';
import { LetterModel } from '@/models/Letter';

interface Props {
  uuid: string;
  day: number;
  enabled: boolean;
}

export const useLetters = ({ uuid, day, enabled }: Props) => {
  return useQuery({
    queryKey: ['letters', uuid, day],
    queryFn: async () => {
      try {
        const response = await getLetters(uuid, day);

        // 데이터 타입 변환
        if (response.status === 200 && response.data) {
          return LetterModel.fromApiResponseList(response.data);
        }

        return [];
      } catch (error) {
        console.error('편지 가져오기 error:', error);
        throw error; // -> react query 가 처리하도록
      }
    },
    enabled: enabled && day > 0 && day <= 25,
    staleTime: 1000 * 60,
  });
};
