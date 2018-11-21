import {
    base
} from '../config/config'

export class Http {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // 工厂方法
    static get getInstance() {
        if (!Http.instance) {
            Http.instance = new Http();
        }
        return Http.instance;
    }

    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            this.xhr.open('POST', `${base}${url}`, false)
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

}