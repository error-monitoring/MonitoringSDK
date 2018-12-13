/*
 * @Author: wenquan.huang
 * @Date: 2018-11-16 17:15:09
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-13 11:54:02
 * @监听 全局错误
 */

import { Http } from "./http";

import { Print } from "./print";

export class ListenError {
  constructor() {
    this.initError();
    this.initPromiseError();
    this.initConsoleError();
  }

  /**
   * 初始化全局错误监听
   */
  initError() {
    window.addEventListener("error", e => {
      console.log(e, "e");

      let { message, filename, lineno, colno, error } = e;
      // 错误的堆栈
      let stack_info = "";
      // 是否有堆栈信息
      let is_stack = false;
      if (error.stack) {
        stack_info = error.stack;
        is_stack = true;
      } else {
        stack_info = error;
      }
      this.sendError("listen", [
        {
          // 错误信息
          message,
          // 出错文件
          filename,
          // 出错行号
          line:lineno,
          // 出错列号
          column:colno,
          // 错误堆栈
          stack_info,
          // 是否有堆栈信息
          is_stack
        }
      ]);
    });
  }
  /**
   * 初始化 promise 错误 监听
   */
  initPromiseError() {
    window.addEventListener("unhandledrejection", event => {
      event.preventDefault();
      // this.sendError('promise',{
      //     error:event.reason
      // })
    });
  }

  /**
   * 劫持console.error 错误
   */
  initConsoleError() {
    let consoleError = window.console.error;
    const self = this;
    window.console.error = function() {
      let errorArray = [];
      Array.prototype.slice.apply(arguments).forEach(item => {
        if (item.stack) {
          errorArray.push({
            stack_info: item.stack,
            is_stack: true
          });
        } else {
          errorArray.push({
            stack_info: item,
            is_stack: false
          });
        }
      });
      self.sendError("print", errorArray);
      consoleError.apply(window, arguments);
    };
  }

  errorVueHandler(err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    Print.getInstance().printDebug(vm, "vue_error_vm");
    let params = [];

    if (err.stack) {
      params.push({
        stack_info: err.stack,
        is_stack: true
      });
    } else {
      params.push({
        stack_info: err,
        is_stack: false
      });
    }
    params.vueInfo = info;

    listenError.sendError("vue_handler", params);
  }

  sendError(error_type, error_data) {
    Print.getInstance().printDebug(error_data, error_type);
    Http.getInstance().sendData({
      api: "/api/monitoring/listrn-error/create",
      params: {
        error_type,
        error_data
      }
    });
  }
}
