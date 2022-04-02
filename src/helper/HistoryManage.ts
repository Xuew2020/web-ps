/**
 * 历史记录管理
 */

export interface IHistoryManage<T> {
  setHistory: (data: T) => void;
  getHistory: (index: number) => T | null;
  getLength: () => number;
  remove: (index: number) => void;
}

class HistoryManage<T> implements IHistoryManage<T> {
  private store: T[];

  constructor(store: T[] = []) {
    this.store = store;
  }

  setHistory(data: T) {
    this.store.push(data);
  }

  getHistory(index: number) {
    if (index < 0 || index >= this.getLength()) {
      return null;
    }
    return this.store[index];
  }

  remove(index: number = -1) {
    const length = this.getLength();
    if (index < -1 || index >= length) {
      return;
    }
    this.store.splice(index + 1, length);
  }

  getLength() {
    return this.store.length;
  }
}

export default HistoryManage;
