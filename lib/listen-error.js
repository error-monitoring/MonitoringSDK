/*
 * @Author: wenquan.huang
 * @Date: 2018-11-16 17:15:09
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-01 09:15:53
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
          lineno,
          // 出错列号
          colno,
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
    Print.getInstance().printDebug(vm, "errorVueHandler");
    let params = [];
    let { message, filename, lineno, colno, error } = err;
    console.log(message, filename, lineno, colno, error, "11111");

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

    listenError.sendError("vue_frame", params);
  }

  sendError(error_type, error_data) {
    Print.getInstance().printDebug(error_data, "error_data");
    Http.getInstance().sendData({
      api: "/api/monitoring/listrn-error/create",
      params: {
        error_type,
        error_data
      }
    });
  }

  getTypeError() {
    return {
      ReferenceError:
        "(引用错误) 对象代表当一个不存在的变量被引用时发生的错误。",
      SyntaxError: "(引用错误) 对象代表当一个不存在的变量被引用时发生的错误。",
      TypeError:
        "(类型错误) 变量或参数不是预期类型，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数",
      URLError:
        "(URL错误) 与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。",
      EvalError: "(eval错误) eval函数没有被正确执行",
      RangeError: "(范围错误) 超出有效范围"
    };
  }
}
