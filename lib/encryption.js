/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 19:10:23 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-27 10:37:53
 * @ 加密函数 提供对象加密
 */

import {
    DataStore
} from './data-store'
import {
    Base64
} from '../utils/base64'


export class Encryption {
    // 工厂方法
    static get getInstance() {
        if (!Encryption.instance) {
            Encryption.instance = new Encryption();
        }
        return Encryption.instance;
    }

    // 获取原始字符串
    get _keyCode() {
        return this._getKeyCode()
    }
 

    /**
     * 
     * @param {Object} obj 需要加密的对象
     * @param {Boolean} isInfo 是否返回用户信息 默认返回
     * @returns 返回加密后的数据
     */
    getEncryptionData(obj, isInfo = true) {
        console.time('time')
        if(typeof obj !== 'object'){
            throw new Error('obj type Object')
        }

        let encryptionArray = []

        // 提前初始化Base64 
        const b = new Base64(this.keyCodeToString(this._keyCode));
        const app_key = DataStore.getInstance().get('app_key')
        const m_user_id = DataStore.getInstance().get('m_user_id')
        const userInfo = {
            app_key,
            m_user_id
        }

        encryptionArray.push(this.encryption(b, obj))
        encryptionArray.push(this.encryption(b, {userInfo}))
        if (isInfo) {
            let osInfoEncryption = DataStore.getInstance().get('osInfoEncryption')
            let browerInfoEncryption = DataStore.getInstance().get('browerInfoEncryption')
            // 缓存加密后数据提高性能
            if (osInfoEncryption && browerInfoEncryption) {
                encryptionArray = [...encryptionArray, osInfoEncryption, browerInfoEncryption]
            } else {
                const osInfo = DataStore.getInstance().get('osInfo')
                const browerInfo = DataStore.getInstance().get('browerInfo')

                osInfoEncryption = this.encryption(b, {osInfo})
                browerInfoEncryption = this.encryption(b, {browerInfo})

                encryptionArray = [...encryptionArray, osInfoEncryption, browerInfoEncryption]

                DataStore.getInstance().set('osInfoEncryption', osInfoEncryption).set('browerInfoEncryption', browerInfoEncryption)
            }
        }

        console.timeEnd('time')
        return encryptionArray.join('.')
    }

    // 加密数据
    encryption(b, params) {
        let str = ''
        try {
            str = JSON.stringify(params)
        } catch (error) {
            
        }

        str = b.encode(str);
        return str
    }

    // 获取真实字符
    getStr(code) {
        return String.fromCharCode(code)
    }

    // 获取原始字符串
    _getKeyCode() {
        return [...this.generateBig(), ...this.generateSmall(), ...this.generateNumber(), ...[43, 47, 61]] // +/=

    }

    // 根据codes转字符串
    keyCodeToString(codes) {
        let str = ''
        codes.forEach(item => str += this.getStr(item))
        return str
    }

    // 获取小写写字母
    generateSmall() {
        let ch_small = 'a';
        let str_small = '';
        for (let i = 0; i < 26; i++) {
            str_small += this.getStr(ch_small.charCodeAt(0) + i);
        }
        return this.toUnicode(str_small);
    }

    // 获取大写字母
    generateBig() {
        let ch_big = 'A';
        let str_big = '';
        for (let i = 0; i < 26; i++) {
            str_big += this.getStr(ch_big.charCodeAt(0) + i);
        }
        return this.toUnicode(str_big);
    }
    // 获取数字
    generateNumber() {
        let ch_big = '0';
        let str_number = '';
        for (let i = 0; i < 10; i++) {
            str_number += this.getStr(ch_big.charCodeAt(0) + i);
        }
        return this.toUnicode(str_number);
    }

    //将字符串转换成Unicode码
    toUnicode(str) {
        let codes = [];
        for (let i = 0; i < str.length; i++) {
            codes.push(str.charCodeAt(i));
        }
        return codes;
    }


}