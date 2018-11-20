/*
 * @Author: wenquan.huang 
 * @Date: 2018-11-19 22:09:17 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-11-20 19:53:08
 * @监听性能
 */

export class ListenPerformance {
    constructor() {
        // setTimeout(() => {
        //     this.getPerformanceTime()
        //     this.getPerformanceResult()
        // }, 1000)
    }

    getPerformanceTime() {
        const time = performance.timing;
        const timingObj = {};

        timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart);
        timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart);
        timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart);
        timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart);
        timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart);
        timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading);
        timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading);
        timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart);
        timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart);
        timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);

        // for (item in timingObj) {
        //     console.log(item + ":" + timingObj[item] + '毫秒(ms)');
        // }
        console.log(timingObj)

        // console.log(performance);
    }


    getPerformanceResult() {
        let result = [];
        // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
        // window.performance.getEntries().forEach(function (perf) {
        //     result.push({
        //         '资源名称': perf.name,
        //         '资源类型': perf.entryType,
        //         '谁发起的请': perf.initiatorType,
        //         '加载时间': perf.duration
        //     });
        // });
        const resource = performance.getEntriesByType('resource')
        resource.forEach(item => {
            result.push({
                '资源名称': item.name,
                '资源类型': item.entryType,
                '谁发起的请': item.initiatorType,
                '加载时间': item.duration
            });
        })
        const [navigation] = performance.getEntriesByType('navigation')

        // 控制台输出统计结果
        console.table(result);
        console.table({
            '资源名称': navigation.name,
            '资源类型': navigation.entryType,
            '谁发起的请': navigation.initiatorType,
            '加载时间': navigation.duration
        });
    }
}