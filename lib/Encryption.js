/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-16 19:10:23 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-21 22:17:39
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
        const _Replace_keyStr = ["10000010000", "10000010001", "10000010010", "10000010011", "10000010100", "10000010101", "10000000001", "10000010110", "10000010111", "10000011000", "10000011001", "10000011010", "10000011011", "10000011100", "10000011101", "10000011110", "10000011111", "10000100000", "10000100001", "10000100010", "10000100011", "10000100100", "10000100101", "10000100110", "10000100111", "10000101000", "10000110000", "10000110001", "10000110010", "10000110011", "10000110100", "10000110101", "10001010001", "10000110110", "10000110111", "10000111000", "10000111001", "10000111010", "10000111011", "10000111100", "10000111101", "10000111110", "10000111111", "10001000000", "10001000011", "10001000100", "10001000101", "10001000110", "10001000111", "10001001000", "10001001001", "10001001010", "11101000", "100101011", "11101101", "111010000", "11101100", "101101011", "11111010", "111010100", "11111001", "111010110", "111011000", "111011010", "111011100"]
        const value = parseInt(_Replace_keyStr[index], 2)
        return this.getStr(value)
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