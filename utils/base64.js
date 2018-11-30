export class Base64 {
  constructor() {
    // 转码表
    this.table =
      "DBCAEFGHIJKLMNOPQRSTUVWXZYdbcaefghijklnmopqrstuvwxyz1324568790+/=";
  }

  UTF16ToUTF8(str) {
    var res = [],
      len = str.length;
    for (var i = 0; i < len; i++) {
      var code = str.charCodeAt(i);
      if (code > 0x0000 && code <= 0x007f) {
        // 单字节，这里并不考虑0x0000，因为它是空字节
        // U+00000000 – U+0000007F 	0xxxxxxx
        res.push(str.charAt(i));
      } else if (code >= 0x0080 && code <= 0x07ff) {
        // 双字节
        // U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
        // 110xxxxx
        var byte1 = 0xc0 | ((code >> 6) & 0x1f);
        // 10xxxxxx
        var byte2 = 0x80 | (code & 0x3f);
        res.push(String.fromCharCode(byte1), String.fromCharCode(byte2));
      } else if (code >= 0x0800 && code <= 0xffff) {
        // 三字节
        // U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
        // 1110xxxx
        var byte1 = 0xe0 | ((code >> 12) & 0x0f);
        // 10xxxxxx
        var byte2 = 0x80 | ((code >> 6) & 0x3f);
        // 10xxxxxx
        var byte3 = 0x80 | (code & 0x3f);
        res.push(
          String.fromCharCode(byte1),
          String.fromCharCode(byte2),
          String.fromCharCode(byte3)
        );
      } else if (code >= 0x00010000 && code <= 0x001fffff) {
        // 四字节
        // U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      } else if (code >= 0x00200000 && code <= 0x03ffffff) {
        // 五字节
        // U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      } /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ else {
        // 六字节
        // U+04000000 – U+7FFFFFFF 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      }
    }

    return res.join("");
  }
  UTF8ToUTF16(str) {
    var res = [],
      len = str.length;
    var i = 0;
    for (var i = 0; i < len; i++) {
      var code = str.charCodeAt(i);
      // 对第一个字节进行判断
      if (((code >> 7) & 0xff) == 0x0) {
        // 单字节
        // 0xxxxxxx
        res.push(str.charAt(i));
      } else if (((code >> 5) & 0xff) == 0x6) {
        // 双字节
        // 110xxxxx 10xxxxxx
        var code2 = str.charCodeAt(++i);
        var byte1 = (code & 0x1f) << 6;
        var byte2 = code2 & 0x3f;
        var utf16 = byte1 | byte2;
        res.push(String.fromCharCode(utf16));
      } else if (((code >> 4) & 0xff) == 0xe) {
        // 三字节
        // 1110xxxx 10xxxxxx 10xxxxxx
        var code2 = str.charCodeAt(++i);
        var code3 = str.charCodeAt(++i);
        var byte1 = (code << 4) | ((code2 >> 2) & 0x0f);
        var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3f);
        var utf16 = ((byte1 & 0x00ff) << 8) | byte2;
        res.push(String.fromCharCode(utf16));
      } else if (((code >> 3) & 0xff) == 0x1e) {
        // 四字节
        // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      } else if (((code >> 2) & 0xff) == 0x3e) {
        // 五字节
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      } /** if (((code >> 1) & 0xFF) == 0x7E)*/ else {
        // 六字节
        // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
      }
    }

    return res.join("");
  }
  encode(str) {
    if (!str) {
      return "";
    }
    var utf8 = this.UTF16ToUTF8(str); // 转成UTF8
    var i = 0; // 遍历索引
    var len = utf8.length;
    var res = [];
    while (i < len) {
      var c1 = utf8.charCodeAt(i++) & 0xff;
      res.push(this.table[c1 >> 2]);
      // 需要补2个=
      if (i == len) {
        res.push(this.table[(c1 & 0x3) << 4]);
        res.push("==");
        break;
      }
      var c2 = utf8.charCodeAt(i++);
      // 需要补1个=
      if (i == len) {
        res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0f)]);
        res.push(this.table[(c2 & 0x0f) << 2]);
        res.push("=");
        break;
      }
      var c3 = utf8.charCodeAt(i++);
      res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0f)]);
      res.push(this.table[((c2 & 0x0f) << 2) | ((c3 & 0xc0) >> 6)]);
      res.push(this.table[c3 & 0x3f]);
    }

    return res.join("");
  }
  decode(str) {
    if (!str) {
      return "";
    }

    var len = str.length;
    var i = 0;
    var res = [];

    while (i < len) {
      let code1 = this.table.indexOf(str.charAt(i++));
      let code2 = this.table.indexOf(str.charAt(i++));
      let code3 = this.table.indexOf(str.charAt(i++));
      let code4 = this.table.indexOf(str.charAt(i++));

      let c1 = (code1 << 2) | (code2 >> 4);
      let c2 = ((code2 & 0xf) << 4) | (code3 >> 2);
      let c3 = ((code3 & 0x3) << 6) | code4;

      res.push(String.fromCharCode(c1));

      if (code3 != 64) {
        res.push(String.fromCharCode(c2));
      }
      if (code4 != 64) {
        res.push(String.fromCharCode(c3));
      }
    }

    return this.UTF8ToUTF16(res.join(""));
  }
}
