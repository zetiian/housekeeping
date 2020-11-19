//index.js
const app = getApp();
const API = require("../../api/interface.js");
const timeTool = require("../../utils/common.js").timeTool;
const util = require("../../utils/util.js");
import localStorage from "../../libs/localStorage";
var checkLogin = require("../../libs/checkLogin").checkLogin;
var userInfo = {};

const isExpired = require("../../utils/common.js").isExpired;
//const QR = require('../../utils/weapp-qrcode.js')


Page({
  data: {
    userInfo: {},

    isRegister: "",
    isIPX: app.globalData.isIPX,
    systemInfo: app.globalData.systemInfo,
    bottomHeight: app.globalData.isIPX ? 85 : 65,
    isShowAd: false,
    adData: {},
    bannerList: [],
    bottomList: [],
    serviceList:[
      // 01：保洁服务 02：保姆 03：月嫂服务 04：护工
      { serverName:'保洁服务', serverType:'01' },
      { serverName:'保姆服务', serverType:'02' },
      { serverName:'月嫂服务', serverType:'03' },
      { serverName:'病患照顾', serverType:'04' ,serverIntro:'专业护工'},
    ]
 
  },
  getNoTiceList() {
    API.getNoticeList({})
      .then(res => {
        if (res.respCode == "000000") {
          this.setData({
            noticList: res.resultList,
            announ: util.getPure(res.resultList[0].noticeContent)
          });
        
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  onClick(){
    wx.navigateTo({ url: '/pages/demo/demo', });
  },
  goDetail(e){
    let page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?page=${JSON.stringify(page)}`
    });
  },
  goRegist() {
    wx.navigateTo({
      url: "/pages/open-card/open-card"
    });
  },
  goBroadcast() {
    wx.navigateTo({
      url: "/pages/broadcast/broadcast"
    });
  },
  onLoad: function(options) {
    API.adList({
      adType:'01',
    }).then(res=>{
      this.setData({bannerList:res.resultList})
    })
    API.adList({
      adType:'04',
    }).then(res=>{
      console.log(3345,res);
      this.setData({bottomList:res.resultList})
    })
    checkLogin(
      _ => {
        app.globalData.isLogin = "yes";
      },
      _ => {
        app.globalData.isLogin = "none";
      }
    );
   
  },

  onShow: function() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        _active: "index"
      });
    }
  
 
  },
  getUserData(){

    userInfo = localStorage.get().userInfo;
    if (userInfo && this.data.isRegister === "yes") {
      if (userInfo.account) {
        util.getAccountInfo().then(resolve => {
          resolve.yuan = util.getYuan(resolve.totalBalance);
          this.setData({
            account: resolve
          });
          if (resolve) {
              // TODO：登录信息
          }
        });
      } else {
          util.getUserInfo().then(user => {
            console.log(77777,user)
            this.setData({ userInfo:user });
          });
      }
    }
  },
  goPay() {
    let account = this.data.account;
    if (account && account.accountNo) {
      wx.navigateTo({ url: "/pages/pay/pay" });
    } else {
      app.showToast("您还没开通乘车码");
    }
  },
  goBannerLink(e) {
    return
    let item = e.currentTarget.dataset.item;
    if(item.adUrl && item.adUrl.indexOf('http')>=0){
      wx.navigateTo({
        url: `/pages/webview/webview?targetUrl=${item.adUrl}`
      });
    }
 
  },
  goMyAccount() {
    wx.navigateTo({
      url: '/pages/my-account/my-account',
    });

  },


  showPop(msg) {
    app.$popupText().show({
      msg: msg,
      buttons: [
        {
          text: "确定",
          color: "#fff",
          key: "submit"
        }
      ],
      buttonsClick: type => {
        console.log(type);
        switch (type) {
          case "submit":
            console.log("点击确定");
            app.$popupText().hide();
            return;
          default:
            app.$popupText().hide();
            return;
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },
  onUnload: function() {},

});
