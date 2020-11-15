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
exports.loginFunmin = function (parameter) {
  return formatParams(parameter,'/acc/wxLogin')
}

//短信接口
exports.sendMessage = function (parameter) {
  parameter.apiName = 'api_action_000014';
  return formatParams(parameter)
}
//短信校验接口
exports.verifyMessage = function (parameter) {
  parameter.apiName = 'api_action_000015';
  return formatParams(parameter)
}
//申请用户二维码
exports.registerCode = function (parameter) {
  parameter.apiName = 'api_action_000016';
  return formatParams(parameter)
}
//查询用户二维码状态
exports.checkState = function (parameter) {
  parameter.apiName = 'api_action_000017';
  return formatParams(parameter)
}

//微信绑定操作
exports.bindwxFun = function (parameter) {
  parameter.apiName = 'api_action_000006';
  return formatParams(parameter)
}
//登出接口api_action_000004
exports.exitFun = function (parameter) {
  parameter.apiName = 'api_action_000004';
  return formatParams(parameter)
}
//用户注册接口
exports.register = function (parameter) {
  parameter.apiName = 'api_action_000002';
  return formatParams(parameter)
}
//用户信息查询接口
exports.getUserInfo = function (parameter) {
  parameter.apiName = 'api_action_000005';
  return formatParams(parameter)
}
//用户信息修改接口
exports.changeUserInfo = function (parameter) {
  parameter.apiName = 'api_action_000006';
  return formatParams(parameter)
}
//密码重置接口
exports.changeUserPassword = function (parameter) {
  parameter.apiName = 'api_action_000007';
  return formatParams(parameter)
}
//公告获取接口
exports.getNoticeList = function (parameter) {
  parameter.apiName = 'api_marketing_000001';
  return formatParams(parameter)
}
//广告获取接口
exports.getAdList = function (parameter) {
  parameter.apiName = 'api_marketing_000002';
  return formatParams(parameter)
}
//非普通用户注册接口
exports.specialRegist = function (parameter) {
  parameter.apiName = 'api_action_000016';
  return formatParams(parameter)
}

//二维码类型列表查询接口
exports.getCardInfo = function (parameter) {
  parameter.apiName = 'api_action_000008';
  return formatParams(parameter)
}
//二维码账户查询接口
exports.userCardInfo = function (parameter) {
  parameter.apiName = 'api_action_000009';
  return formatParams(parameter)
}
//二维码开通
exports.userCardRegister = function (parameter) {
  parameter.apiName = 'api_action_000010';
  return formatParams(parameter)
}
//联机二维码信息下载接口
exports.getQRCode = function (parameter) {
  parameter.apiName = 'api_action_000012';
  return formatParams(parameter)
}
//脱机二维码信息下载接口
exports.getQRCode2 = function (parameter) {
  parameter.apiName = 'api_action_000013';
  return formatParams(parameter)
}

//用户充值交易接口
exports.payMoney = function (parameter) {
  parameter.apiName = 'api_pay_000001';
  return formatParams(parameter)
}
//用户充值交易接口
exports.payMoneyState = function (parameter) {
  parameter.apiName = 'api_pay_000002';
  return formatParams(parameter)
}
//用户充值订单查询接口
exports.getOrderPayList = function (parameter) {
  parameter.apiName = 'api_pay_000003';
  return formatParams(parameter)
}
//用户乘车记录查询接口
exports.getUseBusPayList = function (parameter) {
  parameter.apiName = 'api_pay_000006';
  return formatParams(parameter)
}

//用户退款申请接口
exports.refundSubmit = function (parameter) {
  parameter.apiName = 'api_pay_000007';
  return formatParams(parameter)
}

//用户退款记录查询接口
exports.getRefundList = function (parameter) {
  parameter.apiName = 'api_pay_000008';
  return formatParams(parameter)
}
//用户反馈接口
exports.submitService = function (parameter) {
  parameter.apiName = 'api_action_000018';
  return formatParams(parameter)
}
//反馈类型
exports.serviceList = function (parameter) {
  parameter.apiName = 'api_action_000019';
  return formatParams(parameter)
}
//优惠券查询
exports.voucherList = function (parameter) {
  parameter.apiName = 'api_marketing_000003';
  return formatParams(parameter)
}
//优惠券领取
exports.voucherGet = function (parameter) {
  parameter.apiName = 'api_marketing_000004';
  return formatParams(parameter)
}
