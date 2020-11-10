/*
 * @Author: Jericho Ding 
 * @Date: 2020-07-23 15:31:49 
 * @Last Modified by: Jericho Ding
 * @Last Modified time: 2020-09-10 17:42:56
 */
import localStorage from "../libs/localStorage";
const API = require('../api/interface.js')
exports.isNull = function(arg){
  return Object.prototype.toString.call(arg) == "[object Null]";
}
exports.isArray = function(arg){
  return Object.prototype.toString.call(arg) == "[object Array]";
}
exports.isNumber = function(arg){
  return Object.prototype.toString.call(arg) == "[object Number]";
}
exports.isString = function(arg){
  return Object.prototype.toString.call(arg) == "[object String]";
}
exports.isObject = function(arg){
  return Object.prototype.toString.call(arg) == "[object Object]";
}
exports.isRegExp = function(arg){
  return Object.prototype.toString.call(arg) == "[object RegExp]";
}
exports.isBoolean = function(arg){
  return Object.prototype.toString.call(arg) == "[object Boolean]";
}
exports.isFunction = function(arg){
  return Object.prototype.toString.call(arg) == "[object Function]";
}
exports.isUndefined = function(arg){
  return Object.prototype.toString.call(arg) == "[object Undefined]";
}
exports.randomString = function(len) {  // 生成随机的字符串
  len = len || 32;
  var $chars = 'abcdefhijkmnprstwxyz2345678'; 
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
function p0 (n){
  if(n<10){
      return '0'+n;
  }else{
      return ''+n;
  }
}

exports.getCurrentTimeStr = function(schema) {  // 获取当前时间  yyyyMMddHHmmss
  schema = schema || "yy-mm-dd hh:ii:ss";
  var d = new Date();
  var ret = schema.replace("yy",d.getFullYear())
                  .replace("mm",p0(d.getMonth()+1))
                  .replace("dd",p0(d.getDate()))
                  .replace("hh",p0(d.getHours()))
                  .replace("ii",p0(d.getMinutes()))
                  .replace("ss",p0(d.getSeconds()))
  return ret;
}
exports.getUserInfo = function() {  // 获取用户信息
  return new Promise((resolve, reject) => {
    API.getUserInfo({
      customerId: localStorage.get().userInfo.customerId,
      token: localStorage.get().userInfo.token
    }).then(res => {
      if (res.respCode == "000000") {
        let userInfo = {
          ...localStorage.get().userInfo,
          userName: res.userName,
          userId: res.userId,
          userStatus: res.userStatus, //状态： 0:正常,1:冻结,
          userDispost: res.userDispost, //用户押金
          userBalance: res.userBalance, // 余额
          mobileNo: res.mobileNo, // 手机号
          areaCode: res.areaCode, // 国际区间码
          tranPasswordFlag: res.tranPasswordFlag, // 用户交易密码状态  0：未设置 1：已经设置
          wxopenId: res.wxopenId, // 微信号
          loginType: res.loginType, // 登录状态 (00-正常登出;01-异常登出;02-已登录)
          accountType: res. accountType, // 01：普通卡账户
          applyState: res.applyState, // 0：申请失败 1：申请成功 2：审核中 9：不存在的申请
          applyDesc: res.applyDesc, // 申请失败失败描述
        };
        localStorage.set({ userInfo });
        console.log("_____获取用户信息", res);
        resolve(userInfo)
      } else if (res.respCode == "100009") {
        // 过期用户
        localStorage.clear();
      }else{
        reject(res)
      }
    });
  });
}
exports.getAccountInfo = function(type) {  // 获取用户账户信息
  return new Promise((resolve, reject) => {
    API.userCardInfo({
      customerId: localStorage.get().userInfo.customerId,
      cardNo: "",
      queryType: type?type:"00",
      accountType: type==="01"?type:"",
      accountNo: type==="02"?localStorage.get().userInfo.account.accountNo:"",
      token: localStorage.get().userInfo.token
    }).then(res => {
      if (res.respCode == "000000") {
        let userInfo = localStorage.get().userInfo;
        userInfo.account = res.accList[0];
        console.log("_____获取账户信息", res);
        resolve(res.accList[0]||null);
        localStorage.set({ userInfo });
      } else {
        reject(res);
      }
    });
  });
}
exports.checkSpecial = function(type) {
  //查询特种开卡申请的状态
  return new Promise((resolve, reject) => {
  API.checkState({
    customerId: localStorage.get().userInfo.customerId,
    accountType: type,
    token: localStorage.get().userInfo.token
  }).then(res => {
      if (res.respCode == "000000") {
          let userInfo = localStorage.get().userInfo;
          userInfo.applyOrderId = res.applyOrderId;
          userInfo.applyState = res.applyState;
          console.log("_____特种开卡申请状态", res);
          localStorage.set({ userInfo });
       
      } else {
        wx.showToast({
          title: res.respMsg,
          icon: "none",
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.showToast({
        title: "网络请求发起失败" + JSON.stringify(err),
        icon: "none",
        duration: 3000
      });
    });
  });
}
exports.getAdList = function(type) {
  //广告列表
  return new Promise((resolve, reject) => {
    let userInfo = localStorage.get().userInfo,params={ adType: type}
    if(userInfo){
      params.customerId = userInfo.customerId
      params.token = userInfo.token
    }
  API.getAdList({
   ...params
  }).then(res => {
      if (res.respCode == "000000") {
          console.log(3,"_____广告列表-"+type, res.resultList);
          resolve(res.resultList)
      } else {
        wx.showToast({
          title: res.respMsg,
          icon: "none",
          duration: 2000
        });
      }
    })
  });
}
exports.getYuan = function(str) {
  str+=''
  if(str.length>2){// 大于1元
    return `${str.substr(0,str.length-2)}.${str.substr(-2)}`
  }else if(str.length===2){
    return `0.${str}`
  }else{
    return `0.0${str}`
  }
}
exports.getDay = function(str) {
  str+=''
  return `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}`
}
exports.getTime = function(str) {
  str+=''
  if(str.length<14){
    return `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)} ${str.substr(8,2)}:${str.substr(10,2)}`
  }
  return `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)} ${str.substr(8,2)}:${str.substr(10,2)}:${str.substr(12,2)}`
}
exports.getPure = function(str) {
  str+=''
  return str.replace(/<\/?.+?>/g,"").replace(/ /g,"");
        // var dds=dd;//dds为得到后的内容
        // console.log(dds);
}