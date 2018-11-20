/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-20 19:53:38 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 20:20:09
 */

export class ListenAjax {

  constructor() {
    this.oldXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = this.newXHR;
    this.listenAjaxEvent()

  }

  newXHR() {
    let oldXHR = this.oldXHR
    console.log(oldXHR)
    const realXHR = new oldXHR();

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
      this.ajaxEventTrigger('ajaxReadyStateChange', realXHR)
    }, false);

    return realXHR;

  }

  //  注册事件
  ajaxEventTrigger(event, self) {
    const ajaxEvent = new CustomEvent(event, {
      detail: self
    });
    window.dispatchEvent(ajaxEvent);
  }

  listenAjaxEvent() {
    window.addEventListener('ajaxReadyStateChange', function (e) {
      console.log(e.detail, '1111'); // XMLHttpRequest Object
    });
  }
}