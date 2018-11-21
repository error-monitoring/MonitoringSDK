/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-20 19:53:38 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-21 17:33:29
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

    let openMethods, openUrl
    let open = realXHR.open
    realXHR.open = function () {
      [openMethods, openUrl] = arguments
      open.apply(realXHR, arguments)

    }

    // let send = realXHR.send
    // realXHR.send = function () {
    //   console.log(arguments, 'send')
    //   send.call(realXHR, arguments)
    // }


    realXHR.addEventListener('readystatechange', function () {

      const ajaxEvent = new CustomEvent('ajaxReadyStateChange', {
        detail: realXHR
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    
    realXHR.addEventListener('error', function () {
      const ajaxEvent = new CustomEvent('ajaxError', {
        detail: {
          openMethods,
          openUrl
        },
      });
      window.dispatchEvent(ajaxEvent);
    }, false);

    return realXHR;

  }


  listenAjaxEvent() {
    window.addEventListener('ajaxReadyStateChange', function (e) {
      const {
        readyState,
        response,
        responseURL,
        statusText,
        status,
      } = e.detail
      
      if (readyState == 4) {
        if (status < 200 || status > 300 ) {
          console.log(
            readyState,
            response,
            responseURL,
            statusText,
            status, )
        }else{
          // console.log(response)
        }
      }
    });

    window.addEventListener('ajaxError', function (e) {
      const {openMethods, openUrl} = e.detail
      console.log(openMethods, openUrl,'ajaxError'); // XMLHttpRequest Object
    });
  }


}