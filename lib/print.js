/*
 * @Author: wenquan.huang
 * @Date: 2018-11-25 03:06:23
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-30 14:58:01
 */

import { DataStore } from "./data-store";
export class Print {
  constructor() {
    this.debug = DataStore.getInstance().get("debug");
    if (this.debug) {
      console.warn("正在启用调试模式");
    }
  }
  // 工厂方法
  static getInstance() {
    if (!Print.instance) {
      Print.instance = new Print();
    }
    return Print.instance;
  }
  // 统一输出调试信息
  printDebug(params, type) {
    // 如果当前sdk 是调试模式 输入日志
    if (this.debug) {
      console.log(params, type);
    }
    return this;
  }
  // 抛出系统错误
  throwError(params) {
    // 抛出框架错误后期做收集
    throw new Error(params);
  }
}
