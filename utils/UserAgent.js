const getOsInfo = () => {
    let userAgent = navigator.userAgent.toLowerCase();
    let name = '';
    let version = "";
    if (userAgent.includes("win")) {
        name = "Windows";
        if (userAgent.includes("windows nt 5.0")) {
            version = "Windows 2000";
        } else if (userAgent.includes("windows nt 5.1") || userAgent.includes("windows nt 5.2")) {
            version = "Windows XP";
        } else if (userAgent.includes("windows nt 6.0")) {
            version = "Windows Vista";
        } else if (userAgent.includes("windows nt 6.1") || userAgent.includes("windows 7")) {
            version = "Windows 7";
        } else if (userAgent.includes("windows nt 6.2") || userAgent.includes("windows 8")) {
            version = "Windows 8";
        } else if (userAgent.includes("windows nt 6.3")) {
            version = "Windows 8.1";
        } else if (userAgent.includes("windows nt 6.2") || userAgent.includes("windows nt 10.0")) {
            version = "Windows 10";
        } else {
            version = "";
        }
    } else if (userAgent.includes("iphone")) {
        name = "Iphone";
    } else if (userAgent.includes("mac")) {
        name = "Mac";
    } else if (userAgent.includes("x11") || userAgent.includes("unix") || userAgent.includes("sunname") || userAgent.includes("bsd")) {
        name = "Unix";
    } else if (userAgent.includes("linux")) {
        if (userAgent.includes("android")) {
            name = "Android"
        } else {
            name = "Linux";
        }

    } else {
        name = "";
    }
    return {
        osName:name,
        osVersion:version
    };
}

function getBrowerInfo() {

    let document = window.document,
        navigator = window.navigator,
        agent = navigator.userAgent.toLowerCase(),
        //IE8+支持.返回浏览器渲染当前文档所用的模式
        //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
        //IE10:10(兼容模式7||8||9)
        IEMode = document.documentMode,
        //chorme
        chrome = window.chrome || false,
        System = {
            //user-agent
            //是否为IE
            isIE: /trident/.test(agent),
            //Gecko内核
            isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
            //webkit内核
            isWebkit: agent.indexOf("webkit") > 0,
            //是否为标准模式
            isStrict: document.compatMode === "CSS1Compat",
            //是否支持subtitle
            supportSubTitle: function () {
                return "track" in document.createElement("track");
            },

            //获取IE的版本号
            ieVersion: function () {
                let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
                let ma = window.navigator.userAgent.toLowerCase()
                let match = rMsie.exec(ma);
                try {
                    return match[2];
                } catch (e) {
                    //									console.log("error");
                    return IEMode;
                }
            },
            //Opera版本号
            operaVersion: function () {
                try {
                    if (window.opera) {
                        return agent.match(/opera.([\d.]+)/)[1];
                    } else if (agent.indexOf("opr") > 0) {
                        return agent.match(/opr\/([\d.]+)/)[1];
                    }
                } catch (e) {
                    //									console.log("error");
                    return 0;
                }
            }
        };

    try {
        //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
        System.type = System.isIE ? "IE" :
            window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
            (agent.indexOf("chrome") > 0) ? "Chrome" :
            //safari也提供了专门的判定方式
            window.openDatabase ? "Safari" :
            (agent.indexOf("firefox") > 0) ? "Firefox" :
            'unknow';

        //版本号 
        System.version = (System.type === "IE") ? System.ieVersion() :
            (System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
            (System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
            (System.type === "Opera") ? System.operaVersion() :
            (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
            "0";

        // 浏览器外壳
        // 浏览器名称(如果是壳浏览器,则返回壳名称)
        System.shell = function () {

            if (agent.indexOf("edge") > 0) {
                System.version = agent.match(/edge\/([\d.]+)/)[1] || System.version;
                return "edge浏览器";
            }
            //遨游浏览器
            if (agent.indexOf("maxthon") > 0) {
                System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
                return "傲游浏览器";
            }
            //QQ浏览器
            if (agent.indexOf("qqbrowser") > 0) {
                System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
                return "QQ浏览器";
            }

            //搜狗浏览器
            if (agent.indexOf("se 2.x") > 0) {
                return '搜狗浏览器';
            }

            //Chrome:也可以使用window.chrome && window.chrome.webstore判断
            if (chrome && System.type !== "Opera") {
                let external = window.external,
                    clientInfo = window.clientInformation,
                    //客户端语言:zh-cn,zh.360下面会返回undefined
                    clientLanguage = clientInfo.languages;

                //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                if (external && 'LiebaoGetVersion' in external) {
                    return '猎豹浏览器';
                }
                //百度浏览器
                if (agent.indexOf("bidubrowser") > 0) {
                    System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                        agent.match(/chrome\/([\d.]+)/)[1];
                    return "百度浏览器";
                }
                //360极速浏览器和360安全浏览器
                if (System.supportSubTitle() && typeof clientLanguage === "undefined") {
                    //object.key()返回一个数组.包含可枚举属性和方法名称
                    let storeKeyLen = Object.keys(chrome.webstore).length,
                        v8Locale = "v8Locale" in window;
                    return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                }
                return "";
            }
            return System.type;
        };

        
        System.name = System.shell();
        // 对版本号进行过滤过处理


    } catch (e) {
        //						console.log(e.message);
    }
    const {name, type, version} = System
    return {
        // agent,
        type,
        version,
        name
    }
   

}

export {
    getOsInfo,
    getBrowerInfo
}