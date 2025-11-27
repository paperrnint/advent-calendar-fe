import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NavigationMenu } from './NavigationMenu';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useLogout } from '@/hooks/useLogout';
import { mockRouter } from '@/test/mocks';
import { createWrapper } from '@/test/wrapper';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useLogout');

vi.mock('jotai', async () => {
  const actual = await vi.importActual('jotai');
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

describe('NavigationMenu', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    cleanup();
  });

  describe('AuthMenuItems', () => {
    const mockOnDeleteClick = vi.fn();

    beforeEach(async () => {
      const { useAtomValue } = await import('jotai');
      vi.mocked(useAtomValue).mockReturnValue({
        uuid: 'test-uuid-123',
        email: 'test@example.com',
        name: '테스트 유저',
        color: 'green',
        isAuthenticated: true,
      });

      // @ts-expect-error - 테스트에 필요한 필드만 mock
      vi.mocked(useLogout).mockReturnValue({
        mutate: mockLogout,
        isPending: false,
      });
    });

    afterEach(() => {
      mockOnDeleteClick.mockClear();
    });

    it('메뉴 아이템들이 렌더링된다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.AuthItems onDeleteClick={mockOnDeleteClick} />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));

      expect(screen.getByText('내 어드벤트 캘린더')).toBeInTheDocument();
      expect(screen.getByText('로그아웃')).toBeInTheDocument();
      expect(screen.getByText('탈퇴하기')).toBeInTheDocument();
    });

    it('내 어드벤트 캘린더 클릭 시 올바른 UUID로 라우팅한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.AuthItems onDeleteClick={mockOnDeleteClick} />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('내 어드벤트 캘린더'));

      expect(mockRouter.push).toHaveBeenCalledWith('/test-uuid-123');
    });

    it('로그아웃 클릭 시 logout 함수를 호출한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.AuthItems onDeleteClick={mockOnDeleteClick} />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('로그아웃'));

      expect(mockLogout).toHaveBeenCalled();
    });

    it('탈퇴하기 클릭 시 onDeleteClick을 호출한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.AuthItems onDeleteClick={mockOnDeleteClick} />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('탈퇴하기'));

      expect(mockOnDeleteClick).toHaveBeenCalled();
    });

    it('isPending이 true일 때 메뉴 아이템들이 disabled 상태다', async () => {
      const user = userEvent.setup();

      // @ts-expect-error - 테스트에 필요한 필드만 mock
      vi.mocked(useLogout).mockReturnValue({
        mutate: mockLogout,
        isPending: true,
      });

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.AuthItems onDeleteClick={mockOnDeleteClick} />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));

      const calendarItem = screen.getByText('내 어드벤트 캘린더').closest('[role="menuitem"]');
      const logoutItem = screen.getByText('로그아웃').closest('[role="menuitem"]');
      const deleteItem = screen.getByText('탈퇴하기').closest('[role="menuitem"]');

      // disabled 속성 확인
      expect(calendarItem).toHaveAttribute('data-disabled');
      expect(logoutItem).toHaveAttribute('data-disabled');
      expect(deleteItem).toHaveAttribute('data-disabled');
    });
  });

  describe('UnauthMenuItems', () => {
    it('메뉴 아이템들이 렌더링된다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.UnauthItems />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));

      expect(screen.getByText('어드벤트 캘린더 생성')).toBeInTheDocument();
      expect(screen.getByText('로그인')).toBeInTheDocument();
    });

    it('어드벤트 캘린더 생성 클릭 시 홈으로 이동한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.UnauthItems />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('어드벤트 캘린더 생성'));

      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });

    it('로그인 클릭 시 홈으로 이동한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.UnauthItems />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('로그인'));

      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });

    it('goToHome 함수가 올바르게 동작한다', async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
          <NavigationMenu.Content>
            <NavigationMenu.UnauthItems />
          </NavigationMenu.Content>
        </DropdownMenu>,
        { wrapper: createWrapper() },
      );

      await user.click(screen.getByRole('button', { name: /메뉴/i }));
      await user.click(screen.getByText('어드벤트 캘린더 생성'));

      expect(mockRouter.push).toHaveBeenNthCalledWith(1, '/');
    });
  });
});
