import { fetcher } from './axios';
import { ApiResponse, WriteLetterRequest } from '@/types/api';

export const writeLetter = async (uuid: string, letterData: WriteLetterRequest) => {
  return await fetcher<ApiResponse<null>>({
    method: 'POST',
    url: `/api/${uuid}/letters`,
    data: letterData,
  });
};
