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

//短信接口
exports.sendMessage = function (parameter) {
  return formatParams(parameter)
}
//短信校验接口
exports.verifyMessage = function (parameter) {
  return formatParams(parameter)
}
//申请用户二维码
exports.registerCode = function (parameter) {
  return formatParams(parameter,'/url')
}
//查询用户二维码状态
exports.checkState = function (parameter) {
  return formatParams(parameter,'/url')
}

//微信绑定操作
exports.bindwxFun = function (parameter) {
  return formatParams(parameter,'/url')
}
//登出接口api_action_000004
exports.exitFun = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户注册接口
exports.register = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户信息查询接口
exports.getUserInfo = function (parameter) {
  return formatParams(parameter,'/acc/userInfo')
}
//用户信息修改接口
exports.changeUserInfo = function (parameter) {
  return formatParams(parameter,'/url')
}
//密码重置接口
exports.changeUserPassword = function (parameter) {
  return formatParams(parameter,'/url')
}
//公告获取接口
exports.getNoticeList = function (parameter) {
  return formatParams(parameter,'/url')
}
//广告获取接口
exports.getAdList = function (parameter) {
  return formatParams(parameter,'/url')
}
//非普通用户注册接口
exports.specialRegist = function (parameter) {
  return formatParams(parameter,'/url')
}

//二维码类型列表查询接口
exports.getCardInfo = function (parameter) {
  return formatParams(parameter,'/url')
}
//二维码账户查询接口
exports.userCardInfo = function (parameter) {
  return formatParams(parameter,'/url')
}
//二维码开通
exports.userCardRegister = function (parameter) {
  return formatParams(parameter,'/url')
}
//联机二维码信息下载接口
exports.getQRCode = function (parameter) {
  return formatParams(parameter,'/url')
}
//脱机二维码信息下载接口
exports.getQRCode2 = function (parameter) {
  return formatParams(parameter,'/url')
}

//用户充值交易接口
exports.payMoney = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户充值交易接口
exports.payMoneyState = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户充值订单查询接口
exports.getOrderPayList = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户乘车记录查询接口
exports.getUseBusPayList = function (parameter) {
  return formatParams(parameter,'/url')
}

//用户退款申请接口
exports.refundSubmit = function (parameter) {
  return formatParams(parameter,'/url')
}

//用户退款记录查询接口
exports.getRefundList = function (parameter) {
  return formatParams(parameter,'/url')
}
//用户反馈接口
exports.submitService = function (parameter) {
  return formatParams(parameter,'/url')
}
//反馈类型
exports.serviceList = function (parameter) {
  return formatParams(parameter,'/url')
}
//优惠券查询
exports.voucherList = function (parameter) {
  return formatParams(parameter,'/url')
}
//优惠券领取
exports.voucherGet = function (parameter) {
  return formatParams(parameter,'/url')
}
