/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 17:15:09 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 17:26:08
 */


export class ListenError {
    constructor() {
        this.initError();
        this.initPromiseError();
        this.initConsoleError();
    }

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
    initPromiseError() {
        window.addEventListener('unhandledrejection', event => {
            console.log('unhandledrejection:' + event); // 捕获后自定义处理
        });
    }

    initConsoleError() {
        var consoleError = window.console.error;
        window.console.error =  () => {
            console.log('initConsoleError', arguments)
            consoleError && consoleError.apply(window, arguments);
        };
    }

}