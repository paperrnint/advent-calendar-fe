import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Portal } from './Portal';

describe('Portal', () => {
  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    document.getElementById('portal')?.remove();
  });

  describe('정상 렌더링', () => {
    it('children을 portal 요소 내부에 렌더링한다', () => {
      render(
        <Portal>
          <div data-testid="portal-content">Test Content</div>
        </Portal>,
      );

      const portalEl = document.getElementById('portal');
      expect(portalEl).toContainElement(screen.getByTestId('portal-content'));
      expect(screen.getByTestId('portal-content')).toHaveTextContent('Test Content');
    });

    it('여러 children을 렌더링한다', () => {
      render(
        <Portal>
          <div data-testid="first">First</div>
          <div data-testid="second">Second</div>
        </Portal>,
      );

      expect(screen.getByTestId('first')).toBeInTheDocument();
      expect(screen.getByTestId('second')).toBeInTheDocument();
    });
  });

  describe('에러 케이스', () => {
    it('portal 요소가 없으면 렌더링하지 않는다', () => {
      document.getElementById('portal')?.remove();

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Portal>
          <div data-testid="portal-content">Test Content</div>
        </Portal>,
      );

      expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Portal element (#portal) not found');

      consoleErrorSpy.mockRestore();
    });

    it('portal 요소가 없을 때 null을 반환한다', () => {
      document.getElementById('portal')?.remove();

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <Portal>
          <div>Content</div>
        </Portal>,
      );

      expect(container.firstChild).toBeNull();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('언마운트', () => {
    it('언마운트 시 children을 제거한다', () => {
      const { unmount } = render(
        <Portal>
          <div data-testid="portal-content">Test Content</div>
        </Portal>,
      );

      expect(screen.getByTestId('portal-content')).toBeInTheDocument();

      unmount();

      expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument();
    });

    it('언마운트 후 portal 요소는 남아있다', () => {
      const { unmount } = render(
        <Portal>
          <div data-testid="portal-content">Test Content</div>
        </Portal>,
      );

      unmount();

      const portalElement = document.getElementById('portal');
      expect(portalElement).toBeInTheDocument();
      expect(portalElement?.children.length).toBe(0);
    });
  });

  describe('useSyncExternalStore 동작', () => {
    it('마운트 후 children을 렌더링한다', () => {
      render(
        <Portal>
          <div data-testid="portal-content">Mounted Content</div>
        </Portal>,
      );

      // useSyncExternalStore의 getSnapshot이 true를 반환하므로 렌더링됨
      expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    });
  });
});
