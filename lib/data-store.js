/*
 * @Author: wenquan.huang
 * @Date: 2018-11-16 20:57:54
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-30 13:58:41
 * @ 公共缓存区域
 */

export class DataStore {
  constructor() {
    this.map = new Map();
  }

  // 工厂方法
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  set(key, value) {
    this.map.set(key, value);
    // 返回当前 方便链式调用
    return this;
  }

  get(value) {
    return this.map.get(value);
  }
}
