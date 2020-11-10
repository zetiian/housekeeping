
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
    nav:0,
    list:[
      // 1:派单中 2:待支付 3:待服务 4:服务人员已到达 5:待评价 6:服务已完成 7:预约成功 8:预约已取消
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'清洁服务',
        orderStatus:'派单中',
        status:1,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'派单中',
        status:1,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'待支付',
        status:2,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'待服务',
        status:3,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'服务人员已到达',
        status:4,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'待评价',
        status:5,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'服务已完成',
        status:6,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'预约成功',
        status:7,
      },
      {
        orderTime:'2020.09.10 周日 08:00～10:00',
        orderAddress:'香江国际金融中心606室',
        orderName:'保洁服务',
        orderStatus:'预约已取消',
        status:8,
      },
    ],
    newList:[]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userRegister = localStorage.get().userRegister
    if(!userRegister || !userRegister.type){
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
    
    }
    this.setData({newList:this.data.list})
  },

  select(e){
    let nav = e.currentTarget.dataset.nav

    let newList = this.data.list.filter(el=>el.status===nav)
    if(nav===0){
      newList = this.data.list
    }
    console.log(1111,newList,nav);
    
    this.setData({ nav,newList })
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