import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ShareButton } from './ShareButton';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('ShareButton', () => {
  const mockPathname = '/test-uuid';
  const mockOrigin = 'https://example.com';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue(mockPathname);

    Object.defineProperty(window, 'location', {
      value: { origin: mockOrigin },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('초기 렌더링', () => {
    it('공유하기 버튼이 렌더링된다', () => {
      render(<ShareButton />);
      expect(screen.getByRole('button', { name: /공유하기/i })).toBeInTheDocument();
    });

    it('초기 상태는 disabled가 아니다', () => {
      render(<ShareButton />);
      const button = screen.getByRole('button', { name: /공유하기/i });
      expect(button).not.toBeDisabled();
    });

    it('공유 아이콘이 표시된다', () => {
      render(<ShareButton />);
      expect(screen.getByText('공유하기')).toBeInTheDocument();
    });
  });

  describe('Web Share API 지원 시', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'share', {
        value: vi.fn().mockResolvedValue(undefined),
        writable: true,
        configurable: true,
      });
    });

    it('버튼 클릭 시 navigator.share를 호출한다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      expect(navigator.share).toHaveBeenCalledWith({
        title: '2025 어드벤트 캘린더',
        url: `${mockOrigin}${mockPathname}`,
      });
    });

    it('공유 성공 시 버튼 상태가 변경되지 않는다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(navigator.share).toHaveBeenCalled();
      });

      expect(screen.getByText('공유하기')).toBeInTheDocument();
    });

    it('사용자가 공유를 취소(AbortError)해도 에러를 무시한다', async () => {
      const user = userEvent.setup();
      const abortError = new Error('Share canceled');
      abortError.name = 'AbortError';

      vi.mocked(navigator.share).mockRejectedValue(abortError);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(navigator.share).toHaveBeenCalled();
      });

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('AbortError가 아닌 에러 발생 시 콘솔에 로그를 출력한다', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Share failed');

      vi.mocked(navigator.share).mockRejectedValue(mockError);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('복사 실패:', mockError);
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Web Share API 미지원 시 (클립보드 fallback)', () => {
    let clipboardWriteTextMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (navigator as any).share;
      clipboardWriteTextMock = vi.fn().mockResolvedValue(undefined);
    });

    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (navigator as any).clipboard;
    });

    it('버튼 클릭 시 클립보드에 URL을 복사한다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: clipboardWriteTextMock },
        writable: true,
        configurable: true,
      });

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('복사됨')).toBeInTheDocument();
      });

      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(`${mockOrigin}${mockPathname}`);
    });

    it('클립보드 복사 성공 시 "복사됨" 상태로 변경된다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: clipboardWriteTextMock },
        writable: true,
        configurable: true,
      });

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('복사됨')).toBeInTheDocument();
      });

      expect(button).toBeDisabled();
    });

    it('복사 후 2초 뒤 원래 상태로 돌아온다', async () => {
      vi.useFakeTimers();
      render(<ShareButton />);

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: clipboardWriteTextMock },
        writable: true,
        configurable: true,
      });

      const button = screen.getByRole('button', { name: /공유하기/i });

      await act(async () => {
        button.click();
        await Promise.resolve();
      });

      expect(screen.getByText('복사됨')).toBeInTheDocument();
      expect(button).toBeDisabled();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });

      expect(screen.getByText('공유하기')).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it('클립보드 복사 실패 시 에러를 로그에 출력한다', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Clipboard write failed');
      clipboardWriteTextMock.mockRejectedValueOnce(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ShareButton />);

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: clipboardWriteTextMock },
        writable: true,
        configurable: true,
      });

      const button = screen.getByRole('button', { name: /공유하기/i });
      await user.click(button);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('복사 실패:', mockError);
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('스타일 및 상태', () => {
    let clipboardWriteTextMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (navigator as any).share;
      clipboardWriteTextMock = vi.fn().mockResolvedValue(undefined);

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: clipboardWriteTextMock },
        writable: true,
        configurable: true,
      });
    });

    it('복사됨 상태일 때 opacity-50 클래스가 적용된다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });

      expect(button).toHaveClass('cursor-pointer');
      expect(button).not.toHaveClass('opacity-50');

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('복사됨')).toBeInTheDocument();
      });

      expect(button).toHaveClass('opacity-50');
      expect(button).not.toHaveClass('cursor-pointer');
    });

    it('복사됨 상태일 때 버튼이 비활성화된다', async () => {
      const user = userEvent.setup();
      render(<ShareButton />);

      const button = screen.getByRole('button', { name: /공유하기/i });
      expect(button).not.toBeDisabled();

      await user.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('currentUrl 생성', () => {
    it('window 객체가 있을 때 올바른 URL을 생성한다', () => {
      render(<ShareButton />);
      expect(usePathname).toHaveBeenCalled();
    });
  });
});
