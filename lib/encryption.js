/*
 * @Author: wenquan.huang
 * @Date: 2018-11-16 19:10:23
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-01 08:45:18
 * @ 加密函数 提供对象加密
 */

import { DataStore } from "./data-store";
import { Base64 } from "../utils/base64";

export class Encryption {
  // 工厂方法
  static get getInstance() {
    if (!Encryption.instance) {
      Encryption.instance = new Encryption();
    }
    return Encryption.instance;
  }



  /**
   *
   * @param {Object} obj 需要加密的对象
   * @param {Boolean} isInfo 是否返回用户信息 默认返回
   * @returns 返回加密后的数据
   */
  getEncryptionData(obj, isInfo = true) {
    console.time("time");
    // if (typeof obj !== "object") {
    //   // throw new Error("obj type Object");
    // }

    let encryptionArray = [];

    // 提前初始化Base64
    const b = new Base64();
    const app_key = DataStore.getInstance().get("app_key");
    const m_user_id = DataStore.getInstance().get("m_user_id");
    const user_info = {
      app_key,
      m_user_id
    };

    encryptionArray.push(this.encryption(b, obj));
    encryptionArray.push(this.encryption(b, { user_info }));
    if (isInfo) {
      let osInfoEncryption = DataStore.getInstance().get("osInfoEncryption");
      let browerInfoEncryption = DataStore.getInstance().get(
        "browerInfoEncryption"
      );
      // 缓存加密后数据提高性能
      if (osInfoEncryption && browerInfoEncryption) {

        encryptionArray.push(osInfoEncryption)
        encryptionArray.push(browerInfoEncryption)
          
      } else {
        const osInfo = DataStore.getInstance().get("os_info");
        const browerInfo = DataStore.getInstance().get("brower_info");

        osInfoEncryption = this.encryption(b, { os_info });
        browerInfoEncryption = this.encryption(b, { brower_info });

        encryptionArray.push(osInfoEncryption)
        encryptionArray.push(browerInfoEncryption)

        DataStore.getInstance()
          .set("osInfoEncryption", osInfoEncryption)
          .set("browerInfoEncryption", browerInfoEncryption);
      }
    }

    console.timeEnd("time");
    return encryptionArray.join(".");
  }

  // 加密数据
  encryption(b, params) {
    let str = "";
    try {
      str = JSON.stringify(params);
    } catch (error) {}

    str = b.encode(str);
    return str;
  }

}
