/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-20 19:53:38 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 20:49:09
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
    //   ajaxEventTrigger.call(this, 'ajaxAbort');
    // }, false);

    realXHR.addEventListener('error', function () {
      const ajaxEvent = new CustomEvent('ajaxError', {
        detail: realXHR
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    // realXHR.addEventListener('load', function () {
    //   ajaxEventTrigger.call(this, 'ajaxLoad');
    // }, false);

    // realXHR.addEventListener('loadstart', function () {
    //   ajaxEventTrigger.call(this, 'ajaxLoadStart');
    // }, false);

    // realXHR.addEventListener('progress', function () {
    //   ajaxEventTrigger.call(this, 'ajaxProgress');
    // }, false);

    // realXHR.addEventListener('timeout', function () {
    //   ajaxEventTrigger.call(this, 'ajaxTimeout');
    // }, false);

    // realXHR.addEventListener('loadend', function () {
    //   ajaxEventTrigger.call(this, 'ajaxLoadEnd');
    // }, false);
    realXHR.addEventListener('readystatechange', () => {
      const ajaxEvent = new CustomEvent('ajaxReadyStateChange', {
        detail: realXHR
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    return realXHR;

  }

  listenAjaxEvent() {
    window.addEventListener('ajaxReadyStateChange', function (e) {
      console.log(e, 'ajaxReadyStateChange'); // XMLHttpRequest Object
    });

    window.addEventListener('ajaxError', function (e) {
      console.log(e, 'ajaxError'); // XMLHttpRequest Object
    });

    
  }
}