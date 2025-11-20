import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { RefreshManager } from '@/models/RefreshManager';
import { captureAxiosError } from '@/utils';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const refreshManager = new RefreshManager();

export const axiosInstance = axios.create({
  baseURL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // error tracking
    captureAxiosError(error);

    // 401 error - refresh token
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshManager.refreshing) {
        try {
          await refreshManager.addToQueue();
          return axiosInstance(originalRequest);
        } catch (queueError) {
          return Promise.reject(queueError);
        }
      }

      refreshManager.startRefresh();

      try {
        await refreshClient.post('/api/auth/refresh');
        refreshManager.processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshManager.processQueue(refreshError as Error);

        // refresh 요청이 401로 실패한 경우에만 이벤트 발생
        // (로그아웃 상태가 아니었는데 세션이 만료된 경우)
        const isRefreshTokenExpired =
          axios.isAxiosError(refreshError) && refreshError.response?.status === 401;

        if (isRefreshTokenExpired && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:refresh-failed'));
        }

        return Promise.reject(refreshError);
      } finally {
        refreshManager.endRefresh();
      }
    }

    // extract message from error response
    const hasErrorMessage =
      error.response?.data &&
      typeof error.response.data === 'object' &&
      'message' in error.response.data;

    const errorMessage = hasErrorMessage
      ? (error.response?.data as { message: string }).message
      : '서버 연결 중 오류가 발생했습니다.';

    const enhancedError = new Error(errorMessage) as Error & {
      status: number;
      originalError: AxiosError;
    };

    enhancedError.status = error.response?.status || 500;
    enhancedError.originalError = error;

    return Promise.reject(enhancedError);
  },
);

export const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance<T>(config);
  return response.data;
};

export default axiosInstance;
