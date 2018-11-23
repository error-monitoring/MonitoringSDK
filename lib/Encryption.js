/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 19:10:23 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-23 11:19:55
 * @ 加密函数 提供对象加密
 */

import {
    DataStore
} from './DataStore'
import {
    Base64
} from '../utils/Base64'


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
     * @param {*} index 索引
     * @returns 返回替换的字符串
     */
    _Replace_keyStr(index) {
        // const _Replace_keyStr = ["1000100", "1000010", "1000011", "1000001", "1000101", "1000110", "1000111", "1001000", "1001001", "1001010", "1001011", "1001100", "1001101", "1001110", "1001111", "1010000", "1010001", "1010010", "1010011", "1010100", "1010101", "1010110", "1010111", "1011000", "1011001", "1011010", "1100001", "1100010", "1100011", "1100100", "1100101", "1100110", "1100111", "1101000", "1101001", "1101010", "1101011", "1101100", "1101101", "1101110", "1101111", "1110000", "1110001", "1110010", "1110011", "1110100", "1110101", "1110110", "1110111", "1111000", "1111001", "1111010", "110000", "110001", "110010", "110011", "110100", "110101", "110110", "110111", "111000", "111001", "101011", "101111", "111101"]
        // const value = parseInt(_Replace_keyStr[index], 2)
        // let a = this.getStr(value)
        let a = 'DBCAEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        let b = a[index]
        return b
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
            return
        }

        let encryptionArray = []

        // 提前初始化Base64 
        const b = new Base64(this.keyCodeToString(this._keyCode));

        encryptionArray.push(this.encryption(b, obj))
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
        let str = JSON.stringify(params)
        str = b.encode(str);

        for (let index in this._keyCode) {
            let item = this.getStr(this._keyCode[index])
            if (item != '/' && item != '+') {
                str = str.replace(new RegExp(item, "g"), this._Replace_keyStr(index))
            }
        }
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