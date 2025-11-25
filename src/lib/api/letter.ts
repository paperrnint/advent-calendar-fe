import { fetcher } from './axios';
import { ApiResponse, LetterCountResponse, LettersResponse, WriteLetterRequest } from '@/types/api';

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

export const getLetterCount = async (uuid: string) => {
  return await fetcher<ApiResponse<LetterCountResponse>>({
    method: 'GET',
    url: `/api/${uuid}/letters/count`,
  });
};
