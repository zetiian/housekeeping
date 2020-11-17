
var app = getApp();
const util = require('../../utils/util.js')
const API = require('../../api/interface.js')
import localStorage from "../../libs/localStorage";
var checkLogin = require('../../libs/checkLogin').checkLogin
let timeTool = require('../../utils/common.js').timeTool
var userInfo = {}
var stateList= [ '服务已完成', '派单中', '待支付', '待服务', '服务人员已到达', '待评价', '', '', '', '预约已取消', ]
Page({
  data: {
    isIPX: app.globalData.isIPX,
    nav:0,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        _active: "order"
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userInfo = localStorage.get().userInfo

    checkLogin(_=>{
      console.log(3333,'已注册')
      let data = {
        customerId:userInfo.customerId,
      }
      this.getList(data)
    },_=>{
      console.warn(4444,'未注册')
       wx.showToast({
        title: '请先进行注册',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/my/my',
        });
      }, 1500);
    })
 
  },
  getList(data){
    API.serverAppointList(data).then(res=>{
      let list = res.resultList
      list.forEach(el=>{
        el.orderStatus = stateList[el.state]
      })
      console.log(1111,'列表',res.resultList,list);
      this.setData({ list })
    })
  },
  
  select(e){
    let nav = e.currentTarget.dataset.nav
    let data = {
      customerId:userInfo.customerId,
      state:nav,
    }
    this.setData({nav})
    if(nav===10) {
      delete data.state
    }
    this.getList(data)
  },
  goDetail(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?detail=${encodeURIComponent(JSON.stringify(item))}`,
    });
    
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