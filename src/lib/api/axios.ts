import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
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
  const { data } = await axiosInstance(config);
  return data;
};

export default axiosInstance;
