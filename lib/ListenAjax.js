/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-20 19:53:38 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 21:42:28
 */

const oldXHR = window.XMLHttpRequest;


export class ListenAjax {

  constructor() {
    window.XMLHttpRequest = this.newXHR;
    this.listenAjaxEvent()

  }

  newXHR() {
    const realXHR = new oldXHR();
    // realXHR.addEventListener('abort', function () {
    //   const ajaxEvent = new CustomEvent('ajaxAbort', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);

    // realXHR.addEventListener('load', function () {
    //   const ajaxEvent = new CustomEvent('ajaxLoad', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);

    // realXHR.addEventListener('loadstart', function () {
    //   const ajaxEvent = new CustomEvent('ajaxLoadStart', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);

    // realXHR.addEventListener('progress', function () {
    //   const ajaxEvent = new CustomEvent('ajaxProgress', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);

    // realXHR.addEventListener('timeout', function () {
    //   const ajaxEvent = new CustomEvent('ajaxTimeout', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);

    // realXHR.addEventListener('loadend', function () {
    //   const ajaxEvent = new CustomEvent('ajaxLoadEnd', {
    //     detail: realXHR
    //   });
    //   window.dispatchEvent(ajaxEvent);
    // }, false);
    realXHR.addEventListener('readystatechange', function () {
      const ajaxEvent = new CustomEvent('ajaxReadyStateChange', {
        detail: realXHR
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    realXHR.addEventListener('error', function () {
      const ajaxEvent = new CustomEvent('ajaxError', {
        detail: realXHR
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    return realXHR;

  }

  listenAjaxEvent() {

    window.addEventListener('ajaxReadyStateChange', function (e) {
      console.log(e.detail, 'ajaxReadyStateChange'); // XMLHttpRequest Object
      // const {readyState, response, responseURL, status,}
    });

    window.addEventListener('ajaxError', function (e) {
      console.log(e.detail, 'ajaxError'); // XMLHttpRequest Object
    });




  }
}