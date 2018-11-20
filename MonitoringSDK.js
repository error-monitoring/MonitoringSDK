/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 20:14:46
 */

import {
    ListenError
} from './lib/ListenError'

import {
    DataStore
} from './lib/DataStore'
import {
    getOsInfo,
    getBrowerInfo
} from './utils/UserAgent'

import {ListenPerformance} from './lib/ListenPerformance'

import {ListenAjax} from './lib/ListenAjax'



class MonitoringSDK {
    constructor({
        debug = true,
    } ={}) {
        this.debug = debug
        this.initSDK()
    }
    initSDK() {
        DataStore.getInstance()
        .set('osInfo', getOsInfo())
        .set('browerInfo', getBrowerInfo())
        .set('debug', this.debug)
        new ListenError();
        new ListenPerformance()
        new ListenAjax()
    }

}

window.monitoringSDK = new MonitoringSDK()