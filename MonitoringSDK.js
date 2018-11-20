/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 14:15:33
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

import {Performance} from './lib/Performance'



class MonitoringSDK {
    constructor({
        debug = true,
    } ={}) {
        console.log(11)
        this.debug = debug
        this.initSDK()
    }
    initSDK() {
        DataStore.getInstance()
        .set('osInfo', getOsInfo())
        .set('browerInfo', getBrowerInfo())
        .set('debug', this.debug)
        new ListenError();
        new Performance()
    }
}

window.monitoringSDK = new MonitoringSDK()