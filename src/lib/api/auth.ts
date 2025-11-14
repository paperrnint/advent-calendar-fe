import {
  ApiResponse,
  CurrentUserResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from '@/types/api';
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

/**
 *
 * 현재 로그인된 사용자 정보 조회 API
 * accessToken (cookie) 있는 경우에만 호출 가능
 */
export const getCurrentUser = async () => {
  return await fetcher<ApiResponse<CurrentUserResponse>>({
    method: 'GET',
    url: '/api/auth/me',
  });
};

/**
 * 로그아웃 API
 */
export const logout = async () => {
  return await fetcher<ApiResponse<null>>({
    method: 'POST',
    url: '/api/auth/logout',
  });
};
