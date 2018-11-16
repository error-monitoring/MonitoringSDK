/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 17:08:26
 */

 class MonitoringSDK{
     constructor(){
        window.addEventListener('error', (e) => {
            // console.log(e, 'error')
            console.log("错误信息：" , e.message);
            console.log("出错文件：" , e.filename);
            console.log("出错行号：" , e.lineno);
            console.log("出错列号：" , e.colno);
            console.log("错误详情：" , e.error);
        })

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