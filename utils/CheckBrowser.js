export class checkBrowser {
    constructor(userAgent = navigator.userAgent) {
        this.userAgent = userAgent.toLowerCase();
        // this.Android = this.userAgent.indexOf('Android') > -1 || this.userAgent.indexOf('Linux') > -1;
        // this.isIPhone = this.userAgent.indexOf("iphone") != -1;
        // this.Ios = this.userAgent.indexOf('iPhone') > -1 || this.userAgent.indexOf('Mac') > -1;
        // this.Ipad = this.userAgent.indexOf('iPad') > -1;
        //判断是否Opera浏览器 
        this.isOpera = this.userAgent.includes("opera");
        //判断是否IE浏览器
        this.isIE = this.userAgent.includes("compatible") && this.userAgent.includes('msie') && !this.isOpera;
        //判断是否IE的Edge浏览器
        this.isEdge = this.userAgent.includes("edge");
        //判断是否Firefox浏览器
        this.isFirefox = this.userAgent.includes('firefox');
        //判断是否Safari浏览器
        this.isSafari = this.userAgent.includes('safari') && this.userAgent.indexOf('chrome') == -1;
        //判断是否Chrome浏览器
        this.isChrome = !this.isEdge && this.userAgent.includes('chrome') && this.userAgent.includes('safari');
        // this.IE11 = this.userAgent.indexOf('Trident') > -1 && this.userAgent.indexOf('rv:11.0') > -1;
        this.isWechat = !!this.userAgent.match(/micromessenger/i);
        // this.Weibo = !!this.userAgent.match(/Weibo/i);
        // this.UCBrowser = !!this.userAgent.match(/UCBrowser/i);
        // this.QQ = !!this.userAgent.match(/QQ/i);
        // this.QQBrowser = !this.userAgent.indexOf('MQQBrowser') > -1 && this.userAgent.indexOf('QQ/');
        this.isWinWeChat = !!this.userAgent.match(/windowswechat/i); // PC微信端


    }


    // 获取浏览器版本
    getBrowserVersion() {
        let Version = '';
        const userAgent = this.userAgent

        if (this.isWechat) {
            return userAgent.match(/micromessenger\/([\d\.]+)/i)[1]
        } else {
            let s;
            (s = userAgent.match(/rv:([\d.]+)\) like gecko/)) ? Version = s[1]:
                (s = userAgent.match(/msie ([\d.]+)/)) ? Version = s[1] :
                (s = userAgent.match(/firefox\/([\d.]+)/)) ? Version = s[1] :
                (s = userAgent.match(/chrome\/([\d.]+)/)) ? Version = s[1] :
                (s = userAgent.match(/opera.([\d.]+)/)) ? Version = s[1] :
                (s = userAgent.match(/version\/([\d.]+).*safari/)) ? Version = s[1] : 0;
            return Version
        }


    }

    getBrowserType() {
        const userAgent = this.userAgent; //取得浏览器的userAgent字符串 

        if (this.isIE) {
            let reIE = new RegExp("msie (\\d+\\.\\d+);");
            reIE.test(userAgent);
            let fIEVersion = parseFloat(RegExp["$1"]);
            if (userAgent.indexOf('msie 6.0') != -1) {
                return "IE6";
            } else if (fIEVersion == 7) {
                return "IE7";
            } else if (fIEVersion == 8) {
                return "IE8";
            } else if (fIEVersion == 9) {
                return "IE9";
            } else if (fIEVersion == 10) {
                return "IE10";
            } else if (userAgent.match(/rv:([\d.]+)\) like gecko/)) {
                return "IE11";
            } else {
                return "0"
            } //IE版本过低
        } //isIE end 

        if (this.isFirefox) {
            return "Firefox";
        }
        if (this.isOpera) {
            return "Opera";
        }
        if (this.isSafari) {
            return "Safari";
        }
        if (this.isChrome) {
            return "Chrome";
        }
        if (this.isEdge) {
            return "Edge";
        }
        if (this.isWechat) {
            return "Wechat";
        }
        if (this.isWinWeChat) {
            return "PcWechat";
        }
    }


    getBrowserInfo() {
        let browserInfo = {
            browserType: this.getBrowserType(),
            browserVersion: this.getBrowserVersion(),
            wechat: this.isWechat,
        }


        return browserInfo
    }

    getOsInfo() {
        const userAgent = this.userAgent;
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
            }
        }

        if (userAgent.includes("iphone")) {
            name = "Iphone";
        }
        if (userAgent.includes("mac")) {
            name = "Mac";
        }
        if (userAgent.includes("x11") || userAgent.includes("unix") || userAgent.includes("sunname") || userAgent.includes("bsd")) {
            name = "Unix";
        }
        if (userAgent.includes("ipad")) {
            name = 'Ipad'
        }
        if (userAgent.includes("linux")) {
            if (userAgent.includes("android")) {
                name = "Android"
            } else {
                name = "Linux";
            }

        }
        return {
            osVersion: version,
            osName: name
        };
    }


}