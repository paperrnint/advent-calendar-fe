import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 *
 * @param endpoint API 엔드포인트 경로 (/로 시작)
 * @param options fetch 옵션
 * @returns Promise<ApiResponse<T>>
 */
export const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<ApiResponse<T>> => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
};
