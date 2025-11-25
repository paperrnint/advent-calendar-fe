import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRestoreAuth } from './useRestoreAuth';
import * as authApi from '@/lib/api/auth';
import { userAtom } from '@/stores/authStore';
import { createWrapper } from '@/test/wrapper';
import { UserData } from '@/types/data';

vi.mock('@/lib/api/auth');

describe('useRestoreAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('초기 상태', () => {
    it('초기 상태는 unknown이다', () => {
      const { result } = renderHook(
        () => {
          const user = useAtomValue(userAtom);
          return { user };
        },
        { wrapper: createWrapper() },
      );

      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: 'unknown',
      });
    });
  });

  describe('성공 케이스', () => {
    it('로그인된 사용자 정보를 불러오고 상태를 true로 변경한다', async () => {
      const mockUser: UserData = {
        uuid: 'test-uuid',
        name: '테스트유저',
        color: 'green',
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        status: 200,
        message: 'success',
        data: mockUser,
        timestamp: '2025-11-12T15:30:00',
      });

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.auth.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({
        uuid: 'test-uuid',
        name: '테스트유저',
        color: 'green',
        isAuthenticated: true,
      });
      expect(result.current.auth.isLoading).toBe(false);
    });

    it('로딩 중에는 isLoading이 true다', async () => {
      vi.mocked(authApi.getCurrentUser).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  status: 200,
                  message: 'success',
                  data: { uuid: 'test', name: 'test', color: 'green' },
                  timestamp: '2025-11-12T15:30:00',
                }),
              100,
            );
          }),
      );

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          return { auth };
        },
        { wrapper: createWrapper() },
      );

      // 로딩 중
      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(true);
      });

      // 완료 후
      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });
    });

    it('로딩 완료 후에만 상태가 업데이트된다', async () => {
      const mockUser: UserData = {
        uuid: 'test-uuid',
        name: '테스트',
        color: 'green',
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        status: 200,
        message: 'success',
        data: mockUser,
        timestamp: '2025-11-12T15:30:00',
      });

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      // 로딩 중에는 unknown 상태 유지
      if (result.current.auth.isLoading) {
        expect(result.current.user.isAuthenticated).toBe('unknown');
      }

      // 로딩 완료 후 true로 변경
      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.user.isAuthenticated).toBe(true);
    });
  });

  describe('미인증 케이스', () => {
    it('401 에러 시 미인증 상태(false)로 설정한다', async () => {
      const mockError = Object.assign(new Error('인증이 필요합니다'), {
        status: 401,
      });

      vi.mocked(authApi.getCurrentUser).mockRejectedValue(mockError);

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.auth.isAuthenticated).toBe(false);
      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
    });

    it('사용자 정보가 없으면 미인증 상태(false)로 설정한다', async () => {
      const mockError = Object.assign(new Error('인증이 필요합니다'), {
        status: 401,
      });

      vi.mocked(authApi.getCurrentUser).mockRejectedValue(mockError);

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.auth.isAuthenticated).toBe(false);
      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
    });
  });

  describe('에러 케이스', () => {
    it('네트워크 에러 발생 시 미인증 상태(false)로 설정한다', async () => {
      const mockError = new Error('Network error');
      vi.mocked(authApi.getCurrentUser).mockRejectedValue(mockError);

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.auth.isAuthenticated).toBe(false);
      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
    });
  });

  describe('상태 전환', () => {
    it('unknown -> true로 올바르게 전환된다', async () => {
      const mockUser: UserData = {
        uuid: 'test-uuid',
        name: '테스트',
        color: 'green',
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        status: 200,
        message: 'success',
        data: mockUser,
        timestamp: '2025-11-12T15:30:00',
      });

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      // 초기 상태
      expect(result.current.user.isAuthenticated).toBe('unknown');

      // 로딩 완료 후
      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.user.isAuthenticated).toBe(true);
    });

    it('unknown -> false로 올바르게 전환된다', async () => {
      const mockError = new Error('Unauthorized');
      vi.mocked(authApi.getCurrentUser).mockRejectedValue(mockError);

      const { result } = renderHook(
        () => {
          const auth = useRestoreAuth();
          const user = useAtomValue(userAtom);
          return { auth, user };
        },
        { wrapper: createWrapper() },
      );

      // 초기 상태
      expect(result.current.user.isAuthenticated).toBe('unknown');

      // 로딩 완료 후
      await waitFor(() => {
        expect(result.current.auth.isLoading).toBe(false);
      });

      expect(result.current.user.isAuthenticated).toBe(false);
    });
  });

  describe('React Query 설정', () => {
    it('retry를 하지 않는다', async () => {
      const mockError = new Error('Error');
      vi.mocked(authApi.getCurrentUser).mockRejectedValue(mockError);

      renderHook(() => useRestoreAuth(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(authApi.getCurrentUser).toHaveBeenCalledTimes(1);
      });

      // retry가 false이므로 1번만 호출
      expect(authApi.getCurrentUser).toHaveBeenCalledTimes(1);
    });

    it('staleTime이 Infinity로 설정되어 있다', async () => {
      const mockUser: UserData = {
        uuid: 'test-uuid',
        name: '테스트',
        color: 'green',
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        status: 200,
        message: 'success',
        data: mockUser,
        timestamp: '2025-11-12T15:30:00',
      });

      const wrapper = createWrapper();

      const { result } = renderHook(() => useRestoreAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true); // staleTime이 Infinity이므로 항상 fresh

      const { result: result2 } = renderHook(() => useRestoreAuth(), { wrapper });

      await waitFor(() => {
        expect(result2.current.isLoading).toBe(false);
      });

      // 여전히 1번만 호출됨 (캐시 사용)
      expect(authApi.getCurrentUser).toHaveBeenCalledTimes(1);
    });
  });
});
