import {
    base
} from '../config/config'

import {
    Encryption
} from './Encryption'
import { Print } from './Print';

export class Http {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // 工厂方法
    static getInstance() {
        if (!Http.instance) {
            Http.instance = new Http();
        }
        return Http.instance;
    }

    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            this.xhr.open('POST', `${base}${url}`, true)
            this.xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            this.xhr.send(JSON.stringify(params))
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState == 4 && this.xhr.status == 200) {
                    try {
                        resolve(JSON.parse(this.xhr.response))
                    } catch (error) {
                        resolve(this.xhr.response)
                    }
                } else {
                    if (this.xhr.status > 300 || this.xhr.status < 200) {
                        reject(this.xhr)
                    }
                }
            }

        })


    }

    get(url, params = {}) {
        let array = []
        Object.keys(params).forEach(item => {
            array.push(`${item}=${params[item]}`)
        })
        return new Promise((resolve, reject) => {
            this.xhr.open('GET', `${base}${url}?${array.join('&')}`, true)
            this.xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            this.xhr.send(JSON.stringify(params))
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState == 4 && this.xhr.status == 200) {
                    try {
                        resolve(JSON.parse(this.xhr.response))
                    } catch (error) {
                        resolve(this.xhr.response)
                    }
                } else {
                    if (this.xhr.status > 300 || this.xhr.status < 200) {
                        reject(this.xhr)
                    }
                }
            }

        })


    }

    image(url, params = {}) {
        let array = []
        Object.keys(params).forEach(item => {
            array.push(`${item}=${params[item]}`)
        })
        const image = new Image()
        image.src = `${base}${url}?${array.join('&')}`
    }

    /**
     * 统一发送数据入口
     * @param {String} api 发送的地址
     * @param {Object} params 发送的数据
     * @param {Boolean} sendInfo [是否携带用户浏览器信息 默认携带]
     * @param {String} requestType [请求的类型] ['image', 'get', 'post']
     */
    sendData({
        api,
        params = {},
        sendInfo = true,
        requestType = 'post'
    }) {
        Print.getInstance().printDebug(sendInfo,'sendInfo')
        const info = Encryption.getInstance.getEncryptionData(params, sendInfo)
        const types = ['image', 'get', 'post']
        // 如果有指定requestType 类型就用指定的发送
        if (requestType && types.find((item) => item == requestType)) {
            this[requestType](api, {
                info,
                sendInfo
            })
        } else {
            // 如果没有指定类型 判断长度 大于2000 就用post 发送
            if (info.length > 2000) {
                this.post(api, {
                    info,
                    sendInfo
                })
            } else {
                this.image(api, {
                    info,
                    sendInfo
                })
            }

        }


    }

}