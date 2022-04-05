/**
 * 操作状态管理
 */

export interface IStatusManage<T> {
  setStatus: (status: T) => void;
  getStatus: () => T;
  checkStatus: (status: T) => boolean;
  resetStatus: () => void;
}

class StatusManage<T> implements IStatusManage<T> {
  private currentStatus: T;
  private defaultStatus: T;

  constructor(currentStatus: T, defaultStatus: T) {
    this.currentStatus = currentStatus;
    this.defaultStatus = defaultStatus;
  }

  setStatus(status: T) {
    this.currentStatus = status;
  }

  getStatus() {
    return this.currentStatus;
  }

  resetStatus() {
    this.currentStatus = this.defaultStatus;
  }

  checkStatus(status: T) {
    return this.currentStatus === status;
  }
}

export default StatusManage;
