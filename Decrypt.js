/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-17 01:55:17 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-23 11:18:35
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

    // 对乱码进行替换
    replace(arr) {
        // 解密字符串
        let _Replace_keyStr = 'DBCAEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        const _Original_KeyStr =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        
        let arrObj = arr.map((str) => {
            // 替换为正常符号
            for (let index in _Replace_keyStr) {
                if (_Replace_keyStr[index] != '/' && _Replace_keyStr[index] != '+') {
                    str = str.replace(new RegExp(_Replace_keyStr[index], "g"), _Original_KeyStr[index])
                }

            }
            try {
                // 对符号进行解码

                return JSON.parse(this.decode(str))
            } catch (error) {
                return {}
            }
        })
        let obj = {}
        // 数组合并
         arrObj.forEach(item => Object.assign(obj, item))
         return obj

    }

    UTF8ToUTF16(str) {
        var res = [],
            len = str.length;
        var i = 0;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var byte1 = (code & 0x1F) << 6;
                var byte2 = code2 & 0x3F;
                var utf16 = byte1 | byte2;
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var code3 = str.charCodeAt(++i);
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                var utf16 = ((byte1 & 0x00FF) << 8) | byte2
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
        const table = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/','='
        ]
        if (!str) {
            return '';
        }

        var len = str.length;
        var i = 0;
        var res = [];

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