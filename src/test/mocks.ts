import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { vi } from 'vitest';

// Router Mock
export const mockRouter: AppRouterInstance = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

// Toast Mock
export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
};

// API Mocks
export const mockAuthApi = {
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  login: vi.fn(),
  registerUser: vi.fn(),
};

export const mockLetterApi = {
  getLetters: vi.fn(),
  writeLetter: vi.fn(),
};
