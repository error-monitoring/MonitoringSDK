/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-19 22:09:17 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-19 23:29:21
 */

export class Performance {
    constructor() {
        function () test {

            handleAddListener('load', getTiming)

            function handleAddListener(type, fn) {
                if (window.addEventListener) {
                    window.addEventListener(type, fn)
                } else {
                    window.attachEvent('on' + type, fn)
                }
            }

            function getTiming() {
                try {
                    var time = performance.timing;
                    var timingObj = {};

                    var loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;

                    if (loadTime < 0) {
                        setTimeout(function () {
                            getTiming();
                        }, 200);
                        return;
                    }

                    timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000;
                    timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart) / 1000;
                    timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000;
                    timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart) / 1000;
                    timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart) / 1000;
                    timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading) / 1000;
                    timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading) / 1000;
                    timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;
                    timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart) / 1000;
                    timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);

                    for (item in timingObj) {
                        console.log(item + ":" + timingObj[item] + '毫秒(ms)');
                    }

                    console.log(performance.timing);

                } catch (e) {
                    console.log(timingObj)
                    // console.log(performance.timing);

                }
            }



            var result = [];
            // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
            window.performance.getEntries().forEach(function (perf) {
                result.push({
                    '资源名称': perf.name,
                    '资源类型': perf.entryType,
                    '谁发起的请': perf.initiatorType,
                    '加载时间': perf.duration
                });
            });
            // let aaa = performance.getEntriesByType('resource')
            // console.log(aaa)

            // 控制台输出统计结果
            console.table(result);

        };
        setTimeout(() => {
            test()
        },1000)
    }
}