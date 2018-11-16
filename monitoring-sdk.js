/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 17:27:30
 */

import {
    ListenError
} from './lib/ListenError'

class MonitoringSDK {
    constructor() {
        this.init()
    }
    init() {
        new ListenError()
    }
}

window.monitoringSDK = new MonitoringSDK()