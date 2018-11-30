import { getDomain } from "./utils";

export const setCookie = ({
  name,
  value,
  time = 300,
  path = "/",
  domain = `${getDomain()}`
}) => {
  //设置名称为name,值为value的Cookie
  let expdate = new Date(); //初始化时间
  expdate.setTime(expdate.getTime() + time * 360000 * 1000); //时间单位毫秒
  document.cookie = `${name}=${value};expires=${expdate.toGMTString()};path=${path};domain=${domain}`;
};

/**
 *
 * @param {String} name 需要获取的key
 * @return {String} 如果获取到了就返回 如果没有返回空
 */
export const getCookie = name => {
  //判断document.cookie对象里面是否存有cookie
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(name + "=");
    //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
    if (c_start != -1) {
      c_start = c_start + name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};
