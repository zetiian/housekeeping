var WxParse = require("../../plugins/wxParser/wxParse");

import localStorage from "../../libs/localStorage";
const API = require('../../api/interface')
const util = require("../../utils/util.js");
var app = getApp();
var checkLogin = require("../../libs/checkLogin").checkLogin;
Page({
  data: {
    isIPX: app.globalData.isIPX,
    page:'',
    detail:{},
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
    let page = JSON.parse(op.page)
    this.setData({ page })
    API.serverPageInfo({
      serverType:page.serverType
    }).then(res=>{
      if(res.respCode==='000000'){
        this.setData({detail:res.resultList[0]})
      }
    })
  },


  onShow: function () {
  
   
  },

  goBuyNow(){
    wx.navigateTo({
      url: '/pages/order-checkout/order-checkout?detail='+JSON.stringify(this.data.detail),
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