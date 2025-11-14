import { fetcher } from './axios';
import { ApiResponse, LettersResponse, WriteLetterRequest } from '@/types/api';

export const writeLetter = async (uuid: string, letterData: WriteLetterRequest) => {
  return await fetcher<ApiResponse<null>>({
    method: 'POST',
    url: `/api/${uuid}/letters`,
    data: letterData,
  });
};

export const getLetters = async (uuid: string, day: number) => {
  return await fetcher<ApiResponse<LettersResponse>>({
    method: 'GET',
    url: `/api/${uuid}/letters/${day}`,
  });
};
