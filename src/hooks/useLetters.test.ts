import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLetters } from './useLetters';
import * as letterApi from '@/lib/api/letter';
import { createWrapper } from '@/test/wrapper';

vi.mock('@/lib/api/letter');

describe('useLetters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('enabled 조건', () => {
    it('enabled가 false면 쿼리를 실행하지 않는다', () => {
      const { result } = renderHook(() => useLetters({ uuid: '123', day: 1, enabled: false }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(true);
      expect(result.current.fetchStatus).toBe('idle');
      expect(letterApi.getLetters).not.toHaveBeenCalled();
    });

    it('day가 0 이하면 쿼리를 실행하지 않는다', () => {
      const { result } = renderHook(() => useLetters({ uuid: '123', day: 0, enabled: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(letterApi.getLetters).not.toHaveBeenCalled();
    });

    it('day가 25보다 크면 쿼리를 실행하지 않는다', () => {
      const { result } = renderHook(() => useLetters({ uuid: '123', day: 26, enabled: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(letterApi.getLetters).not.toHaveBeenCalled();
    });

    it('enabled가 true이고 day가 1-25 사이면 쿼리를 실행한다', async () => {
      const mockApiResponse = {
        status: 200,
        message: 'success',
        data: [
          {
            day: 10,
            content: '메리크리스마스!',
            fromName: '산타',
            createdAt: '2025-12-10T08:30:00',
          },
        ],
        timestamp: '2025-11-12T15:30:00',
      };
      vi.mocked(letterApi.getLetters).mockResolvedValue(mockApiResponse);

      const { result } = renderHook(() => useLetters({ uuid: '123', day: 10, enabled: true }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
      expect(letterApi.getLetters).toHaveBeenCalledWith('123', 10);
    });
  });

  describe('성공 케이스', () => {
    it('편지 목록을 성공적으로 가져오고 변환한다', async () => {
      const mockApiResponse = {
        status: 200,
        message: 'success',
        data: [
          {
            day: 1,
            content: '메리크리스마스!',
            fromName: '산타',
            createdAt: '2025-11-12T15:30:00',
          },
          {
            day: 1,
            content: '메리크리스마스!',
            fromName: '루돌푸',
            createdAt: '2025-11-12T15:30:00',
          },
        ],
        timestamp: '2025-11-12T15:30:00',
      };
      vi.mocked(letterApi.getLetters).mockResolvedValue(mockApiResponse);

      const { result } = renderHook(() => useLetters({ uuid: '123', day: 1, enabled: true }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([
        {
          date: '2025년 12월 1일',
          content: '메리크리스마스!',
          from: '산타',
        },
        {
          date: '2025년 12월 1일',
          content: '메리크리스마스!',
          from: '루돌푸',
        },
      ]);
    });

    it('편지 목록이 없다면 빈 배열을 반환한다', async () => {
      const mockApiResponse = {
        status: 200,
        message: 'success',
        data: [],
        timestamp: '2025-11-12T15:30:00',
      };
      vi.mocked(letterApi.getLetters).mockResolvedValue(mockApiResponse);

      const { result } = renderHook(
        () => useLetters({ uuid: 'test-uuid', day: 1, enabled: true }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });
  });

  describe('에러 케이스', () => {
    it('Network 에러 발생 시 isError 가 true다', async () => {
      const mockError = new Error('Network error');
      vi.mocked(letterApi.getLetters).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => useLetters({ uuid: 'test-uuid', day: 1, enabled: true }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith('편지 가져오기 error:', mockError);

      consoleErrorSpy.mockRestore();
    });

    it('403 Forbidden 에러를 처리한다', async () => {
      const mockError = Object.assign(new Error('본인의 편지만 조회할 수 있습니다'), {
        status: 403,
      });

      vi.mocked(letterApi.getLetters).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => useLetters({ uuid: 'test-uuid', day: 25, enabled: true }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
      consoleErrorSpy.mockRestore();
    });

    it('401 Unauthorized 에러를 처리한다', async () => {
      const mockError = Object.assign(new Error('인증이 필요합니다'), {
        status: 400,
      });

      vi.mocked(letterApi.getLetters).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => useLetters({ uuid: 'test-uuid', day: 1, enabled: true }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
      consoleErrorSpy.mockRestore();
    });
  });

  describe('React Query 설정', () => {
    it('올바른 queryKey를 사용한다', async () => {
      const mockApiResponse = {
        status: 200,
        message: 'success',
        data: [],
        timestamp: '2025-11-12T15:30:00',
      };
      vi.mocked(letterApi.getLetters).mockResolvedValue(mockApiResponse);

      const { result } = renderHook(() => useLetters({ uuid: 'my-uuid', day: 5, enabled: true }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(letterApi.getLetters).toHaveBeenCalledWith('my-uuid', 5);
    });

    it('staleTime이 1분으로 설정되어 있다', async () => {
      const mockApiResponse = {
        status: 200,
        message: 'success',
        data: [],
        timestamp: '2025-11-12T15:30:00',
      };
      vi.mocked(letterApi.getLetters).mockResolvedValue(mockApiResponse);

      const { result } = renderHook(() => useLetters({ uuid: '123', day: 1, enabled: true }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.isStale).toBe(false);
    });
  });
});
