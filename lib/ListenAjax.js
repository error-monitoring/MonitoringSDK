/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-20 19:53:38 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 20:35:44
 */

const oldXHR = window.XMLHttpRequest;


export class ListenAjax {

  constructor() {
    window.XMLHttpRequest = this.newXHR;
    this.listenAjaxEvent()

  }

  newXHR() {
    const realXHR = new oldXHR();
    console.log(realXHR, 'realXHR')
    const self = this

    // realXHR.addEventListener('abort', function () {
    //   ajaxEventTrigger.call(this, 'ajaxAbort');
    // }, false);

    // realXHR.addEventListener('error', function () {
    //   ajaxEventTrigger.call(this, 'ajaxError');
    // }, false);

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
        detail: self
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    return realXHR;

  }

  //  注册事件
  ajaxEventTrigger(event, self) {
    
  }

  listenAjaxEvent() {
    window.addEventListener('ajaxReadyStateChange', function (e) {
      console.log(e.detail, '1111'); // XMLHttpRequest Object
    });
  }
}