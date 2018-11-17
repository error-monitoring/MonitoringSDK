import {base} from '../config/config'

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

    post(url, params = {}){
        
        this.xhr.open('POST', `${base}${url}`, true)
        this.xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
        this.xhr.send(JSON.stringify(params))
    }

}
