//app.js
var aldstat = require("./utils/ald-stat.js");

let fun_aes = require("utils/aes.js"); //引用AES源码js
const timeTool = require("utils/common.js").timeTool;
const util = require("utils/util.js");
const API = require("./api/interface.js");



import getCtx from "./libs/ctx.js";
import localStorage from "./libs/localStorage";
var checkLogin = require("./libs/checkLogin").checkLogin;
var userInfo = {}
var showToast = (msg, type, duration) =>{
  wx.showToast({
    title: msg,
    icon: type ? type : "none",
    image: "",
    duration: duration ? duration : 1500,
    mask: true
  });
}
App({
  
  $popupText: (selector = "#text-popup", ctx) =>
    getCtx(selector, ctx) || {
      show() {},
      hide() {}
    },
  globalData: {
    systemInfo: wx.getSystemInfoSync(),

    callback: function () {},
    callbackInfo: function () {},

  },
  // 检查更新
  checkUpdate() {
    let updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(res => {
      wx.showModal({
        title: "更新提示",
        showCancel: false,
        content: "新版本已经准备好，请重启小程序",
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
  },
  onLaunch: function () {
    wx.$showToast = showToast
    let mobile = this.globalData.systemInfo.model;
    let system = this.globalData.systemInfo.system;
    this.globalData.isIP = mobile.search(/iphone/i) != -1;
    
    // 截止2020年11月iPhone 手机含有底部的小黑条的手机型号 iPhoneSE 2是：unknown<iPhone12  故不在此列
    let iPhoneXModelList = [
      'iPhone X',// xs、xs max 系列
      'iPhone XR',
      'iPhone 11',// 11 系列
      'unknown<iPhone13',// 12 系列
    ]
    this.globalData.isIPX = iPhoneXModelList.some(ip=> mobile.indexOf(ip)===0)

    // this.globalData.isIPX =
    //   mobile.search(/unknown/i) === -1 &&
    //   mobile.search(/iphone\s?(X|11|12)/i) != -1; // 兼容 iPhoneSE2
    this.globalData.isMi = mobile.search(/MI/i) != -1;
    this.globalData.isAndroid = system.search(/Android/i) != -1;
    this.checkUpdate();
    console.log("当前系统", this.globalData.systemInfo);

    userInfo = localStorage.get().userInfo;
    if (userInfo) {
      this.globalData.isLogin = "yes";
      wx.showToast({ title: "自动登录成功！" });
      console.log("本地有缓存，登陆成功", userInfo);
      util.getUserInfo().then(res=>{
        userInfo = localStorage.get().userInfo
         if (userInfo.accountType && userInfo.accountType !== '01') { // TODO:开卡状态要放在用户的接口里
          console.log(555555,'找到了申请状态',userInfo)
            // util.checkSpecial(userInfo.accountType)
          }
      });
     

    } else {
      checkLogin(
        res => {
          // 成功的状态
          this.globalData.isLogin = "yes";
        },
        err => {
          // 未登陆的状态
          console.warn(err, "未登陆状态");
          this.globalData.isLogin = "none";
        }
      );
    }
   
  },


});