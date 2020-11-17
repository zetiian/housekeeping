
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
    detail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    userInfo = localStorage.get().userInfo
    let detail = JSON.parse(decodeURIComponent(op.detail))
    let data = {
      customerId:userInfo.customerId,
      serverOrderId:detail.serverOrderId,
    }
    API.serverAppointList(data).then(res=>{
      let list = res.resultList
      list.forEach(el=>{
        el.orderStatus = stateList[el.state]
      })
      console.log(1111,'列表',res.resultList,list);
      this.setData({detail:list[0]})

    })
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
    userInfo = localStorage.get().userInfo
  },

  onPullDownRefresh: function () {

  },
  starChange(e){
    console.log(111);
    
  },
  goCancel(){
    wx.navigateTo({
      url: '/pages/order-detail/cancel',
    });
  },
  onReachBottom: function () {

  },

  toPay(){
    let detail = this.data.detail
    let orderId = timeTool.getTimesNum2() + '' + parseInt((Math.random() + 1) * Math.pow(10, 6 - 1));
    wx.showLoading({ title: '支付中...', mask: true });
    API.pay({
      customerId:userInfo.customerId,
      actionType:'03',
      tranType:'00',
      serverOrderId:detail.serverOrderId,
      orderId:orderId,
      txnTime:timeTool.getTimesNum(),
      totalAmt:Number(detail.serverMoney),
      goodsName:'服务单支付',
      openid:userInfo.wxopenId,
      returnUrl: '',
    }).then(result=>{
      if(result.respCode==="000000"){
       let wxpayInfo = result.orderInfo;
       wx.requestPayment({
        timeStamp: wxpayInfo.timeStamp,
        nonceStr: wxpayInfo.nonceStr,
        package: wxpayInfo.package,
        signType: wxpayInfo.signType,
        paySign: wxpayInfo.paySign,
        success: reswx => {
          util.getUserInfo()
          console.log(999,'支付成功', reswx)
          wx.hideLoading();
          wx.showToast({
            title: '支付成功！',
          });
          setTimeout(() => {
            wx.switchTab({ url: '/pages/order/order', });
          }, 1500);
        }
      })
      
      }else{
        wx.$showToast(result.respMsg)
      }
    })
  },
})