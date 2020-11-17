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
    // checkLogin(
    //   _ => {
    //     util.getAccountInfo().then(resolve => {
    //       if (resolve) {
    //         // 登录信息
    //         this.setData({ account: resolve });
    //       }
    //     });
    //     userInfo = localStorage.get().userInfo;
    //     this.setData({
    //       userInfo,
    //       isRegister: localStorage.get().isRegister || ""
    //     });
    //     this.getUserData()
    //   },
    //   _ => {
    //     this.setData({
    //       isRegister: localStorage.get().isRegister || ""
    //     });
    //   }
    // );
    // this.getNoTiceList();
    // if (userInfo && userInfo.account) {
    //   userInfo.account.yuan = util.getYuan(userInfo.account.totalBalance);
    //   this.setData({
    //     account: userInfo.account
    //   });
    // }
    // util.getAdList("01").then(res => {
    //   this.setData({
    //     bannerList: res
    //   });
    // });
    // util.getAdList("03").then(res => {
    //   this.setData({
    //     adData: res[0] || null,
    //     isShowAd: !!res.length
    //   });
    // });
  },

  onShow: function() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        _active: "index"
      });
    }
    let bannerList = [
      'https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud%2FbackendUpload%2F20200529154304887-applegamy750563%403x.png',
      'https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud%2FbackendUpload%2F20200608154641356-ac_pic_jrfa%403x.png',
      'https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud%2FbackendUpload%2F20200724104417130-yysj_banner_yzt%403x.png',
    ]
    this.setData({bannerList})
    // userInfo = localStorage.get().userInfo;
 
    // this.getUserData()
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
  // showAd() {
  //   let isShowAd = !this.data.isShowAd
  //   this.setData({ isShowAd })
  // },
  /**
   * 
   * @param {*} msg 
   * msg  = {
        type: 'warning', // normal warning
        money: '2.00',
        status: '余额不足',
        list: [{ name: '所乘公交', value: '102路' },
          { name: '乘车时间', value: '2020.08.06  11:20' }, ]
      }
   */

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
