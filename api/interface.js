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
//地址列表接口
exports.serverAddressAdd = function (parameter) {
  return formatParams(parameter,'/acc/serverAddressAdd')
}
