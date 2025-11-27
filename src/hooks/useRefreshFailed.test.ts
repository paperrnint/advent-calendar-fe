import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRefreshFailed } from './useRefreshFailed';
import { userAtom } from '@/stores/authStore';
import { mockRouter } from '@/test/mocks';
import { createWrapper } from '@/test/wrapper';

vi.mock('sonner');
vi.mock('next/navigation');

describe('useRefreshFailed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  describe('로그인 상태에서 이벤트 발생', () => {
    it('auth:refresh-failed 이벤트 발생 시 로그아웃 처리한다', async () => {
      const wrapper = createWrapper();
      const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          const setUser = useSetAtom(userAtom);
          useRefreshFailed();
          const user = useAtomValue(userAtom);
          return { user, setUser };
        },
        { wrapper },
      );

      // 먼저 로그인 상태로 설정
      result.current.setUser({
        uuid: 'test-uuid',
        email: 'test@example.com',
        name: '테스트',
        color: 'green',
        isAuthenticated: true,
      });

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(true);
      });

      // 이벤트 발생
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        expect(result.current.user).toEqual({
          uuid: null,
          email: null,
          name: null,
          color: null,
          isAuthenticated: false,
        });
      });

      expect(queryClearSpy).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/');
      expect(toast.error).toHaveBeenCalledWith('세션이 만료되었습니다. 다시 로그인해주세요.');
    });
  });

  describe('unknown 상태에서 이벤트 발생', () => {
    it('초기 로딩 중(unknown)에는 토스트를 표시하지 않는다', async () => {
      const wrapper = createWrapper();
      const queryClientSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          useRefreshFailed();
          const user = useAtomValue(userAtom);
          return { user };
        },
        { wrapper },
      );

      // 초기 상태는 unknown
      expect(result.current.user.isAuthenticated).toBe('unknown');

      // 이벤트 발생
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        // 상태는 그대로 유지
        expect(result.current.user).toEqual({
          uuid: null,
          email: null,
          name: null,
          color: null,
          isAuthenticated: 'unknown',
        });
      });

      // 로그아웃 처리가 실행되지 않음
      expect(queryClientSpy).not.toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe('로그아웃 상태에서 이벤트 발생', () => {
    it('이미 로그아웃 상태면 토스트를 표시하지 않는다', async () => {
      const wrapper = createWrapper();
      const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

      const { result } = renderHook(
        () => {
          const setUser = useSetAtom(userAtom);
          useRefreshFailed();
          const user = useAtomValue(userAtom);
          return { user, setUser };
        },
        { wrapper },
      );

      // 명시적으로 로그아웃 상태로 설정
      result.current.setUser({
        uuid: null,
        email: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(false);
      });

      // 이벤트 발생
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        // 상태는 그대로 유지
        expect(result.current.user).toEqual({
          uuid: null,
          email: null,
          name: null,
          color: null,
          isAuthenticated: false,
        });
      });

      // 로그아웃 처리가 실행되지 않음
      expect(queryClearSpy).not.toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('로그아웃 후 다시 이벤트가 발생해도 토스트를 표시하지 않는다', async () => {
      const wrapper = createWrapper();

      const { result } = renderHook(
        () => {
          const setUser = useSetAtom(userAtom);
          useRefreshFailed();
          const user = useAtomValue(userAtom);
          return { user, setUser };
        },
        { wrapper },
      );

      // 먼저 로그인 상태로 설정
      result.current.setUser({
        uuid: 'test-uuid',
        email: 'test@example.com',
        name: '테스트',
        color: 'green',
        isAuthenticated: true,
      });

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(true);
      });

      // 첫 번째 이벤트 - 로그아웃 처리됨
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(false);
      });

      expect(toast.error).toHaveBeenCalledTimes(1);

      // toast mock 초기화
      vi.mocked(toast.error).mockClear();

      // 두 번째 이벤트 - 이미 로그아웃 상태이므로 무시됨
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        // 토스트가 다시 표시되지 않음
        expect(toast.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('상태 전환 시나리오', () => {
    it('unknown -> true -> false 순서로 전환될 때 올바르게 동작한다', async () => {
      const wrapper = createWrapper();

      const { result } = renderHook(
        () => {
          const setUser = useSetAtom(userAtom);
          useRefreshFailed();
          const user = useAtomValue(userAtom);
          return { user, setUser };
        },
        { wrapper },
      );

      // 1. 초기 상태(unknown)에서 이벤트 발생 - 무시됨
      expect(result.current.user.isAuthenticated).toBe('unknown');
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        expect(toast.error).not.toHaveBeenCalled();
      });

      // 2. 로그인 상태로 전환
      result.current.setUser({
        uuid: 'test-uuid',
        email: 'test@example.com',
        name: '테스트',
        color: 'green',
        isAuthenticated: true,
      });

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(true);
      });

      // 3. 로그인 상태에서 이벤트 발생 - 로그아웃 처리됨
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

      await waitFor(() => {
        expect(result.current.user.isAuthenticated).toBe(false);
        expect(toast.error).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('이벤트 리스너 관리', () => {
    it('언마운트 시 이벤트 리스너를 제거한다', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useRefreshFailed(), {
        wrapper: createWrapper(),
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('auth:refresh-failed', expect.any(Function));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'auth:refresh-failed',
        expect.any(Function),
      );
    });

    it('컴포넌트가 마운트될 때 이벤트 리스너를 등록한다', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      renderHook(() => useRefreshFailed(), {
        wrapper: createWrapper(),
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('auth:refresh-failed', expect.any(Function));
    });
  });
});
