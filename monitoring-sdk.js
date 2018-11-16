/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-15 13:28:51 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-16 17:10:30
 */

 class MonitoringSDK{
     constructor(){
        window.addEventListener('error', ({message, filename, lineno, colno, error}) => {
            console.log("错误信息：" , message);
            console.log("出错文件：" , filename);
            console.log("出错行号：" , lineno);
            console.log("出错列号：" , colno);
            console.log("错误详情：" , error);
        })
     }
     init(){
         
     }
 }

 window.monitoringSDK = new MonitoringSDK()