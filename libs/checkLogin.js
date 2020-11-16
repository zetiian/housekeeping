const API = require("../api/interface.js");
const util = require("../utils/util.js");
import localStorage from "./localStorage";
var app = getApp();
exports.checkLogin = function(cb,err) {
  if(localStorage.get().userInfo && localStorage.get().userInfo.customerId){
    cb('yes')
  }else{
    wx.checkSession({
      success() {
        //session_key 未过期，使用本地数据
        if (!localStorage.get().userInfo || !localStorage.get().wxCode) {
          wxLogin(cb,err);
        } else {
          console.log("未过期，使用本地wxCode");
          serverLogin(cb,err);
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        if(!localStorage.get().wxInfo){
            wxLogin(cb,err);
        }
      }
    });
  }

};
function wxLogin(cb,err) {
  console.warn(1,"微信登陆");
  wx.login({
    success(res) {
      if (res.code) {
        localStorage.set({ wxCode: res.code });
        serverLogin(cb,err);
      } else {
        console.error("微信登录失败！" + res.errMsg);
      }
    }
  });
}
function serverLogin(cb,err) {
  API.userLogin({
    loginType: "01",
    authCode: localStorage.get().wxCode
  }).then(res => {
    if (res.respCode === "300022") {
      // 未注册用户存储信息
      console.warn("未绑定用户", res.reserve);
      localStorage.set({ wxInfo: res.reserve,isRegister:'none' });
      err('none')
    } else if (res.respCode == "000000") {
      console.log(111,"自动登陆成功！",res);
      let userInfo = { customerId:res.customerId, token:res.token, }
      localStorage.set({ userInfo ,isRegister:'yes'});
      util.getUserInfo()
      cb('yes')
    } else {
      err('error')
      wx.showToast({
        title: res.respMsg,
        icon: "none",
        duration: 3000
      });
    }
  });

}
