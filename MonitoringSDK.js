/*
 * @Author: wenquan.huang
 * @Date: 2018-11-15 13:28:51
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-30 20:01:34
 */

import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.symbol"
// import "@babel/polyfill/lib/core-js/modules/es7.array.includes";
import { ListenError } from "./lib/listen-error";

import { DataStore } from "./lib/data-store";

import { ListenPerformance } from "./lib/listen-performance";

import { ListenAjax } from "./lib/listen-ajax";

import { parseQueryString, getUUID } from "./utils/utils";

import { setCookie, getCookie } from "./utils/cookie";

import { checkBrowser } from "./utils/check-browser";

import { Print } from "./lib/print";



class MonitoringSDK {
  constructor() {
    this.getConfig();
  }

  // 获取sdk配置信息
  getConfig() {
    const MonitoringSDK = document.getElementById("MonitoringSDK");
    if (MonitoringSDK) {
      const params = parseQueryString(MonitoringSDK.src);
      this.init(params);
    } else {
      Print.getInstance().throwError("检查 script 标签是否有 id=MonitoringSDK");
    }
  }

  /**
   * 获取配置文件
   * @param app_key app_key
   * @param debug 是否开启调试
   * @param error_code 需要监听的错误码
   * @param is_server_init 是否需要服务器初始化
   */
  init({ app_key, debug = false, error_code = "", is_server_init = false }) {
    let m_user_id = getCookie("m_user_id");
    if (!m_user_id) {
      m_user_id = getUUID();
      setCookie({
        name: "m_user_id",
        value: m_user_id
      });
    }
    if (app_key) {
      const browser = new checkBrowser();
      // 初始化信息
      DataStore.getInstance()
        .set("osInfo", browser.getOsInfo())
        .set("browerInfo", browser.getBrowserInfo())
        .set("app_key", app_key)
        .set("debug", debug)
        .set("error_code", error_code)
        .set("is_server_init", is_server_init)
        .set("m_user_id", m_user_id);

      Print.getInstance()
        .printDebug(browser.getOsInfo(), "osInfo")
        .printDebug(browser.getBrowserInfo(), "browerInfo");
      // 初始化错误监听
      const listenError = new ListenError();
      //   暴露全局方法给 vue 或者react 用于框架内部捕获
      window.listenError = listenError;
      // 初始化性能监控
      new ListenPerformance();
      // 初始化接口监控
      new ListenAjax();
    } else {
      Print.getInstance().throwError("请填入你的app_key");
    }
  }
}

window.monitoringSDK = new MonitoringSDK();
