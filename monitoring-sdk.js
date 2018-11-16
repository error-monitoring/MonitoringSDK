/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 14:47:10
 */

 class MonitoringSDK{
     constructor(){
        // window.addEventListener('error', (e) => {
        //     console.log(e, 'error')
        // })

        // window.onerror = (e) => {
        //     console.log(e,'onerror')
        // }
        window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
            console.log("错误信息：" , errorMessage);
            console.log("出错文件：" , scriptURI);
            console.log("出错行号：" , lineNumber);
            console.log("出错列号：" , columnNumber);
            console.log("错误详情：" , errorObj);
         }
     }
     init(){
         
     }
 }

 window.monitoringSDK = new MonitoringSDK()