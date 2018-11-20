/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 18:03:00
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
        let old = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            console.log(arguments)
            return old.apply(window, arguments); 
        }
    }
}

window.monitoringSDK = new MonitoringSDK()