export class RefreshManager {
  #isRefreshing = false;
  #failedQueue: Array<{
    resolve: (value: void | PromiseLike<void>) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  get refreshing() {
    return this.#isRefreshing;
  }

  startRefresh() {
    this.#isRefreshing = true;
  }

  endRefresh() {
    this.#isRefreshing = false;
  }

  addToQueue() {
    return new Promise<void>((resolve, reject) => {
      this.#failedQueue.push({ resolve, reject });
    });
  }

  processQueue(error: Error | null) {
    this.#failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.#failedQueue = [];
  }
}
