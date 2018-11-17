/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-17 01:55:17 
 * @Last Modified by:   wq599263163@163.com 
 * @Last Modified time: 2018-11-17 01:55:17 
 */

class Decrypt {
    constructor(params) {
        this.params = params
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        if (typeof this.params === 'string') {
            let arr = this.replace(this.split());
            this.data = arr

        }

    }

    // 以.切割
    split() {
        try {
            return this.params.split('.')
        } catch (error) {
            return []
        }

    }

    // 对乱码进行替换
    replace(arr) {
        let _keyStr = this._keyStr
        let _Replace_keyStr = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШабвгдеёжзийклмнопруфхцчшщъèīíǐìūúǔùǖǘǚǜ'

        let arrObj = arr.map((str) => {
            // 替换为正常符号
            for (let index in _Replace_keyStr) {
                if (_Replace_keyStr[index] != '/' && _Replace_keyStr[index] != '+') {
                    str = str.replace(new RegExp(_Replace_keyStr[index], "g"), _keyStr[index])
                }

            }
            let jsonItem = {}
            try {
                // 对符号进行解码
                jsonItem = JSON.parse(this.decode(str))
            } catch (error) {

            }
            return jsonItem
        })
        let obj = {}
        // 数组合并
        arrObj.forEach(item => Object.assign(obj, item))
        return obj
    }
    decode(input = '') {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = this._utf8_decode(output);

        return output;

    }

    _utf8_decode(utftext = '') {
        let string = "";
        let i = 0;
        let c = 0
        let c1 = 0;
        let c2 = 0;
        let c3 = '';

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}

module.exports = Decrypt