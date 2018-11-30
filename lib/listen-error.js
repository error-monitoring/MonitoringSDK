/*
 * @Author: wenquan.huang
 * @Date: 2018-11-16 17:15:09
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-01 00:40:14
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
      let errorType = "";
      let errorTypeDetails = "";
      // 错误的堆栈
      let stackInfo = "";
      // 是否有堆栈信息
      let isStack = false;
      if (error.stack) {
        stackInfo = error.stack;
        isStack = true;
        for (let [key, value] of this.getTypeError()) {
          if (stackInfo.includes(key)) {
            errorType = key;
            errorTypeDetails = value;
          }
        }
      } else {
        stackInfo = error;
      }
      this.sendError("listen", {
        // 错误信息
        message,
        // 出错文件
        filename,
        // 出错行号
        lineno,
        // 出错列号
        colno,
        // 错误堆栈
        stackInfo,
        // 是否有堆栈信息
        isStack,
        // 错误类型
        errorType,
        // 错误类型详情
        errorTypeDetails
      });
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
      // for (let item of arguments) {
      //   if (item.stack) {
      //     errorArray.push({
      //       stackInfo: item.stack,
      //       isStack: true
      //     });
      //   } else {
      //     errorArray.push({
      //       stackInfo: item,
      //       isStack: false
      //     });
      //   }
      // }
      arguments.forEach(item => {
        console.log(item,'item')
      });
      // self.sendError("print", errorArray);
      consoleError.apply(window, arguments);
    };
  }

  errorVueHandler(err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    Print.getInstance().printDebug(vm, "errorVueHandler");
    let params = {};

    if (err.stack) {
      // 是否有错误详情
      let ifIncludes = false;
      for (let [key, value] of listenError.getTypeError()) {
        if (err.stack.includes(key)) {
          ifIncludes = true;
          params = {
            errorType: key,
            // 错误类型详情
            errorTypeDetails: value,
            stackInfo: err.stack,
            isStack: true
          };
        }
      }
      if (!ifIncludes) {
        params = {
          errorType: "",
          // 错误类型详情
          errorTypeDetails: "",
          stackInfo: err.stack,
          isStack: true
        };
      }
    } else {
      params = {
        errorType: "",
        // 错误类型详情
        errorTypeDetails: "",
        stackInfo: err,
        isStack: false
      };
    }
    params.vueInfo = info;

    listenError.sendError("vueFrame", params);
  }

  sendError(errorType, errorData) {
    Print.getInstance().printDebug(errorData, "errorData");
    Http.getInstance().sendData({
      api: "/api/monitoring/listrn-error/create",
      params: {
        errorType,
        errorData
      }
    });
  }

  getTypeError() {
    // return new Map([
    //   [
    //     "ReferenceError",
    //     "(引用错误) 对象代表当一个不存在的变量被引用时发生的错误。"
    //   ],
    //   ["SyntaxError", "(语法错误) 解析代码时发生的语法错误"],
    //   ["RangeError", "(范围错误) 超出有效范围"],
    //   [
    //     "TypeError",
    //     "(类型错误) 变量或参数不是预期类型，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数"
    //   ],
    //   [
    //     "URLError",
    //     "(URL错误) 与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。"
    //   ],
    //   ["EvalError", "(eval错误) eval函数没有被正确执行"],
    //   ["RangeError", "(范围错误) 超出有效范围"]
    // ]);
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
