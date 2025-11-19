// src/hooks/useRefreshFailed.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
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

  it('auth:refresh-failed 이벤트 발생 시 로그아웃 처리한다', async () => {
    const wrapper = createWrapper();
    const queryClearSpy = vi.spyOn(wrapper.queryClient, 'clear');

    const { result } = renderHook(
      () => {
        useRefreshFailed();
        const user = useAtomValue(userAtom);
        return { user };
      },
      { wrapper },
    );

    // 이벤트 발생
    window.dispatchEvent(new CustomEvent('auth:refresh-failed'));

    await waitFor(() => {
      expect(result.current.user).toEqual({
        uuid: null,
        name: null,
        color: null,
        isAuthenticated: false,
      });
    });

    expect(queryClearSpy).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(toast.error).toHaveBeenCalledWith('세션이 만료되었습니다. 다시 로그인해주세요.');
  });

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
});
