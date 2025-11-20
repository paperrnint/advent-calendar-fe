// utils/error-tracking.ts
import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';

interface ApiErrorContext {
  url: string;
  method: string;
  status?: number;
  requestData?: unknown;
  responseData?: unknown;
}

/**
 * 범용 API 에러 캡처 (Axios, fetch 모두 사용 가능)
 */
export const captureApiError = (error: Error | AxiosError, context: ApiErrorContext) => {
  const { url, method, status, requestData, responseData } = context;

  // 인증 에러 제외
  if (status === 401 || status === 403) {
    return;
  }

  // 네트워크 에러 (status 없음)
  if (!status) {
    // 타임아웃만 전송
    if (('code' in error && error.code === 'ECONNABORTED') || error.message.includes('timeout')) {
      Sentry.captureException(error, {
        tags: {
          api_error: true,
          error_type: 'timeout',
        },
        contexts: {
          api: { url, method: method.toUpperCase() },
        },
      });
    }
    // 다른 네트워크 에러는 무시
    return;
  }

  // 일반 API 에러
  Sentry.captureException(error, {
    tags: {
      api_error: true,
      status_code: status,
    },
    contexts: {
      api: {
        url,
        method: method.toUpperCase(),
        status,
      },
    },
    extra: {
      requestData,
      responseData,
    },
  });
};

/**
 * Axios 전용 래퍼 (기존 코드 호환)
 */
export const captureAxiosError = (error: AxiosError) => {
  captureApiError(error, {
    url: error.config?.url ?? 'unknown',
    method: error.config?.method ?? 'unknown',
    status: error.response?.status,
    requestData: error.config?.data,
    responseData: error.response?.data,
  });
};
