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
    let detail = '<p margin="0" style="margin:0;"> 以下为服务内容介绍 </p> <p margin="0" style="margin:0;"> <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605475487523&di=401564298cc67ab6273249c9ae004af1&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F10%2F20160410182350_nJPky.thumb.400_0.jpeg"/><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2116924201,3735371786&fm=15&gp=0.jpg"/> </p>'
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