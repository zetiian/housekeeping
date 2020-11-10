var app = getApp();
const API = require('../../api/interface.js')
const util = require('../../utils/util.js')
import localStorage from "../../libs/localStorage";
const timeTool = require('../../utils/common.js').timeTool
var userInfo = {}
Page({
  data: {
    isIPX:app.globalData.isIPX,
    systemInfo:app.globalData.systemInfo,
    bottomHeight:app.globalData.isIPX?85:65,
    bannerList:[],
  },
  onShow(e) {
    // if (typeof this.getTabBar === "function" && this.getTabBar()) {
    //   this.getTabBar().setData({ _active: "gift" });
    // }

  },
  onUnload(e) {},
  onLoad(options) {
    // wx.hideShareMenu();
    // userInfo = localStorage.get().userInfo 
    // if(userInfo && userInfo.account){
    //   this.setData({account:userInfo.account})
    // }
    // util.getAdList('02').then(bannerList=>{
    //   if(bannerList && bannerList.length){
    //     bannerList.map(el=>{
    //       el.createTime=util.getTime(el.createTime)
    //     })
    //     this.setData({bannerList})

    //   }
    // })
  },
  goDetail(e){
    let item = e.currentTarget.dataset.item
    if(item.adUrl.indexOf('http')>=0){
      wx.navigateTo({
        url: `/pages/webview/webview?targetUrl=${item.adUrl}`,
      });
      return
    }
    wx.navigateTo({
      url: '/pages/gift-detail/gift-detail',
    });
  

  }
});
