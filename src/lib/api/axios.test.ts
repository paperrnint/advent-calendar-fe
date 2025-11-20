import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';

import { RefreshManager } from '@/models/RefreshManager';

vi.mock('@/models/RefreshManager');

interface MockRefreshManager {
  refreshing: boolean;
  startRefresh: Mock;
  endRefresh: Mock;
  addToQueue: Mock;
  processQueue: Mock;
}

describe('axiosInstance', () => {
  let mockAxios: MockAdapter;
  let mockRefreshClient: MockAdapter;
  let mockRefreshManager: MockRefreshManager;

  beforeEach(async () => {
    vi.resetModules();

    mockRefreshManager = {
      refreshing: false,
      startRefresh: vi.fn(),
      endRefresh: vi.fn(),
      addToQueue: vi.fn(),
      processQueue: vi.fn(),
    };

    vi.mocked(RefreshManager).mockImplementation(function (this: RefreshManager) {
      return mockRefreshManager;
    });

    global.window.dispatchEvent = vi.fn();

    // 원본 axios.create 저장
    const originalCreate = axios.create.bind(axios);
    const createdInstances: AxiosInstance[] = [];

    vi.spyOn(axios, 'create').mockImplementation((config) => {
      const instance = originalCreate(config);
      createdInstances.push(instance);
      return instance;
    });

    // axios 모듈 import
    await import('./axios');

    // 첫 번째는 axiosInstance, 두 번째는 refreshClient
    mockAxios = new MockAdapter(createdInstances[0]);
    mockRefreshClient = new MockAdapter(createdInstances[1]);
  });

  afterEach(() => {
    mockAxios?.reset();
    mockRefreshClient?.reset();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('정상 응답', () => {
    it('GET 요청을 성공적으로 수행한다', async () => {
      const { axiosInstance } = await import('./axios');
      const mockData = { id: 1, name: 'test' };
      mockAxios.onGet('/test').reply(200, mockData);

      const response = await axiosInstance.get('/test');

      expect(response.data).toEqual(mockData);
      expect(response.status).toBe(200);
    });

    it('fetcher로 데이터 가져오기', async () => {
      const { fetcher } = await import('./axios');
      const mockData = { id: 1, name: 'test' };
      mockAxios.onGet('/test').reply(200, mockData);

      const data = await fetcher({ method: 'GET', url: '/test' });

      expect(data).toEqual(mockData);
    });
  });

  describe('401 에러 처리 및 토큰 갱신', () => {
    it('401 에러 발생 시 refresh 토큰 요청 후 재시도한다', async () => {
      const { axiosInstance } = await import('./axios');
      const mockData = { id: 1, name: 'test' };

      mockAxios.onGet('/test').replyOnce(401).onGet('/test').reply(200, mockData);
      mockRefreshClient.onPost('/api/auth/refresh').reply(200);

      const response = await axiosInstance.get('/test');

      expect(mockRefreshManager.startRefresh).toHaveBeenCalledTimes(1);
      expect(mockRefreshManager.processQueue).toHaveBeenCalledWith(null);
      expect(mockRefreshManager.endRefresh).toHaveBeenCalledTimes(1);
      expect(response.data).toEqual(mockData);
    });

    it('refresh 진행 중인 경우 큐에 추가 후 재시도한다', async () => {
      const { axiosInstance } = await import('./axios');
      mockRefreshManager.refreshing = true;
      mockRefreshManager.addToQueue.mockResolvedValueOnce(undefined);

      const mockData = { id: 1, name: 'test' };
      mockAxios.onGet('/test').replyOnce(401).onGet('/test').reply(200, mockData);

      const response = await axiosInstance.get('/test');

      expect(mockRefreshManager.addToQueue).toHaveBeenCalledTimes(1);
      expect(mockRefreshManager.startRefresh).not.toHaveBeenCalled();
      expect(response.data).toEqual(mockData);
    });

    it('refresh 실패 시 auth:refresh-failed 이벤트를 발생한다', async () => {
      const { axiosInstance } = await import('./axios');

      mockAxios.onGet('/test').reply(401);
      mockRefreshClient
        .onPost('/api/auth/refresh')
        .reply(401, { message: 'Refresh token expired' });

      await expect(axiosInstance.get('/test')).rejects.toThrow();

      expect(mockRefreshManager.startRefresh).toHaveBeenCalledTimes(1);
      expect(mockRefreshManager.processQueue).toHaveBeenCalledWith(expect.any(Error));
      expect(mockRefreshManager.endRefresh).toHaveBeenCalledTimes(1);
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth:refresh-failed' }),
      );
    });

    it('큐에서 대기 중 에러 발생 시 reject한다', async () => {
      const { axiosInstance } = await import('./axios');
      mockRefreshManager.refreshing = true;
      const queueError = new Error('Queue error');
      mockRefreshManager.addToQueue.mockRejectedValueOnce(queueError);

      mockAxios.onGet('/test').reply(401);

      await expect(axiosInstance.get('/test')).rejects.toThrow('Queue error');
    });

    it('401 재시도는 한 번만 수행한다 (_retry 플래그)', async () => {
      const { axiosInstance } = await import('./axios');

      mockAxios.onGet('/test').replyOnce(401).onGet('/test').reply(401);
      mockRefreshClient.onPost('/api/auth/refresh').reply(200);

      await expect(axiosInstance.get('/test')).rejects.toThrow();

      expect(mockRefreshManager.startRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe('에러 메시지 처리', () => {
    it('서버에서 message 필드가 있는 경우 해당 메시지로 설정한다', async () => {
      const { axiosInstance } = await import('./axios');
      const errorMessage = '잘못된 요청입니다.';
      mockAxios.onGet('/test').reply(400, { message: errorMessage });

      try {
        await axiosInstance.get('/test');
        expect.fail('에러가 발생해야 합니다');
      } catch (error) {
        const enhancedError = error as Error & { status: number; originalError: unknown };
        expect(enhancedError.message).toBe(errorMessage);
        expect(enhancedError.status).toBe(400);
        expect(enhancedError.originalError).toBeDefined();
      }
    });

    it('서버에서 message 필드가 없는 경우 기본 메시지로 설정한다', async () => {
      const { axiosInstance } = await import('./axios');
      mockAxios.onGet('/test').reply(500, { error: 'Internal Server Error' });

      try {
        await axiosInstance.get('/test');
        expect.fail('에러가 발생해야 합니다');
      } catch (error) {
        const enhancedError = error as Error & { status: number };
        expect(enhancedError.message).toBe('서버 연결 중 오류가 발생했습니다.');
        expect(enhancedError.status).toBe(500);
      }
    });

    it('네트워크 에러 시 status 500 에러가 발생한다', async () => {
      const { axiosInstance } = await import('./axios');
      mockAxios.onGet('/test').networkError();

      try {
        await axiosInstance.get('/test');
        expect.fail('에러가 발생해야 합니다');
      } catch (error) {
        const enhancedError = error as Error & { status: number };
        expect(enhancedError.status).toBe(500);
        expect(enhancedError.message).toBe('서버 연결 중 오류가 발생했습니다.');
      }
    });
  });

  describe('동시 요청 처리', () => {
    it('여러 401 요청이 동시에 발생해도 refresh는 한 번만 실행한다', async () => {
      const { axiosInstance } = await import('./axios');
      const mockData1 = { id: 1 };
      const mockData2 = { id: 2 };

      mockAxios
        .onGet('/test1')
        .replyOnce(401)
        .onGet('/test2')
        .replyOnce(401)
        .onGet('/test1')
        .reply(200, mockData1)
        .onGet('/test2')
        .reply(200, mockData2);

      mockRefreshClient.onPost('/api/auth/refresh').reply(200);

      let firstCall = true;
      Object.defineProperty(mockRefreshManager, 'refreshing', {
        get() {
          if (firstCall) {
            firstCall = false;
            return false;
          }
          return true;
        },
        configurable: true,
      });

      mockRefreshManager.addToQueue.mockResolvedValue(undefined);

      const [response1, response2] = await Promise.all([
        axiosInstance.get('/test1'),
        axiosInstance.get('/test2'),
      ]);

      expect(response1.data).toEqual(mockData1);
      expect(response2.data).toEqual(mockData2);
      expect(mockRefreshManager.startRefresh).toHaveBeenCalledTimes(1);
      expect(mockRefreshManager.addToQueue).toHaveBeenCalled();
    });
  });
});
