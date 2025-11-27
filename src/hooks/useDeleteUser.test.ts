import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDeleteUser } from './useDeleteUser';
import * as authApi from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';
import { mockRouter } from '@/test/mocks';
import { createWrapper } from '@/test/wrapper';

vi.mock('@/lib/api/auth');
vi.mock('sonner');
vi.mock('next/navigation');

describe('useDeleteUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  describe('성공 케이스', () => {
    it('계정 삭제를 성공적으로 완료한다', async () => {
      const mockResponse = {
        status: 200,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(authApi.deleteUser).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();
      const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          const mutation = useDeleteUser();
          const user = useAtomValue(userAtom);
          return { mutation, user };
        },
        { wrapper },
      );

      result.current.mutation.mutate();

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBe(true);
      });

      expect(authApi.deleteUser).toHaveBeenCalled();
      expect(result.current.user).toEqual({
        uuid: null,
        email: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
      expect(queryClearSpy).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/');
      expect(toast.success).toHaveBeenCalledWith('계정 삭제가 완료되었습니다');
    });
  });

  describe('에러 케이스', () => {
    it('에러 발생 시 에러 토스트를 표시한다', async () => {
      const mockError = new Error('계정 삭제 실패');
      vi.mocked(authApi.deleteUser).mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('계정 삭제 실패');
    });

    it('에러 메시지가 없으면 기본 메시지를 표시한다', async () => {
      const mockError = new Error();
      vi.mocked(authApi.deleteUser).mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith('계정 삭제 중 오류가 발생했어요');
    });
  });

  describe('로딩 상태', () => {
    it('mutation 중에는 isPending이 true다', async () => {
      const mockResponse = {
        status: 200,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(authApi.deleteUser).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockResponse), 100);
          }),
      );

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isPending).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });
    });
  });
});
