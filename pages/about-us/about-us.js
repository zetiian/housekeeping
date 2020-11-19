var app = getApp();
Page({
  data: {
    detail:{},
    pageTitle:"页面标题",
    isIPX:app.globalData.isIPX,
  },
  onLoad(op) {
    wx.hideShareMenu();
    if(op.detail){
      let detail = op.detail
      let pageTitle = op.pageTitle||'页面标题'
      this.setData({detail,pageTitle})
    }
  },
  onShow(e) {

  },
  onUnload(e) {},

});