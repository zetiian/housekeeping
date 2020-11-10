var WxParse = require("../../plugins/wxParser/wxParse");
var app = getApp();
Page({
  data: {
    isIPX: app.globalData.isIPX,
    title:'',
    detail:'',
    bannerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
   if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        _active: "order"
      });
    }
    this.setData({
      title:op.title
    })
  },


  onShow: function () {
    let detail = '<p margin="0" style="margin:0;"> 以下为服务内容介绍 </p> <p margin="0" style="margin:0;"> <img src="https://test-azure-community.obs.cn-south-1.myhuaweicloud.com/20190415152600_07d54726d6bc4b03a983ef38a93a0e2a.png"/><img src="https://test-azure-community.obs.cn-south-1.myhuaweicloud.com/20190415152611_b8dba2f764a449319c838599e6a75076.png"/> </p>'
    let bannerList = [
      'https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud%2FbackendUpload%2F20200608154641356-ac_pic_jrfa%403x.png',
    ]
    this.setData({bannerList})
    WxParse.wxParse("htmlContent", "html", detail, this, 0);
  },

  goBuyNow(){
    wx.navigateTo({
      url: '/pages/order-checkout/checkout',
    });
  },
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})