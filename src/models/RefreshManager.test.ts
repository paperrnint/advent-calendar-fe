import { describe, it, expect, beforeEach } from 'vitest';

import { RefreshManager } from './RefreshManager';

describe('RefreshManager', () => {
  let manager: RefreshManager;

  beforeEach(() => {
    manager = new RefreshManager();
  });

  describe('refresh 상태 관리', () => {
    it('초기 상태는 refreshing이 false다', () => {
      expect(manager.refreshing).toBe(false);
    });

    it('startRefresh를 호출하면 refreshing이 true가 된다', () => {
      manager.startRefresh();
      expect(manager.refreshing).toBe(true);
    });

    it('endRefresh를 호출하면 refreshing이 false가 된다', () => {
      manager.startRefresh();
      manager.endRefresh();
      expect(manager.refreshing).toBe(false);
    });

    it('여러 번 startRefresh를 호출해도 refreshing은 true를 유지한다', () => {
      manager.startRefresh();
      manager.startRefresh();
      manager.startRefresh();
      expect(manager.refreshing).toBe(true);
    });
  });

  describe('큐 관리', () => {
    it('addToQueue는 Promise를 반환한다', () => {
      const promise = manager.addToQueue();
      expect(promise).toBeInstanceOf(Promise);
    });

    it('processQueue에서 error가 null이면 큐의 모든 Promise를 resolve한다', async () => {
      const promise1 = manager.addToQueue();
      const promise2 = manager.addToQueue();
      const promise3 = manager.addToQueue();

      manager.processQueue(null);

      await expect(promise1).resolves.toBeUndefined();
      await expect(promise2).resolves.toBeUndefined();
      await expect(promise3).resolves.toBeUndefined();
    });

    it('processQueue에서 error가 있으면 큐의 모든 Promise를 reject한다', async () => {
      const testError = new Error('Refresh failed');

      const promise1 = manager.addToQueue();
      const promise2 = manager.addToQueue();
      const promise3 = manager.addToQueue();

      manager.processQueue(testError);

      await expect(promise1).rejects.toThrow('Refresh failed');
      await expect(promise2).rejects.toThrow('Refresh failed');
      await expect(promise3).rejects.toThrow('Refresh failed');
    });

    it('processQueue 호출 후 큐가 비워진다', async () => {
      const promise1 = manager.addToQueue();
      const promise2 = manager.addToQueue();

      manager.processQueue(null);

      await Promise.all([promise1, promise2]);

      // 새로운 promise 추가 후 processQueue 호출
      const promise3 = manager.addToQueue();
      manager.processQueue(null);

      // 이전 큐가 비워졌으므로 새 promise만 resolve됨
      await expect(promise3).resolves.toBeUndefined();
    });

    it('빈 큐에서 processQueue를 호출해도 에러가 발생하지 않는다', () => {
      expect(() => manager.processQueue(null)).not.toThrow();
      expect(() => manager.processQueue(new Error('test'))).not.toThrow();
    });
  });

  describe('Integration scenarios', () => {
    it('refresh 시작 → 큐 추가 → 성공 → 종료 흐름을 처리한다', async () => {
      // refresh 시작
      manager.startRefresh();
      expect(manager.refreshing).toBe(true);

      // 대기 중인 요청들을 큐에 추가
      const request1 = manager.addToQueue();
      const request2 = manager.addToQueue();

      // refresh 성공
      manager.processQueue(null);

      // 모든 요청이 성공적으로 처리됨
      await expect(request1).resolves.toBeUndefined();
      await expect(request2).resolves.toBeUndefined();

      // refresh 종료
      manager.endRefresh();
      expect(manager.refreshing).toBe(false);
    });

    it('refresh 시작 → 큐 추가 → 실패 → 종료 흐름을 처리한다', async () => {
      const refreshError = new Error('Token refresh failed');

      // refresh 시작
      manager.startRefresh();
      expect(manager.refreshing).toBe(true);

      // 대기 중인 요청들을 큐에 추가
      const request1 = manager.addToQueue();
      const request2 = manager.addToQueue();

      // refresh 실패
      manager.processQueue(refreshError);

      // 모든 요청이 실패 처리됨
      await expect(request1).rejects.toThrow('Token refresh failed');
      await expect(request2).rejects.toThrow('Token refresh failed');

      // refresh 종료
      manager.endRefresh();
      expect(manager.refreshing).toBe(false);
    });

    it('여러 번의 refresh 사이클을 독립적으로 처리한다', async () => {
      // 첫 번째 사이클
      manager.startRefresh();
      const firstRequest = manager.addToQueue();
      manager.processQueue(null);
      await expect(firstRequest).resolves.toBeUndefined();
      manager.endRefresh();

      // 두 번째 사이클
      manager.startRefresh();
      const secondRequest = manager.addToQueue();
      manager.processQueue(new Error('Second cycle failed'));
      await expect(secondRequest).rejects.toThrow('Second cycle failed');
      manager.endRefresh();

      // 세 번째 사이클
      manager.startRefresh();
      const thirdRequest = manager.addToQueue();
      manager.processQueue(null);
      await expect(thirdRequest).resolves.toBeUndefined();
      manager.endRefresh();

      expect(manager.refreshing).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('processQueue를 여러 번 호출해도 안전하다', async () => {
      const promise = manager.addToQueue();

      manager.processQueue(null);
      manager.processQueue(null);
      manager.processQueue(null);

      await expect(promise).resolves.toBeUndefined();
    });

    it('큐에 추가하지 않고 processQueue를 호출해도 에러가 없다', () => {
      expect(() => {
        manager.processQueue(null);
        manager.processQueue(new Error('test'));
      }).not.toThrow();
    });

    it('endRefresh를 여러 번 호출해도 안전하다', () => {
      manager.startRefresh();
      manager.endRefresh();
      manager.endRefresh();
      manager.endRefresh();

      expect(manager.refreshing).toBe(false);
    });

    it('startRefresh 없이 endRefresh를 호출해도 안전하다', () => {
      expect(() => manager.endRefresh()).not.toThrow();
      expect(manager.refreshing).toBe(false);
    });
  });
});
