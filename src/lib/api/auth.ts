import { ApiResponse, UserRegisterRequest, UserRegisterResponse } from '@/types/api';
import { fetcher } from './axios';

/**
 * 신규 유저 등록 API
 * @param userData name, color
 */
export const registerUser = async (userData: UserRegisterRequest) => {
  return await fetcher<ApiResponse<UserRegisterResponse>>({
    method: 'POST',
    url: '/api/auth/users',
    data: userData,
  });
};
