import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLogout } from './useLogout';
import * as authApi from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';
import { mockRouter } from '@/test/mocks';
import { createWrapper } from '@/test/wrapper';

vi.mock('@/lib/api/auth');
vi.mock('sonner');
vi.mock('next/navigation');

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  describe('성공 케이스', () => {
    it('로그아웃을 성공적으로 완료한다', async () => {
      const mockResponse = {
        status: 200,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(authApi.logout).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();
      const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          const mutation = useLogout();
          const user = useAtomValue(userAtom);
          return { mutation, user };
        },
        { wrapper },
      );

      result.current.mutation.mutate();

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBe(true);
      });

      expect(authApi.logout).toHaveBeenCalled();
      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
      expect(queryClearSpy).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/');
      expect(toast.success).toHaveBeenCalledWith('로그아웃 완료!');
    });
  });

  describe('에러 케이스', () => {
    it('에러 발생 시에도 로그아웃 처리한다', async () => {
      const mockError = new Error('로그아웃 실패');
      vi.mocked(authApi.logout).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const wrapper = createWrapper();
      const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          const mutation = useLogout();
          const user = useAtomValue(userAtom);
          return { mutation, user };
        },
        { wrapper },
      );

      result.current.mutation.mutate();

      await waitFor(() => {
        expect(result.current.mutation.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('로그아웃 실패');
      expect(result.current.user.isAuthenticated).toBe(false);
      expect(queryClearSpy).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/');

      consoleErrorSpy.mockRestore();
    });

    it('에러 메시지가 없으면 기본 메시지를 표시한다', async () => {
      const mockError = new Error();
      vi.mocked(authApi.logout).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('로그아웃 중 오류가 발생했어요');

      consoleErrorSpy.mockRestore();
    });
  });
});
