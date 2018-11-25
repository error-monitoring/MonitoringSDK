/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-24 19:44:32
 */

import {
    ListenError
} from './lib/ListenError'


import {
    DataStore
} from './lib/DataStore'


// import {
//     getOsInfo,
//     getBrowerInfo
// } from './utils/UserAgent'

import {
    ListenPerformance
} from './lib/ListenPerformance'

import {
    ListenAjax
} from './lib/ListenAjax'

import {
    parseQueryString,
    getUUID
} from './utils/utils'

import {
    setCookie,
    getCookie
} from './utils/Cookie'

import {
    checkBrowser
} from './utils/CheckBrowser'

import {Print} from './lib/Print'





class MonitoringSDK {
    constructor() {
        this.getConfig()
    }



    getConfig() {
        const MonitoringSDK = document.getElementById('MonitoringSDK')
        if (MonitoringSDK) {
            const params = parseQueryString(MonitoringSDK.src)
            this.init(params)

        } else {
            throw new Error('检查 script 标签是否有 id=MonitoringSDK')
        }
    }

    /**
     * 获取配置文件
     * @param app_key app_key 
     * @param debug 是否开启调试
     * @param error_code 需要监听的错误码
     * @param is_server_init 是否需要服务器初始化
     */
    init({
        app_key,
        debug = false,
        error_code = '',
        is_server_init = false
    }) {

        let m_user_id = getCookie('m_user_id')
        if (!m_user_id) {
            m_user_id = getUUID()
            setCookie({
                name: 'm_user_id',
                value: m_user_id
            })

        }
        if (app_key) {
            const browser = new checkBrowser()
            DataStore.getInstance()
                .set('osInfo', browser.getOsInfo())
                .set('browerInfo', browser.getBrowserInfo())
                .set('app_key', app_key)
                .set('debug', debug)
                .set('error_code', error_code)
                .set('is_server_init', is_server_init)
                .set('m_user_id', m_user_id)

            // 初始化错误监听
            const listenError = new ListenError()
            window.listenError = listenError
            // 初始化性能监控
            new ListenPerformance()
            // 初始化接口监控
            new ListenAjax()
        } else {
            throw new Error('请填入你的app_key')
        }
        Print.getInstance().printDebug('MonitoringSDK 初始化完成')

    }

}

window.monitoringSDK = new MonitoringSDK()