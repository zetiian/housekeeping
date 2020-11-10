
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
    detail:{},
    newList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let detail = JSON.parse(decodeURIComponent(op.detail))
    detail.phone = "13311111111"
    this.setData({detail})
  },
  toConfirm(){
    wx.showToast({
      title: '操作成功！',
      duration: 1500,
    });
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/order/order',
      });
        
    }, 1500);
      
  },
 
  onReady: function () {

  },

  onShow: function () {
   
  },

  onPullDownRefresh: function () {

  },
  starChange(e){
    console.log(111);
    
  },
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})