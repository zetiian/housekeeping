let timeTool = require('../utils/common.js').timeTool
let getSignParameter = require('../utils/common.js').getSignParameter
let fetch = require('../utils/promise.js').fetch
var baseConfig = require('../config.js').baseConfig

var formatParams = function (parameter,url) {
  let parameters = {};
  parameters = Object.assign(parameters, baseConfig.baseParams, parameter);
  parameters = getSignParameter(parameters);
  
  return fetch(parameters,url)
}

//小程序登录/注册接口
exports.userRegister = function (parameter) {
  return formatParams(parameter,'/acc/userRegister')
}
//小程序登录/注册接口
exports.userLogin = function (parameter) {
  return formatParams(parameter,'/acc/wxLogin')
}

//用户信息查询接口
exports.getUserInfo = function (parameter) {
  return formatParams(parameter,'/acc/userInfo')
}

//地址列表接口
exports.serverAddressList = function (parameter) {
  return formatParams(parameter,'/acc/serverAddressList')
}
//地址添加接口
exports.serverAddressAdd = function (parameter) {
  return formatParams(parameter,'/acc/serverAddressAdd')
}
//地址删除接口
exports.serverAddressDel = function (parameter) {
  return formatParams(parameter,'/acc/serverAddressDel')
}
//地址修改接口
exports.serverAddressModify = function (parameter) {
  return formatParams(parameter,'/acc/serverAddressModify')
}
// 服务详情
exports.serverPageInfo = function (parameter) {
  return formatParams(parameter,'/marketing/serverPageInfo')
}
// 首页详列表
exports.adList = function (parameter) {
  return formatParams(parameter,'/marketing/adList')
}



exports.appointTimeInfo = function (parameter) {
  return formatParams(parameter,'/acc/appointTimeInfo')
}
// 预约接口
exports.serverAppoint = function (parameter) {
  return formatParams(parameter,'/acc/serverAppoint')
}


//  支付接口
exports.pay = function (parameter) {
  return formatParams(parameter,'/pay/pay')
}
//  订单列表
exports.serverAppointList = function (parameter) {
  return formatParams(parameter,'/acc/serverAppointInfo')
}
//  订单列表
exports.serverAppointModify = function (parameter) {
  return formatParams(parameter,'/acc/serverAppointModify')
}
exports.monthServerData = function (parameter) {
  return formatParams(parameter,'/acc/monthServerData')
}
exports.serverInfoCommit = function (parameter) {
  return formatParams(parameter,'/acc/serverInfoCommit')
}
exports.serverEval = function (parameter) {
  return formatParams(parameter,'/acc/serverEval')
}
