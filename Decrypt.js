/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-17 01:55:17 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-23 12:17:06
 */

class Decrypt {
    constructor(params) {
        console.log()
        this.params = params
        
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


    replace(arr) {
 
        let arrObj = arr.map((str) => {
             return JSON.parse(this.decode(str))
        })
        let obj = {}
        // 数组合并
         arrObj.forEach(item => Object.assign(obj, item))
         return obj

    }

    UTF8ToUTF16(str) {
        let res = [],
            len = str.length;
        let i = 0;
        for (let i = 0; i < len; i++) {
            let code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                let code2 = str.charCodeAt(++i);
                let byte1 = (code & 0x1F) << 6;
                let byte2 = code2 & 0x3F;
                let utf16 = byte1 | byte2;
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                let code2 = str.charCodeAt(++i);
                let code3 = str.charCodeAt(++i);
                let byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                let byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                let utf16 = ((byte1 & 0x00FF) << 8) | byte2
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return res.join('');
    }

    decode(str) {
        const table = 'DBCAEFGHIJKLMNOPQRSTUVWXZYdbcaefghijklnmopqrstuvwxyz1324568790+/='
        if (!str) {
            return '';
        }

        let len = str.length;
        let i = 0;
        let res = [];

        while (i < len) {
            let code1 = table.indexOf(str.charAt(i++));
            let code2 = table.indexOf(str.charAt(i++));
            let code3 = table.indexOf(str.charAt(i++));
            let code4 = table.indexOf(str.charAt(i++));

            let c1 = (code1 << 2) | (code2 >> 4);
            let c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            let c3 = ((code3 & 0x3) << 6) | code4;

            res.push(String.fromCharCode(c1));

            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }

        }

        return this.UTF8ToUTF16(res.join(''));
    }
}

module.exports = Decrypt