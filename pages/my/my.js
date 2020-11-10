var app = getApp();
const util = require('../../utils/util.js')
const API = require('../../api/interface.js')
import localStorage from "../../libs/localStorage";
var checkLogin = require('../../libs/checkLogin').checkLogin
let timeTool = require('../../utils/common.js').timeTool
var userRegister = {}
Page({
  data: {
    isIPX: app.globalData.isIPX,
    systemInfo: app.globalData.systemInfo,
    bottomHeight: app.globalData.isIPX ? 85 : 65,
    isRegister: '',
    account: {},
    userRegister: {},

  },
  onUnload(e) {},
  onLoad(options) {
    userRegister = localStorage.get().userRegister
    this.setData({userRegister})
    //   wx.hideShareMenu();
    //   checkLogin(_=>{
    //     userInfo = localStorage.get().userInfo||{}
    //     console.log(666,'登录了',userInfo)
    //     if(userInfo && !userInfo.account){
    //       util.getAccountInfo().then(account=>{
    //         if(account){
    //           account.yuan = util.getYuan(account.totalBalance)
    //           this.setData({ account })
    //           setTimeout(() => {
    //             wx.reLaunch({ url: '/pages/my/my', });
    //           }, 0);
    //         }


    //       })
    //     }else{
    //       userInfo.account.yuan = util.getYuan(userInfo.account.totalBalance)
    //       this.setData({ account: userInfo.account })
    //     }
    //   },_=>{
    //     console.log(777,'未登录')
    //   })

  },
  onShow(e) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        _active: "my"
      });
    }

  },
  getphonenumber(e) {
    console.log(2222, e);

  },
  goRegister(e) {
    wx.navigateTo({
      url: `/pages/register/register`,
    });
  },
  goRule() {
    wx.navigateTo({
      url: `/pages/rich-text/rich-text?pageTitle=用户协议&detail=我是用户协议`,
    });
  },
  goMyAccount() {
    wx.navigateTo({
      url: '/pages/my-account/my-account',
    });

  },
  goAboutUs() {
    wx.navigateTo({
      url: '/pages/rich-text/rich-text?pageTitle=关于我们&detail=我是关于我们的正文',
    });
  },
  goAddress() {
    wx.navigateTo({
      url: '/pages/my-address/my-address',
    });
  },
  goFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    });
  },
  goMyTickets() {
    wx.navigateTo({
      url: '/pages/tickets/tickets',
    });
  },
  goPay() {
    let account = this.data.account
    if (account && account.accountNo) {
      wx.navigateTo({
        url: '/pages/pay/pay',
      });
    } else {

    }

  },
  addMoney() {

  },


});