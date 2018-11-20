/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 18:00:12
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
        this.debug = debug
        this.initSDK()
        this.test()
    }
    initSDK() {
        DataStore.getInstance()
        .set('osInfo', getOsInfo())
        .set('browerInfo', getBrowerInfo())
        .set('debug', this.debug)
        new ListenError();
        new Performance()
    }
    test(){
        let old = XMLHttpRequest;
XMLHttpRequest = function() { console.log(arguments); return old.apply(this, arguments); }
    }
}

window.monitoringSDK = new MonitoringSDK()