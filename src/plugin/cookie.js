/*
 * @Author: your name
 * @Date: 2020-06-04 09:23:32
 * @LastEditTime: 2020-06-04 09:30:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\plugin\cookie.js
 */

class Cookie {
  get(name) {
    let arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return "";
  }
  set(name, value, expire) {
    let exp = new Date();
    exp.setTime(exp.getTime() + expire);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
  remove(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.get(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

export default new Cookie();
