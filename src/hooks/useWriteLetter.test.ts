import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useWriteLetter } from './useWriteLetter';
import * as letterApi from '@/lib/api/letter';
import { createWrapper } from '@/test/wrapper';

vi.mock('@/lib/api/letter');
vi.mock('sonner');

describe('useWriteLetter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('성공 케이스', () => {
    it('편지를 성공적으로 보낸다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(letterApi.writeLetter).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid' }), {
        wrapper: createWrapper(),
      });

      const letterData = {
        day: 1,
        content: '메리크리스마스!',
        fromName: '산타',
      };

      result.current.sendLetterMutation(letterData);

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(letterApi.writeLetter).toHaveBeenCalledWith('test-uuid', letterData);
      expect(toast.success).toHaveBeenCalledWith('편지를 성공적으로 전송했어요');
    });

    it('성공 시 onSuccess 콜백을 호출한다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(letterApi.writeLetter).mockResolvedValue(mockResponse);

      const onSuccess = vi.fn();

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid', onSuccess }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it('성공 시 onClose 콜백을 호출한다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(letterApi.writeLetter).mockResolvedValue(mockResponse);

      const onClose = vi.fn();

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid', onClose }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('onSuccess와 onClose가 모두 호출된다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(letterApi.writeLetter).mockResolvedValue(mockResponse);

      const onSuccess = vi.fn();
      const onClose = vi.fn();

      const { result } = renderHook(
        () => useWriteLetter({ uuid: 'test-uuid', onSuccess, onClose }),
        { wrapper: createWrapper() },
      );

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  describe('에러 케이스', () => {
    it('에러 발생 시 에러 토스트를 표시한다', async () => {
      const mockError = new Error('편지 전송에 실패했습니다');
      vi.mocked(letterApi.writeLetter).mockRejectedValue(mockError);

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid' }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('편지 전송에 실패했습니다');
      });
    });

    it('에러 메시지가 없으면 기본 메시지를 표시한다', async () => {
      const mockError = new Error();
      vi.mocked(letterApi.writeLetter).mockRejectedValue(mockError);

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid' }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('편지를 보내는 중 오류가 발생했어요');
      });
    });

    it('400 에러를 처리한다', async () => {
      const mockError = Object.assign(new Error('잘못된 요청입니다'), {
        status: 400,
      });
      vi.mocked(letterApi.writeLetter).mockRejectedValue(mockError);

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid' }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('잘못된 요청입니다');
      });
    });

    it('에러 발생 시 onClose를 호출하지 않는다', async () => {
      const mockError = new Error('에러');
      vi.mocked(letterApi.writeLetter).mockRejectedValue(mockError);

      const onClose = vi.fn();

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid', onClose }), {
        wrapper: createWrapper(),
      });

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('로딩 상태', () => {
    it('mutation 중에는 isPending이 true다', async () => {
      const mockResponse = {
        status: 201,
        message: 'success',
        data: null,
        timestamp: '2025-11-12T15:30:00',
      };

      vi.mocked(letterApi.writeLetter).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockResponse), 100);
          }),
      );

      const { result } = renderHook(() => useWriteLetter({ uuid: 'test-uuid' }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);

      result.current.sendLetterMutation({
        day: 1,
        content: 'test',
        fromName: 'tester',
      });

      // 즉시 pending 상태 확인
      await waitFor(() => {
        expect(result.current.isPending).toBe(true);
      });

      // 완료 후 pending false
      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });
    });
  });
});
