parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"x+IB":[function(require,module,exports) {
function o(o,n){if(!(o instanceof n))throw new TypeError("Cannot call a class as a function")}function n(o,n){for(var e=0;e<n.length;e++){var l=n[e];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(o,l.key,l)}}function e(o,e,l){return e&&n(o.prototype,e),l&&n(o,l),o}var l=function(){function n(){o(this,n),window.addEventListener("error",function(o){console.log("错误信息：",o.message),console.log("出错文件：",o.filename),console.log("出错行号：",o.lineno),console.log("出错列号：",o.colno),console.log("错误详情：",o.error)}),window.onerror=function(o,n,e,l,r){console.log("错误信息：",o),console.log("出错文件：",n),console.log("出错行号：",e),console.log("出错列号：",l),console.log("错误详情：",r)}}return e(n,[{key:"init",value:function(){}}]),n}();window.monitoringSDK=new l;
},{}]},{},["x+IB"], null)
//# sourceMappingURL=/monitoring-sdk.map