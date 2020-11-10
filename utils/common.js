let getSign = require('../utils/sign.js').getSign
//获取时间戳
const timeTool = {
  getTimestamp() {
    var times = new Date();
    var YY = times.getFullYear();
    var MM = times.getMonth() + 1;
    if (MM < 10) MM = "0" + MM;
    var DD = times.getDate();
    if (DD < 10) DD = "0" + DD;
    var HH = times.getHours();
    if (HH < 10) HH = "0" + HH;
    var mm = times.getMinutes();
    if (mm < 10) mm = "0" + mm;
    var ss = times.getSeconds();
    if (ss < 10) ss = "0" + ss;
    times = YY + "-" + MM + "-" + DD + " " + HH + ":" + mm + ":" + ss;
    return times;
  },
  getTimesNum() {
    var times = new Date();
    var YY = times.getFullYear();
    var MM = times.getMonth() + 1;
    if (MM < 10) MM = "0" + MM;
    var DD = times.getDate();
    if (DD < 10) DD = "0" + DD;
    var HH = times.getHours();
    if (HH < 10) HH = "0" + HH;
    var mm = times.getMinutes();
    if (mm < 10) mm = "0" + mm;
    var ss = times.getSeconds();
    if (ss < 10) ss = "0" + ss;
    times = YY + "" + MM + "" + DD + "" + HH + "" + mm + "" + ss;
    return times;
  },
  getTimesNum2() {
    var times = new Date();
    var YY = times.getFullYear();
    var MM = times.getMonth() + 1;
    if (MM < 10) MM = "0" + MM;
    var DD = times.getDate();
    if (DD < 10) DD = "0" + DD;
    var HH = times.getHours();
    if (HH < 10) HH = "0" + HH;
    var mm = times.getMinutes();
    if (mm < 10) mm = "0" + mm;
    var ss = times.getSeconds();
    if (ss < 10) ss = "0" + ss;
    var SSS = ('000000000' + times.getMilliseconds()).slice(-3);
    if (ss < 10) ss = "0" + ss;
    times = YY + "" + MM + "" + DD + "" + HH + "" + mm + "" + ss + "" + SSS;
    return times;
  }
}
//修复不支持Object.entries问题
if (!Object.entries)
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

function obj2Str(params, keyJoinVal = '=', keyJoinKey = '&') {
  return Object.entries(params).map(i => {
    i[1] = encodeURIComponent((typeof i[1] == 'object' ? JSON.stringify(i[1]) : i[1]) + '')
    return i.join(keyJoinVal)
  }).join(keyJoinKey).replace(/%20/gi, "+").replace(/(!)|(')|(\()|(\))|(~)/gi, function(item) {
    return "%" + item.charCodeAt(0).toString(16).toLocaleUpperCase();
  });
}

function getSignParameter(parameter) {
  let parameters = {};
  let keyList = Object.keys(parameter).sort();
  keyList.forEach(key => {
    parameter[key] && (parameters[key] = parameter[key]);
  })
  let signStr = obj2Str(parameters);
  parameters.sign = getSign(signStr)
  return parameters;
}

function isExpired(res) { //根据返回错误信息判断是否过期
  let objn = res ? res : null;
  if (objn) {
    if (objn.respCode == '100009') { //过期用户需重新登录
      wx.reLaunch({ //关闭所有页面跳转登录页
        url: '/pages/index/index'
      })
    } else { //显示错误信息
      wx.showToast({
        title: objn.respMsg,
        icon: "none",
        duration: 3000
      })
    }
  }
}

module.exports = {
  timeTool,
  obj2Str,
  getSignParameter,
  isExpired
};