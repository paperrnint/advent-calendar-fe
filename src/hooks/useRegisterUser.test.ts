import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRegisterUser } from './useRegisterUser';
import { RibbonColor } from '@/constants';
import * as authApi from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';
import { mockRouter } from '@/test/mocks';
import { createWrapper } from '@/test/wrapper';

vi.mock('@/lib/api/auth');
vi.mock('sonner');
vi.mock('next/navigation');

describe('useRegisterUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  describe('성공 케이스', () => {
    it('회원가입을 성공적으로 완료한다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: {
          uuid: 'test-uuid-123',
          email: 'test@example.com',
          name: '테스트 유저',
          color: 'green' as RibbonColor,
        },
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(authApi.registerUser).mockResolvedValue(mockResponse);

      const { result } = renderHook(
        () => {
          const mutation = useRegisterUser();
          const user = useAtomValue(userAtom);
          return { mutation, user };
        },
        { wrapper: createWrapper() },
      );

      const userData = {
        name: '테스트 유저',
        color: 'green' as const,
      };

      result.current.mutation.mutate(userData);

      // 최종 상태 확인
      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBe(true);
      });

      expect(authApi.registerUser).toHaveBeenCalledWith(userData);
      expect(result.current.user).toEqual({
        uuid: 'test-uuid-123',
        email: 'test@example.com',
        name: '테스트 유저',
        color: 'green',
        isAuthenticated: true,
      });
      expect(toast.success).toHaveBeenCalledWith('회원가입이 완료되었어요');

      await waitFor(
        () => {
          expect(mockRouter.push).toHaveBeenCalledWith('/test-uuid-123');
        },
        { timeout: 200 },
      );
    });

    it('다양한 색상으로 회원가입할 수 있다', async () => {
      const colors = ['green', 'brown', 'red', 'orange', 'blue'] as const;

      for (const color of colors) {
        vi.clearAllMocks();

        const mockResponse = {
          status: 201,
          message: 'success',
          data: {
            uuid: `uuid-${color}`,
            email: 'test@example.com',
            name: '테스트',
            color: color,
          },
          timestamp: '2025-11-12T15:30:00',
        };

        vi.mocked(authApi.registerUser).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useRegisterUser(), {
          wrapper: createWrapper(),
        });

        result.current.mutate({
          name: '테스트',
          color,
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(authApi.registerUser).toHaveBeenCalledWith({
          name: '테스트',
          color,
        });
      }
    });
  });

  describe('에러 케이스', () => {
    it('에러 발생 시 에러 토스트를 표시한다', async () => {
      const mockError = new Error('이미 존재하는 사용자입니다');
      vi.mocked(authApi.registerUser).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => {
          const mutation = useRegisterUser();
          return { mutation };
        },
        { wrapper: createWrapper() },
      );

      result.current.mutation.mutate({
        name: '테스트',
        color: 'green',
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('이미 존재하는 사용자입니다');
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

      consoleErrorSpy.mockRestore();
    });

    it('에러 메시지가 없으면 기본 메시지를 표시한다', async () => {
      const mockError = new Error();
      vi.mocked(authApi.registerUser).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        name: '테스트',
        color: 'green',
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('회원가입 중 오류가 발생했어요');

      consoleErrorSpy.mockRestore();
    });

    it('에러 발생 시 router.push를 호출하지 않는다', async () => {
      const mockError = new Error('에러');
      vi.mocked(authApi.registerUser).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        name: '테스트',
        color: 'green',
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockRouter.push).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('400 에러를 처리한다', async () => {
      const mockError = Object.assign(new Error('잘못된 요청입니다'), {
        status: 400,
      });
      vi.mocked(authApi.registerUser).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => {
          const mutation = useRegisterUser();
          return { mutation };
        },
        { wrapper: createWrapper() },
      );

      result.current.mutation.mutate({
        name: '테스트',
        color: 'green',
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('잘못된 요청입니다');

      consoleErrorSpy.mockRestore();
    });

    it('409 중복 에러를 처리한다', async () => {
      const mockError = Object.assign(new Error('이미 존재하는 사용자입니다'), {
        status: 409,
      });
      vi.mocked(authApi.registerUser).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(
        () => {
          const mutation = useRegisterUser();
          return { mutation };
        },
        { wrapper: createWrapper() },
      );

      result.current.mutation.mutate({
        name: '테스트',
        color: 'green',
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('이미 존재하는 사용자입니다');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('로딩 상태', () => {
    it('mutation 시작 전에는 isPending이 false다', () => {
      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);
    });

    it('mutation 중에는 isPending이 true다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: {
          uuid: 'test-uuid',
          email: 'test@example.com',
          name: '테스트',
          color: 'green' as RibbonColor,
        },
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(authApi.registerUser).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockResponse), 100);
          }),
      );

      const { result } = renderHook(() => useRegisterUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        name: '테스트',
        color: 'green',
      });

      // 즉시 pending
      await waitFor(() => {
        expect(result.current.isPending).toBe(true);
      });

      // 완료 후 false
      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });
    });
  });
});
