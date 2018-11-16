/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 17:15:09 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 18:45:01
 */


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
        window.addEventListener('error', ({
            message,
            filename,
            lineno,
            colno,
            error
        }) => {
            console.log("错误信息：", message);
            console.log("出错文件：", filename);
            console.log("出错行号：", lineno);
            console.log("出错列号：", colno);
            console.log("错误详情：", error);
        })
    }

    /**
     * 初始化 promise 错误 监听
     */
    initPromiseError() {
        window.addEventListener('unhandledrejection', event => {
            console.log('unhandledrejection:' + event.reason); // 捕获后自定义处理
        });
    }

    /**
     * 劫持console.error 错误
     */
    initConsoleError() {
        let consoleError = window.console.error;
        const self = this;
        window.console.error = function() {
            console.log('initConsoleError', arguments)
            consoleError.apply(window, arguments);
        };
    }

}