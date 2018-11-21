/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 17:15:09 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-21 23:13:17
 * @监听 全局错误 
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
        window.addEventListener('error', (e) => {
            console.log(e,'e')
            
            let {
                message,
                filename,
                lineno,
                colno,
                error
            } = e;
            let errorType = ''
            let errorTypeDetails = ''
            if (error.stack) {
                error = error.stack
                for (let [key, value] of this.getTypeError()) {
                    if (error.includes(key)) {
                        errorType = key
                        errorTypeDetails = value
                    }
                }
            }
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
                error,
                // 错误类型
                errorType,
                // 错误类型详情
                errorTypeDetails
            })
        })
    }
    /**
     * 初始化 promise 错误 监听
     */
    initPromiseError() {
        window.addEventListener('unhandledrejection', event => {
            event.preventDefault()
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
            let errorArray = []
            for (let item of arguments) {
                if (item.stack) {
                    // console.log('==consoleError==', item.stack)
                    for (let [key, value] of self.getTypeError()) {
                        if (item.stack.includes(key)) {
                            console.log(key, value)
                            console.log(item.stack)
                            e
                        }
                    }
                } else {
                    console.log('==consoleError==', item)
                }


            }
            consoleError.apply(window, arguments);
        };
    }

    sendError(errorType, errorData) {
        const k = Encryption.getInstance.getEncryptionData({
            errorType,
            errorData
        })
        Http.getInstance.get(sendEvent, {
            k
        }).then(data => console.log(data))

    }

    getTypeError() {
        return new Map([
            ["ReferenceError", "(引用错误) 对象代表当一个不存在的变量被引用时发生的错误。"],
            ["SyntaxError", "(语法错误) 解析代码时发生的语法错误"],
            ["RangeError", "(范围错误) 超出有效范围"],
            ["TypeError", "(类型错误) 变量或参数不是预期类型，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数"],
            ["URLError", "(URL错误) 与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。"],
            ["EvalError", "(eval错误) eval函数没有被正确执行"],
            ["RangeError", "(范围错误) 超出有效范围"],
        ])
    }

}