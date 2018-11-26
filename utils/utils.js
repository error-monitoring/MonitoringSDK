/**
 * 获取url参数
 * @return {Object} 返回参数对象 
 */
export const parseQueryString = url => {
    let json = {};
    let arr = url.substr(url.indexOf('?') + 1).split('&');
    arr.forEach(item => {
        let tmp = item.split('=');
        json[tmp[0]] = tmp[1];
    });
    return json;
}
/**
 * 生成uuid
 * @return {[string]}   [xxxx-xxxx-xxxx-xxxx-xxxx]
 */
export const getUUID = () => {
    return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}
/**
 * 根据host返回根域名
 * @param  {[string]} host [window.location.host]
 * @return {[string]}      [如果不是域名则返回IP]
 */
export const getDomain = (host = window.location.host) => {
    host = host.split(':')[0]
    return isNaN(host.substring(host.lastIndexOf('.'))) ? `.${host.substring(host.substring(0, host.lastIndexOf('.')).lastIndexOf('.') + 1)}` : host
}
