/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 17:15:09 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-17 12:21:35
 */

import {
    Encryption
} from './Encryption'
import {
    Http
} from './Http'
import {
    sendEvent
} from '../config/config'

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
            this.sendError('error', {
                // 错误信息
                message,
                // 出错文件
                filename,
                // 出错行号
                lineno,
                // 出错列号
                colno,
                // 错误详情
                error
            })
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
        window.console.error = function () {
            console.log('initConsoleError', arguments)
            consoleError.apply(window, arguments);
        };
    }

    sendError(errorType, errorData) {
        const k = Encryption.getInstance.getEncryptionData({
            errorType,
            errorData
        })
        Http.getInstance.post(sendEvent, {
            k
        })

    }

}